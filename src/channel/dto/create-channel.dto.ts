import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChannelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(["public", "private"])
  status?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  ownerId: string;
}
