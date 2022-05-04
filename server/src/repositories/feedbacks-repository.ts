import { Feedback } from "@prisma/client";
import { CreateFeedbackData } from "../dto/feedbacks";

export interface FeedbacksRepository {
  create: (data: CreateFeedbackData) => Promise<Feedback>;
}
