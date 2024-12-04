import nodemailer from "nodemailer";

const MAIL = process.env.MAIL;
const MAIL_PASS = process.env.MAIL_PASS;

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MAIL,
        pass: MAIL_PASS,
      },
    });
  }

  async sendOTP(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: MAIL,
      to: email,
      subject: "SkillForge OTP Verification",
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
