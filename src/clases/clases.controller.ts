import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ClasesService } from './clases.service';
import { ClaseDto } from './dto/clase.dto';
import { Clase } from './entities/clase.entity';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Get('getAll')
  async getAll(): Promise<Clase[]> {
    return await this.clasesService.findAllClase();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Clase> {
    return await this.clasesService.findOneClase(id);
  }
  @Post('create')
  createClase(@Body() createClaseDto: ClaseDto): Promise<boolean> {
    return this.clasesService.createClase(createClaseDto);
  }
  @Put('update/:id')
  async updateClase(@Param('id') id, @Body() updateClase: ClaseDto) {
    return this.clasesService.updateClase(updateClase, id);
  }
  @Delete('remove/:id')
  removeClase(@Param('id') id: number) {
    return this.clasesService.deleteClase(id);
  }
}
