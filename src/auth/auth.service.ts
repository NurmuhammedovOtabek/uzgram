import { BadRequestException, ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt"
import { Response } from 'express';
import { AdminService } from '../admin/admin.service';
import { AdminDocument } from '../admin/schemas/admin.schema';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { LoginAdminDto } from '../admin/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtservice: JwtService
  ) {}

  private async genereteTokens(admin: AdminDocument) {
    const paylod = {
      id: admin._id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [accsessToken, refreshToken] = await Promise.all([
      this.jwtservice.sign(paylod, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME as any,
      }),
      this.jwtservice.sign(paylod, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME as any,
      }),
    ]);
    return { accsessToken, refreshToken };
  }

  async registration(createadminDto: CreateAdminDto) {
    const candidate = await this.adminService.findByEmail(createadminDto.email);
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi majud");
    }
    const newadmin = await this.adminService.create(createadminDto);
    return newadmin;
  }

  async login(loginadminDto: LoginAdminDto, res:Response) {
    const admin = await this.adminService.findByEmail(loginadminDto.email);
    if (!admin) {
      throw new UnauthorizedException("Parol yoki email notog'ri");
    }
    const confirmPassword = await bcrypt.compare(
      loginadminDto.password,
      admin.password
    );
    if (!confirmPassword) {
      throw new UnauthorizedException("Parol yoki email notog'ri");
    }

    const {accsessToken, refreshToken} = await this.genereteTokens(admin)
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7)
    admin.refreshToken = hashedRefreshToken
    await admin.save()

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true
    });
    
    return{
        message: "Toriga otin",
        id: admin.id,
        accsessToken
    }
  }

  async logout (refreshToken: string, res:Response){
    const adminDate = await this.jwtservice.verify(refreshToken, {
      secret: process.env.REFRESH_sECTER_KEy
    });
    if(!adminDate){
      throw new ForbiddenException("admin not varified")
    }
    const admin = await this.adminService.findOne(adminDate.id)
    if(!admin){
      throw new BadRequestException("Notog'ri token")
    }
    admin.refreshToken = ""
    await admin.save()

    res.clearCookie("refreshToken")
    return {
      message: "admin Loged out"
    }

  }

  async refreshToken(adminId: string, refresh_token: string, res:Response){
    const decodToken = await this.jwtservice.decode(refresh_token)


    if(adminId !== decodToken["id"]){
      throw new ForbiddenException("Ruxsat erilmagan id")
    }
    const admin = await this.adminService.findOne(adminId)

    if(!admin || !admin.refreshToken){
      throw new ForbiddenException("Foribbden")
    }

    const  {accsessToken, refreshToken} = await  this.genereteTokens(admin)
    admin.refreshToken = await bcrypt.hash(refreshToken, 7)
    await admin.save()

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true
    });
    return {
      message: "admin refreshed",
      adminId: admin.id,
      accsessToken
    }
  }

}
