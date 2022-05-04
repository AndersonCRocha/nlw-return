import { FeedbackController } from "../controllers/feedbacks-controller";
import { makeCreateFeedbackUseCase } from "./create-feedback-usecase-factory";

export function makeFeedbackController() {
  const createFeedbackUseCase = makeCreateFeedbackUseCase();
  const feedbackController = new FeedbackController(createFeedbackUseCase);
  return feedbackController;
}
