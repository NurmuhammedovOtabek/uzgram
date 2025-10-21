import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Chenel } from "./schemas/channel.schema";
import { Model } from "mongoose";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";

@Injectable()
export class ChenelService {
  constructor(
    @InjectModel(Chenel.name) private readonly chenelModel: Model<Chenel>
  ) {}

  create(createChenelDto: CreateChannelDto) {
    return this.chenelModel.create(createChenelDto);
  }

  findAll() {
    return this.chenelModel.find().populate("ownerId");
  }

  findOne(id: string) {
    return this.chenelModel.findById(id).populate("ownerId");
  }

  update(id: string, updateChenelDto: UpdateChannelDto) {
    return this.chenelModel.findByIdAndUpdate(id, updateChenelDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.chenelModel.findByIdAndDelete(id);
  }
}
