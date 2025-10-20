import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { GenderUser } from "../schemas/user.schema";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  gender: GenderUser;

  @IsString()
  bio: string;

  @IsInt()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
  password2nd: string;
}
