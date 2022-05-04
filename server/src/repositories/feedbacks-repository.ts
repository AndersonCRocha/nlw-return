import { Feedback } from "@prisma/client";
import { CreateFeedbackRequest } from "../dto/feedbacks";

export interface FeedbackRepository {
  create: (request: CreateFeedbackRequest) => Promise<Feedback>;
}
