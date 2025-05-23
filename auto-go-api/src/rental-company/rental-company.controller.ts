import { Controller, Post, Body, Put, Param, Delete, UseGuards, Res, Get, Req,Request } from '@nestjs/common';
import { RentalCompanyService } from './rental-company.service';
import { ActivateCompanyDto, CreateRentalCompanyDto } from './rentalCompanyDto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { AuthGuard } from 'src/auth/AuthGuard';
import { Response } from 'express';
import { ActivateUserDto } from 'src/user/userDto';

@Controller('rental-company')
export class RentalCompanyController {
    constructor(private readonly rentalCompanyService: RentalCompanyService) {}

    
    @Post('create')
    async create(@Body() createRentalCompanyDto: CreateRentalCompanyDto,@Res() res: Response) {
        this.rentalCompanyService.create(createRentalCompanyDto,res);
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateRentalCompanyDto: Partial<CreateRentalCompanyDto>) {
        return this.rentalCompanyService.update(id, updateRentalCompanyDto);
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.rentalCompanyService.delete(id);
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    @Get('current')
    async getCurrentRentalCompany(@Request() req) {
        return this.rentalCompanyService.getCurrentRentalCompany(req);
    }

    @Get('statistics/:id')
    async getCompanyStatistics(@Param('id') id:number){
        return this.rentalCompanyService.getCompanyStatistics(id);
    }

    @Get('accountActivated/:id')
    async accountActivated(@Param('id') id:number){
        return this.rentalCompanyService.accountActivated(id);
    }

    @UseGuards(AuthGuard)
    @Post('activate')
    async verifyActivationCode(@Body() activateUserDto : ActivateUserDto, @Request() req){
            const active = await this.rentalCompanyService.verifyActivationCode(activateUserDto,req);
            return {isActive : active};
    }
    

}
