import { Feedback, PrismaClient } from "@prisma/client";
import { CreateFeedbackData } from "../../dto/feedbacks";
import { FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    type,
    comment,
    screenshot,
  }: CreateFeedbackData): Promise<Feedback> {
    const feedback = await this.prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });

    return feedback;
  }
}
