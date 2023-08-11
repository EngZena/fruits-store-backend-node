import config from 'config';
import fs from 'fs';
import handlebars from 'handlebars';
import { convert } from 'html-to-text';
import nodemailer from 'nodemailer';
import { promisify } from 'util';

import * as Constants from './constants';

const readFile = promisify(fs.readFile);

export default class Email {
  constructor(user, url) {
    this.to = user.email;
    this.user = user;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Fruits store  <${config.get('EMAIL_FROM')}>`;
  }

  newTransport() {
    if (config.get('NODE_ENV').trim() === Constants.prodEnvironment) {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          from: config.get('EMAIL_FROM'),
          user: config.get('SENBDGRID_USERNAME'),
          pass: config.get('SENBDGRID_PASSWORD'),
        },
      });
    }
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: config.get('EMAIL_PORT'),
      auth: {
        user: config.get('SENBDGRID_USERNAME'),
        pass: config.get('SENBDGRID_PASSWORD'),
      },
    });
  }

  async send(template, subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: await readFile(
        `./../fruits-store-backend/emails/${template}.html`,
        'utf8'
      ),
      text: convert(
        await readFile(
          `./../fruits-store-backend/emails/${template}.html`,
          'utf8'
        )
      ),
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Fruits store Family!');
  }

  async sendPasswordReset(subject) {
    const htmlSource = fs.readFileSync(
      `./../fruits-store-backend/emails/passwordReset.html`,
      'utf-8'
    );
    const template = handlebars.compile(htmlSource);
    const replacements = {
      name: this.user.name,
      resetURL: this.url,
    };
    const htmlToSend = template(replacements);
    const mailOptions = {
      from: this.from,
      to: this.to,
      html: htmlToSend,
      text: htmlToSend.toString(),
      subject,
    };
    await this.newTransport().sendMail(mailOptions);
  }
}
