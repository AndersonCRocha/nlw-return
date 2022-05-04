import { Feedback, PrismaClient } from "@prisma/client";
import { CreateFeedbackRequest } from "../../dto/feedbacks";
import { FeedbackRepository } from "../feedbacks-repository";

export class PrismaFeedbackRepository implements FeedbackRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    type,
    comment,
    screenshot,
  }: CreateFeedbackRequest): Promise<Feedback> {
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
