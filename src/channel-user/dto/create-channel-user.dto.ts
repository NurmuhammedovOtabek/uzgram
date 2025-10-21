import { IsNotEmpty, IsString } from "class-validator";

export class CreateChannelUserDto {
  @IsNotEmpty()
  @IsString()
  chenelId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
