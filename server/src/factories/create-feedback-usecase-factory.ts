import { CreateFeedbackUseCase } from "../use-cases/create-feedbacks-use-case";
import { makeFeedbackRepository } from "./feedbacks-repository-factory";
import { makeMailAdapter } from "./mail-adapter-factory";

export function makeCreateFeedbackUseCase() {
  const feedbackRepository = makeFeedbackRepository();
  const mailAdapter = makeMailAdapter();
  const createFeedbackUseCase = new CreateFeedbackUseCase(
    feedbackRepository,
    mailAdapter
  );
  return createFeedbackUseCase;
}
