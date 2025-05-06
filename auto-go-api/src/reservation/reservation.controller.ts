import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CreateReservationDto, ReservationDto } from './reservationDto';
import { ReservationService } from './reservation.service';
import { AuthGuard } from 'src/auth/AuthGuard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { Reservation } from './reservation.entity';

@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    
    @Post('create')
    async createReservation(@Body() createReservationDto: CreateReservationDto) {
        return this.reservationService.createReservation(createReservationDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async updateReservation(@Param('id') id: number, @Body() updateReservationDto: Partial<CreateReservationDto>) {
        return this.reservationService.updateReservation(id, updateReservationDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.reservationService.delete(id);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getReservationByCarId(@Param('id') id: number) {
        return this.reservationService.getReservationByCarId(id);
    }

    @UseGuards(AuthGuard)
    @Get('getReservationByCompany/:id')
    async getReservationsByCompany(@Param('id') id: number){
        return this.reservationService.getReservationsByCompany(id);
    }

    @UseGuards(AuthGuard)
    @Get('getReservationsByUser/:id')
    async getReservationsByUser(@Param('id') id: number) : Promise<ReservationDto[]>{
        return this.reservationService.getReservationsByUser(id);
    }
    
}
