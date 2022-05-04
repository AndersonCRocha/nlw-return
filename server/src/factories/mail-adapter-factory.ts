import { NodemailerMailAdapter } from "../adapters/impl/nodemailer-mail-adapter";

export function makeMailAdapter() {
  const mailAdapter = new NodemailerMailAdapter();
  return mailAdapter;
}
