import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorDto } from './dto/profesor.dto';
import { Profesor } from './entities/profesor.entity';
// import { Profesor } from './entities/profesor.entity';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get('getAll')
  async findAll() {
    return await this.profesorService.findAllTeacher();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProfesorDto> {
    return await this.profesorService.findOneTeacher(id);
  }

  @Post('create')
  async create(@Body() createProfesorDto: ProfesorDto): Promise<boolean> {
    return this.profesorService.createTeacher(createProfesorDto);
  }

  @Put('update/:id')
  async update(@Body() profesorDto: ProfesorDto, @Param('id') id: number) {
    return this.profesorService.updateTeacher(profesorDto, id);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: number): Promise<Profesor> {
    return this.profesorService.removeTeacher(id);
  }
}
