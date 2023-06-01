const htmlToText = require('html-to-text');
const nodemailer = require('nodemailer');
const { promisify } = require('util');
const fs = require('fs');

const readFile = promisify(fs.readFile);

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Fruits store  <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV.trim() === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          from: process.env.EMAIL_FROM,
          user: process.env.SENBDGRID_USERNAME,
          pass: process.env.SENBDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.SENBDGRID_USERNAME,
        pass: process.env.SENBDGRID_PASSWORD,
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
      text: htmlToText.convert(
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
};
