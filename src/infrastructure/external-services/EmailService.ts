import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { errorObjectCatch } from "../../shared/utils/errorObjectCatch";
import { EmailRepositoryInterface } from "../../core/interfaces/EmailRepositoryInterface";
dotenv.config();

const MAIL = process.env.MAIL;
const MAIL_PASS = process.env.MAIL_PASS;

export class EmailService implements EmailRepositoryInterface {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || "587", 10),
      secure: false,
      auth: {
        user: MAIL,
        pass: MAIL_PASS,
      },
    });
  }

  async sendOTP(email: string, otp: string): Promise<void> {
    try {
      const mailOptions = {
        from: MAIL,
        to: email,
        subject: "SkillForge OTP Verification",
        text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      errorObjectCatch(error);
    }
  }

  sendDenialEmail = async (email: string, name: string) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: MAIL,
        pass: MAIL_PASS,
      },
    });

    const mailOptions = {
      from: MAIL,
      to: email,
      subject: "Tutor Request Denied",
      text: `Dear ${name},\n\nYour request to become a tutor has been denied.\n\nBest regards,\nThe SkillForge Team`,
    };

    transporter.sendMail(mailOptions);
    return;
  };
}
