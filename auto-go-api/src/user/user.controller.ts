import { Body, Controller, Delete, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ActivateUserDto, UserDto } from './userDto';
import { AuthGuard } from 'src/auth/AuthGuard';
import { Response } from 'express';

@Controller('user')
export class UserController {

    constructor(private readonly userService : UserService) { }
    
    @Post('create')
    async createUser(@Body() userDto: UserDto,@Res() res : Response) {
        this.userService.create(userDto,res);
    }

    @Post('activate')
    async verifyActivationCode(@Body() activateUserDto : ActivateUserDto){
        const active = await this.userService.verifyActivationCode(activateUserDto);
        return {isActive : active};
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateUserDto: Partial<UserDto>) {
        return this.userService.update(id, updateUserDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }


}
