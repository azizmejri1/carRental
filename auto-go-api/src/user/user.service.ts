import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, Request, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { ActivateUserDto, UserDto } from './userDto';
import * as bcrypt from 'bcrypt';
import { AuthController } from 'src/auth/auth.controller';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
    private readonly authService : AuthService,
    private readonly mailService : MailService,
  ) {}

    async create(userDto:UserDto,@Res() res : Response){
      
        const {name, email, password} = userDto;
        try{
            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltOrRounds);
            const user = this.userRepository.create({name, email, password: hashedPassword});
            const code  = await this.getActivationCode(user);
            await this.sendActivationCode(email,code,name);
            await this.authService.login({email, password,role:'user'}, res); 
        }catch (error) {
            if (error.code === '23505') { // Unique violation error code for PostgreSQL
              throw new ConflictException('Email already exists');
            }
            throw new InternalServerErrorException('Unexpected error occurred');
        }
        
    }

    async update(id: number, updateUserDto: Partial<UserDto>): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }

    async delete(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

    async getActivationCode(user : User) : Promise<string>{
      const length = 6;
      const code = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
      user.activationCode = code;
      user.activationCodeExpiration = new Date(Date.now() + 15 * 60 * 1000);
      await this.userRepository.save(user);
      return code;
    }

    async sendActivationCode(email:string,code:string,name:string){
      const subject : string = "Account activation"
      const text : string = "your code is : " + code;
      const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Email</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 5px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            font-size: 24px;
            color: #333333;
          }
          .content {
            font-size: 16px;
            color: #555555;
            line-height: 1.5;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #aaaaaa;
            margin-top: 30px;
          }
          .code-box {
            background-color: #f0f0f0;
            border-radius: 4px;
            padding: 10px;
            font-weight: bold;
            font-size: 20px;
            color: #000;
            letter-spacing: 2px;
            text-align: center;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">Welcome to AutoGo!</div>
          <div class="content">
            <p>Hi {{username}},</p>
            <p>Thank you for registering. Please use the code below to verify your email address:</p>
            <div class="code-box">{{verificationCode}}</div>
            <p>This code will expire in 15 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
          <div class="footer">
            &copy; 2025 AutoGo. All rights reserved.
          </div>
        </div>
      </body>
      </html>
      `;
      const finalHtml = htmlTemplate
      .replace('{{username}}', name)
      .replace('{{verificationCode}}', code);
      await this.mailService.sendMail(email,subject,text,finalHtml);
    }

    async verifyActivationCode(activateUserDto : ActivateUserDto,@Request() req) {
      const {userId ,code } = activateUserDto;
      const user = await this.userRepository.findOne({where : {id: userId}});
      if(user?.activationCode == code){
        user.activated = true;
        await this.userRepository.save(user);
        req['user'].activated = true;
        return true;
      }
      return false;
    }

    async accountActivated(id : number){
      const user = await this.userRepository.findOne({where : {id}});
      if(!user){
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user.activated;
    }
}
