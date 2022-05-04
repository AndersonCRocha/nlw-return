import { prisma } from "../prisma-client";
import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedback-repository";

export function makeFeedbackRepository() {
  const repository = new PrismaFeedbacksRepository(prisma);
  return repository;
}
