import { Body, Controller, Delete, Param, Post, Put, Res, UseGuards, Request, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ActivateUserDto, UserDto, UpdatePasswordDto } from './userDto';
import { AuthGuard } from 'src/auth/AuthGuard';
import { Response } from 'express';

@Controller('user')
export class UserController {

    constructor(private readonly userService : UserService) { }
    
    @Post('create')
    async createUser(@Body() userDto: UserDto,@Res() res : Response) {
        this.userService.create(userDto,res);
    }

    @UseGuards(AuthGuard)
    @Post('activate')
    async verifyActivationCode(@Body() activateUserDto : ActivateUserDto, @Request() req){
        const active = await this.userService.verifyActivationCode(activateUserDto,req);
        return {isActive : active};
    }

    @Get("activated/:id")
    async accountActivated(@Param('id') id:number){
        return this.userService.accountActivated(id);
    }

    @UseGuards(AuthGuard)
    @Post('/updatePassword/:id')
    async updatePassword(@Body() updatePasswordDto:UpdatePasswordDto,@Param('id') id: number){
        return this.userService.updatePassword(updatePasswordDto,id);
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

    @Get(':id')
    async getUserById(@Param('id') id){
        return this.userService.getUserById(id);
    }


}
