import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ChenelUser } from "./schemas/channel-user.schema";
import { Model } from "mongoose";
import { CreateChannelUserDto } from "./dto/create-channel-user.dto";
import { UpdateChannelUserDto } from "./dto/update-channel-user.dto";

@Injectable()
export class ChannelUserService {
  constructor(
    @InjectModel(ChenelUser.name)
    private readonly chenelUserModel: Model<ChenelUser>
  ) {}

  create(createChenelUserDto: CreateChannelUserDto) {
    return this.chenelUserModel.create(createChenelUserDto);
  }

  findAll() {
    return this.chenelUserModel.find().populate("chenelId").populate("userId");
  }

  findOne(id: string) {
    return this.chenelUserModel
      .findById(id)
      .populate("chenelId")
      .populate("userId");
  }

  update(id: string, updateChenelUserDto: UpdateChannelUserDto) {
    return this.chenelUserModel.findByIdAndUpdate(id, updateChenelUserDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.chenelUserModel.findByIdAndDelete(id);
  }
}
