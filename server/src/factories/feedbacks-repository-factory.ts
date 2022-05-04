import { prisma } from "../prisma-client";
import { PrismaFeedbackRepository } from "../repositories/prisma/prisma-feedback-repository";

export function makeFeedbackRepository() {
  const repository = new PrismaFeedbackRepository(prisma);
  return repository;
}
