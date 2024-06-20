import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupDTO } from './dto/signupDto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'; 
import { MailerService } from '../mailer/mailer.service';
import { signinDTO } from './dto/signinDto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { resetPasswordDTO } from './dto/resetPasswordDto';
import * as speakeasy from 'speakeasy';
import * as crypto from 'crypto';


@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async signup(signupDTO: SignupDTO) {
        const { email, name, password, lastname, firstname } = signupDTO;

        const existingUser = await this.prismaService.user.findUnique({ where: { email } });
        if (existingUser) throw new ConflictException('User already exists');

        const hash = await bcrypt.hash(password, 10);

        await this.prismaService.user.create({
            data: { email, name, lastname, firstname, password: hash },
        });

        await this.mailerService.sendSignupConfirmation(email);

        return { message: 'User successfully created' };
    }

    async signin(signinDTO: signinDTO) {
        const { email, password } = signinDTO;

        const user = await this.prismaService.user.findUnique({ where: { email } });
        if (!user) throw new NotFoundException('User not found');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('Invalid credentials');

        const payload = { username: user.email, sub: user.id };

        const token = this.jwtService.sign(payload, {
            expiresIn: '1h',
            secret: this.configService.get('SECRET_KEY'),
        });

        return { token, username: user.firstname };
    }

    async resetPassword(resetPasswordDTO: resetPasswordDTO) {
        const { email } = resetPasswordDTO;

        const user = await this.prismaService.user.findUnique({ where: { email } });
        if (!user) throw new NotFoundException('User not found');

        const code = speakeasy.totp({
            secret: this.configService.get('OTP_CODE'),
            digits: 5,
            step: 60 * 15,
            encoding: 'base32',
        });

        const url = `http://localhost:3000/auth/reset-password-confirmation?email=${email}&code=${code}`;

        await this.mailerService.sendPasswordResetEmail(email, code);

        return { message: 'Password reset instructions sent to your email' };
    }

    private generateResetToken(): string {
        return crypto.randomBytes(20).toString('hex');
    }
}
