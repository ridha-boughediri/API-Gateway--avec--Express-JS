import {IsNotEmpty, IsEmail} from "class-validator"


export class signinDTO {
  
    @IsNotEmpty()
    @IsEmail()

    readonly email : string

    @IsNotEmpty()
    readonly password :string

  

}