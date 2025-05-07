import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
          user: config.get<string>('EMAIL_USER'),
          pass: config.get<string>('EMAIL_PASS'),
        },
      });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: '"autoGo" <'+this.config.get<string>('EMAIL_USER')+'>',
      to,
      subject,
      text,
      html,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', result);
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}