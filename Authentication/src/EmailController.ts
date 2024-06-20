// Importer le module Injectable depuis NestJS pour marquer cette classe comme injectable
import { Injectable } from '@nestjs/common';
// Importer le module ConfigService depuis NestJS pour accéder facilement aux variables d'environnement
import { ConfigService } from '@nestjs/config';
// Importer le module nodemailer pour envoyer des emails
import * as nodemailer from 'nodemailer';

// Marquer cette classe comme injectable afin qu'elle puisse être injectée dans d'autres composants
@Injectable()
export class MailerService {
  // Déclarer un constructeur qui prend ConfigService comme paramètre d'injection de dépendance
  constructor(private configService: ConfigService) {}

  // Définir une méthode privée pour créer un transporteur de messagerie
  private async transporter() {
    // Créer un transporteur en utilisant les paramètres SMTP à partir des variables d'environnement
    const transport = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'), // Récupérer l'hôte SMTP depuis les variables d'environnement
      port: this.configService.get<number>('SMTP_PORT'), // Récupérer le port SMTP depuis les variables d'environnement
      auth: {
        user: this.configService.get<string>('SMTP_USER'), // Récupérer l'utilisateur SMTP depuis les variables d'environnement
        pass: this.configService.get<string>('SMTP_PASS'), // Récupérer le mot de passe SMTP depuis les variables d'environnement
      },
    });

    // Retourner le transporteur nouvellement créé
    return transport;
  }

  // Définir une méthode pour envoyer un email de confirmation d'inscription
  async sendSignupConfirmation(userEmail: string) {
    // Utiliser le transporteur pour envoyer un email
    (await this.transporter()).sendMail({
      from: 'app@localhost.com', // Adresse email de l'expéditeur
      to: userEmail, // Adresse email du destinataire
      subject: 'Inscription', // Sujet de l'email
      html: '<h3>Confirmation of inscription</h3>', // Contenu HTML de l'email
    });
  }

  // Définir une méthode pour envoyer un email de confirmation de réinitialisation de mot de passe
  async sendResetConfirmation(userEmail: string) {
    // Utiliser le transporteur pour envoyer un email
    (await this.transporter()).sendMail({
      from: 'app@localhost.com', // Adresse email de l'expéditeur
      to: userEmail, // Adresse email du destinataire
      subject: 'Reset mot de passe', // Sujet de l'email
      html: `
        <h3>Modifier votre mot de passe
        Your OTP (It is expired after 1 min)</h3>`, // Contenu HTML de l'email
    });
  }
}
