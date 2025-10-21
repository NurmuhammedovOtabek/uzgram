import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from '../region/schema/region.schema';
import { Model } from 'mongoose';
import { District } from './schemas/district.schema';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(Region.name) private readonly regionSchema: Model<Region>,
    @InjectModel(District.name) private readonly districySchema: Model<District>
  ) {}
  async create(createDistrictDto: CreateDistrictDto) {
    const regionId = createDistrictDto.regionId
    const region = await this.regionSchema.findById(regionId)
    if(!region){
      throw new NotFoundException("Bunday region yoq")
    }
    const newDistrict = await this.districySchema.create(createDistrictDto)
    region.districts.push(newDistrict)
    await region.save()
    return newDistrict
  }

  findAll() {
    return this.districySchema.find().populate("regionId");
  }

  findOne(id: string) {
    return this.districySchema.findById(id).populate("regionId");
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return `This action updates a #${id} district`;
  }

  remove(id: number) {
    return `This action removes a #${id} district`;
  }
}
