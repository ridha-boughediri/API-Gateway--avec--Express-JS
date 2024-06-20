import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signupDto';
import { signinDTO } from './dto/signinDto';
import { resetPasswordDTO } from './dto/resetPasswordDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signup(@Body() signupDTO: SignupDTO) {
        return this.authService.signup(signupDTO);
    }

    @Post('signin')
    signin(@Body() signinDTO: signinDTO) {
        return this.authService.signin(signinDTO);
    }

    @Post('reset-password')
    resetPassword(@Body() resetPasswordDTO: resetPasswordDTO) {
        return this.authService.resetPassword(resetPasswordDTO);
    }
}
