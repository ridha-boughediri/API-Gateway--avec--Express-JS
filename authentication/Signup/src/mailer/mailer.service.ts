import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
 
  private async transporter() {
    const testAccount = await nodemailer.createTestAccount();
    const transport = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      ignoreTLS: true,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    return transport;
  }

  async sendSignupConfirmation(userEmail: string) {
    (await this.transporter()).sendMail({
      from: 'app@localhost.com',
      to: userEmail,
      subject: 'Inscription',
      html: '<h3>Confirmation of inscription</h3>',
    });
  }


  // reset password methode 

  async sendResetConfirmation(userEmail:string){
    (await this.transporter()).sendMail({
      from:'app@localhost.com',
      to: userEmail,
      subject:'Reset mot de passe',
      html:`
      <h3>Modifier votre mot de passe
      Your OTP (It is expired after 1 min) </h3> `
    })
  }
}
