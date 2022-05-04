import { Request, Response } from "express";
import { CreateFeedbackUseCase } from "../use-cases/create-feedbacks-use-case";

export class FeedbackController {
  constructor(private readonly createFeedbackUseCase: CreateFeedbackUseCase) {}

  async create(request: Request, response: Response) {
    const { comment, type, screenshot } = request.body;

    const feedback = await this.createFeedbackUseCase.execute({
      comment,
      type,
      screenshot,
    });

    return response.status(201).json({ data: feedback });
  }
}
