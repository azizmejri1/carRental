import { Injectable, Res } from '@nestjs/common';
import { LoginDto } from './LoginDto';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as cookieParser from 'cookie-parser';
import { Response } from 'express';
import { CarRentalCompany } from 'src/rental-company/rental-company.entity';


@Injectable()
export class AuthService {

    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CarRentalCompany)
    private readonly rentalCompanyRepository: Repository<CarRentalCompany>,
    private readonly jwtService: JwtService){}

    async validateUser(loginDto : LoginDto): Promise<User | null> {
        const {email , password} = loginDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return null;
        }
        return user;
    }

    async validateAdmin(loginDto : LoginDto): Promise<CarRentalCompany | null> {
        const {email , password} = loginDto;
        const user = await this.rentalCompanyRepository.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return null;
        }
        return user;
    }

    async login(loginDto : LoginDto,@Res() res:Response) {
        let user : User | CarRentalCompany | null = null;
        if(loginDto.role === 'user'){
            user = await this.validateUser(loginDto);
        }else if(loginDto.role === 'admin'){
            user = await this.validateAdmin(loginDto);
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const payload = { sub: user.id, username: user.email , name: user.name, role: loginDto.role , activated : user.activated };
        const access_token = await this.jwtService.signAsync(payload);
        res.cookie('jwt', access_token, {
            httpOnly: true,  // Prevents client-side JavaScript access
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'strict', // Prevents CSRF attacks
            maxAge: 72 * 60 * 60 * 1000, // 1 day expiration
        });
        res.status(200).json({ message: "Login successful" });
        
    } 
}
