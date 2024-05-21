import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupDTO } from './dto/signupDto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'; 
import { MailerService } from '../mailer/mailer.service';
import { signinDTO } from './dto/signinDto';
import { JwtService } from '@nestjs/jwt'; // Un seul import de JwtService
import { ConfigService } from '@nestjs/config';
import { resetPasswordDTO } from './dto/resetPasswordDto';
import * speakeasy from "speakeasy"
@Injectable()
export class AuthService {

    constructor(
        private readonly PrismaService: PrismaService,
        private readonly MailerService: MailerService,
        private readonly JwtService: JwtService,
        private readonly ConfigService: ConfigService
    ) { }

    async signup(signupDTO: SignupDTO) {
        const { email, name, password, lastname, firstname } = signupDTO;

        const existingUser = await this.PrismaService.user.findUnique({ where: { email } });
            
        if (existingUser) throw new ConflictException('User already exists');

        const hash = await bcrypt.hash(password, 10);

        await this.PrismaService.user.create({
            data: { email, name, lastname, firstname, password: hash },
        });

        await this.MailerService.sendSignupConfirmation(email);

        return { message: 'User successfully created' };
    }

    async signin(signinDTO: signinDTO) {
        const { email, password } = signinDTO;

        // Vérifier si l'utilisateur existe déjà
        const user = await this.PrismaService.user.findUnique({ where: { email } });
        if (!user) throw new NotFoundException('User not found');

        // Comparer le mot de passe
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('Invalid credentials');

        const payload = { username: user.email, sub: user.id };

        const token = this.JwtService.sign(payload, {
            expiresIn: '1h', // 'h1' modifié en '1h'
            secret: this.ConfigService.get('SECRET_KEY') // Correction de la clé secrète
        });

        // Retourner le token ou faire ce que vous voulez en faire...
        return { token, username: user.firstname };
    }

    // async resetpassword(resetPasswordDTO: resetPasswordDTO) {
    //     const { email } = resetPasswordDTO;
    
    //     // Vérifier si l'utilisateur existe déjà
    //     const user = await this.PrismaService.user.findUnique({ where: { email } });
    //     if (!user) throw new NotFoundException('User not found');
    
    //     // Générer un jeton de réinitialisation de mot de passe (peut être un jeton JWT ou un jeton aléatoire)
    //     const resetToken = generateResetToken(); // Fonction à implémenter
    
    //     // Stocker le jeton de réinitialisation dans la base de données ou une autre méthode de stockage
    //     await this.PrismaService.resetToken.create({
    //         data: {
    //             userId: user.id,
    //             token: resetToken,
    //             expiresAt: new Date(Date.now() + 3600000) // Expiration dans 1 heure
    //         }
    //     });
    
    //     // Envoyer un e-mail à l'utilisateur avec un lien contenant le jeton de réinitialisation
    //     await this.MailerService.sendPasswordResetEmail(email, resetToken);
    
    //     return { message: 'Password reset instructions sent to your email' };
    // }
    
    // function generateResetToken() {
    //     // Générer un jeton aléatoire ou utiliser une bibliothèque pour générer un jeton sécurisé
    //     // Par exemple, vous pouvez utiliser `crypto` pour générer un jeton aléatoire
    //     const token = crypto.randomBytes(20).toString('hex');
    //     return token;
    // }
    
    async resetPasswordDTO(resetPasswordDTO:resetPasswordDTO) {
        const {email} = resetPasswordDTO;
        const user =await this.PrismaService.user.findUnique({where:{email}});
        if(!user) throw new NotFoundException('User not found');
        const code = speakeasy.totp({
            secret: this.ConfigService.get("OTP_CODE"),
            digits: 5,
            step: 60* 15,
            encoding: "base32"
        })
        const url = "http://localhsot:3000/auth/reset-password-confirmation"
    
        
    }
}
