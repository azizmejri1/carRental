import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './userDto';
import * as bcrypt from 'bcrypt';
import { AuthController } from 'src/auth/auth.controller';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,private readonly authService : AuthService) {}

    async create(userDto:UserDto,@Res() res : Response){
      
        const {name, email, password} = userDto;
        try{
            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltOrRounds);
            const user = this.userRepository.create({name, email, password: hashedPassword});
            await this.userRepository.save(user);
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
}
