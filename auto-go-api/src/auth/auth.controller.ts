import { Body, Controller, Get, Post, Res, UseGuards,Request } from '@nestjs/common';
import { LoginDto } from './LoginDto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from './AuthGuard';
import { Roles } from './roles.decorator';
import { Role } from './roles.enum';

@Controller('auth') 
export class AuthController {

    constructor(private readonly authService :AuthService ){}

    @Post("login")
    async login(@Body() loginDto : LoginDto,@Res() res:Response){
        this.authService.login(loginDto,res);
        
    }
    @UseGuards(AuthGuard)
    @Post('logout')
    logout(@Res() res: Response) {
        res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });

    res.status(200).send({ message: 'Logged out and cookie cleared' });
   }

   
    @Roles(Role.User,Role.Admin)
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    

    @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    @Get('admin')
    getAdminProfile(@Request() req) {
        return req.user;
    }

}
