import { MailAdapter } from "../adapters/mail-adapter";
import { CreateFeedbackRequest } from "../dto/feedbacks";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

export class CreateFeedbackUseCase {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly mailAdapter: MailAdapter
  ) {}

  async execute(request: CreateFeedbackRequest) {
    const feedback = await this.feedbackRepository.create(request);

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
