import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudianteDto } from './dto/estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Get('getAll')
  async findAll(): Promise<EstudianteDto[]> {
    return this.estudiantesService.findAllStudent();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EstudianteDto> {
    return this.estudiantesService.findOneStudent(id);
  }

  @Post('create')
  async create(@Body() EstudianteDto: EstudianteDto): Promise<boolean> {
    return this.estudiantesService.createStudent(EstudianteDto);
  }

  @Patch('update/:id')
  async update(@Body() EstudianteDto: EstudianteDto, @Param('id') id: number) {
    return this.estudiantesService.updateStudent(EstudianteDto, id);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: number): Promise<Estudiante> {
    return this.estudiantesService.deleteStudent(id);
  }
}
