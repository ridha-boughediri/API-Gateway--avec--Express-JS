import {IsNotEmpty, IsEmail} from "class-validator"


export class SignupDTO {
    @IsNotEmpty()

    readonly name : string
    @IsNotEmpty()
    @IsEmail()

    readonly email : string
    @IsNotEmpty()

    readonly password :string
    @IsNotEmpty()

    readonly lastname :string
    @IsNotEmpty()

    readonly firstname :string

}