import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signinDTO } from './dto/signinDto';
import { SignupDTO } from './dto/signupDto';
import { resetPasswordDTO } from './dto/resetPasswordDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService : AuthService){}

    //inscription
    @Post('signup')
    signup(@Body() SignupDTO: SignupDTO){
        return this.AuthService.signup(SignupDTO)
    }

    //Singin
    @Post('signin')
    signin(@Body() SigninDTO: signinDTO){
        return this.AuthService.signin(SigninDTO)
    }

    //reset mot de passe

    @Post('reset-password')
    resetPasswordDemand(@Body() resetPasswordDTO: resetPasswordDTO){
        return this.AuthService.resetPasswordDTO(resetPasswordDTO)

    }
}
