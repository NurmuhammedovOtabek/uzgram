import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import bcrypt from "bcrypt";


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModels:Model<User>){}

  async create(createUserDto: CreateUserDto) {
    const {user_name, phone_number} = createUserDto
    const verify = await this.userModels.findOne({user_name})
    if(verify){
      throw new ConflictException("Bunday user name egasi mavjud")
    }
    const verify2 = await this.userModels.findOne({ phone_number });
    if (verify2) {
      throw new ConflictException("Bunday telefon raqam egasi mavjud");
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 7)
    if(createUserDto.password2nd){
      createUserDto.password2nd = await bcrypt.hash(createUserDto.password2nd, 7)
    }
    const user = await this.userModels.create(createUserDto)
    return user
  }

  async findAll() {
    const all = await this.userModels.find()
    return all
  }

  async findOneByEmail(email: string) {
    const oneE = await this.userModels.findOne({email})
    return oneE
  }

  async findOne(id: number) {
    const one = await this.userModels.findById(id)
    return one
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const verify = await this.findOne(id)
    if(!verify){
      throw new NotFoundException("Bunda id mavjud emas")
    }
    if(verify.email != updateUserDto.email){
      const verify2 = await this.findOneByEmail(updateUserDto.email!)
      if(verify2){
        throw new ConflictException("Bunday email mavjud")
      }
    }
    if(verify.phone_number != updateUserDto.phone_number){
      const find = await this.userModels.findOne({phone_number: updateUserDto.phone_number})
      if(find){
        throw new ConflictException("Bunday telefon raqam mavjud")
      }
    }
    if (verify.user_name != updateUserDto.user_name) {
      const find = await this.userModels.findOne({
        user_name: updateUserDto.user_name,
      });
      if (find) {
        throw new ConflictException("Bunday user name mavjud");
      }
    }
    const newU  = await this.userModels.findByIdAndUpdate(id, updateUserDto)
    return newU 
  }

  async remove(id: number) {
    const verify = await this.findOne(id);
    if (!verify) {
      throw new NotFoundException("Bunda id mavjud emas");
    }
    
  }
}
