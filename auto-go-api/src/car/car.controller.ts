import { Body, Controller, Delete, Get, Param, Post, Put, Search, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto, SearchCarDto, UpdateCarDto } from './carDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { AuthGuard } from 'src/auth/AuthGuard';

@Controller('car')
export class CarController {
    constructor(private readonly carService: CarService) {}

    @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    @Post('create')
    @UseInterceptors(
        FileInterceptor('image', {
          storage: diskStorage({
            destination: './uploads/cars',
            filename: (req, file, callback) => {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              const ext = extname(file.originalname);
              callback(null, `car-${uniqueSuffix}${ext}`);
            },
          }),
        }),
    )
    create(@UploadedFile() file: Express.Multer.File,@Body() createCarDto: CreateCarDto) {
        return this.carService.create(createCarDto,file.filename);
    }

    @Put(':id')
    @UseInterceptors(
        FileInterceptor('image', {
          storage: diskStorage({
            destination: './uploads/cars',
            filename: (req, file, callback) => {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              const ext = extname(file.originalname);
              callback(null, `car-${uniqueSuffix}${ext}`);
            },
          }),
        }),
    )
    update(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto,@UploadedFile() file: Express.Multer.File) {
        return this.carService.update(id, updateCarDto,file.filename);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.carService.delete(id);
    }

    @Get("getAll")
    findAll() {
        return this.carService.findAll();
    }

    @Get("findByCompany/:id")
    findByCompany(@Param('id') id: number) {
        return this.carService.findByCompany(id);
    }

    @Get("findByCarId/:id")
    findByCarId(@Param('id') id: number){
        return this.carService.findByCarId(id);
    }

    @Post("findCarsByDate")
    findCarsByDate(@Body() searchCarDto : SearchCarDto){
        return this.carService.findCarsByDate(searchCarDto);
    }
}
