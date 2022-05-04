import { Feedback } from "@prisma/client";
import { CreateFeedbackData } from "../dto/feedbacks";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { CreateFeedbackUseCase } from "./create-feedbacks-use-case";

class FakeFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: CreateFeedbackData) {
    const feedback: Feedback = {
      id: "unknown_id",
      type,
      comment,
      screenshot: screenshot || null,
      createdAt: new Date(),
    };
    return Promise.resolve(feedback);
  }
}

const feedbackRepository = new FakeFeedbacksRepository();
const mailAdapter = { sendMail: jest.fn() };
const createFeedbackUseCase = new CreateFeedbackUseCase(
  feedbackRepository,
  mailAdapter
);

describe("Create feedback", () => {
  it("should be able to create a feedback", async () => {
    const promise = createFeedbackUseCase.execute({
      type: "BUG",
      comment: "any comment",
      screenshot: "screenshot.png",
    });

    await expect(promise).resolves.not.toThrow();

    const feedback = await promise;

    expect(feedback.id).toBe("unknown_id");
  });

  it("should call mail adapter after create feedback", async () => {
    await expect(
      createFeedbackUseCase.execute({
        type: "BUG",
        comment: "any comment",
        screenshot: "screenshot.png",
      })
    ).resolves.not.toThrow();

    expect(mailAdapter.sendMail).toHaveBeenCalledTimes(1);
  });

  it("should be throw an error when try create a feedback without type and comment", async () => {
    await expect(
      createFeedbackUseCase.execute({
        type: "",
        comment: "",
        screenshot: "screenshot.png",
      })
    ).rejects.toThrow();

    expect(mailAdapter.sendMail).not.toHaveBeenCalled();
  });
});
