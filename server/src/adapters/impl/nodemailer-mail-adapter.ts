import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { MailAdapter, MailProps } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b52ac8d9af8a9a",
    pass: "3a5385c0501853",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ to, subject, content }: MailProps): Promise<void> {
    const message: Mail.Options = {
      from: "Feedget <anderson@teste.com>",
      to,
      subject,
      html: content,
    };

    await transport.sendMail(message);
  }
}
