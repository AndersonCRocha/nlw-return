export interface MailProps {
  to: string;
  subject: string;
  content: string;
}

export interface MailAdapter {
  sendMail: (mail: MailProps) => Promise<void>;
}
