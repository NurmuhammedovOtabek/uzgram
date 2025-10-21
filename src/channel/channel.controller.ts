import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ChenelService } from "./channel.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";

@Controller("chenels")
export class ChenelController {
  constructor(private readonly chenelService: ChenelService) {}

  @Post()
  create(@Body() createChenelDto: CreateChannelDto) {
    return this.chenelService.create(createChenelDto);
  }

  @Get()
  findAll() {
    return this.chenelService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.chenelService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateChenelDto: UpdateChannelDto) {
    return this.chenelService.update(id, updateChenelDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.chenelService.remove(id);
  }
}
