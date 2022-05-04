import { MailAdapter } from "../adapters/mail-adapter";
import { CreateFeedbackData } from "../dto/feedbacks";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

export class CreateFeedbackUseCase {
  constructor(
    private readonly feedbackRepository: FeedbacksRepository,
    private readonly mailAdapter: MailAdapter
  ) {}

  async execute({ type, comment, screenshot }: CreateFeedbackData) {
    if (!type || !comment) {
      throw new Error("Type and comment are required");
    }

    const feedback = await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      to: "Anderson Rocha <anderson@email.com>",
      subject: "Novo feedback",
      content: [
        '<div style="font-family: sanf-serif; font-size: 16px; color: #111;">',
        "<p>Olá Anderson,</p>",
        "<p>Você recebeu um novo feedback.</p>",
        `<p><strong>Tipo:</strong> ${feedback.type}</p>`,
        `<p><strong>Comentário:</strong> ${feedback.comment}</p>`,
        "</div>",
      ].join("\n"),
    });

    return feedback;
  }
}
