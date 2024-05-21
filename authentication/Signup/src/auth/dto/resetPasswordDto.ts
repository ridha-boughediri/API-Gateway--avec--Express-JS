import {IsNotEmpty, IsEmail} from "class-validator"


export class resetPasswordDTO {
  
    @IsNotEmpty()
    @IsEmail()

    readonly email : string

    // @IsNotEmpty()
    // readonly password :string

  

}