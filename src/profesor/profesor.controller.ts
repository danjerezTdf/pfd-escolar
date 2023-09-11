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
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get('getAll')
  async findAll() {
    return await this.profesorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Profesor> {
    return await this.profesorService.findOne(id);
  }

  @Post('create')
  create(@Body() createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    return this.profesorService.create(createProfesorDto);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateProfesorDto: UpdateProfesorDto,
  ) {
    return this.profesorService.update(+id, updateProfesorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesorService.remove(+id);
  }
}
