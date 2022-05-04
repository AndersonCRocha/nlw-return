import { Router } from "express";
import { makeFeedbackController } from "../factories/feedback-controller-factory";

const feedbackController = makeFeedbackController();

export const router = Router();

router.post("/feedbacks", feedbackController.create.bind(feedbackController));
