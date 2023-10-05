import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaDto } from './dto/asistencia.dto';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post('create')
  async create(@Body() asistenciaDto: AsistenciaDto) {
    return this.asistenciaService.createAttendance(asistenciaDto);
  }

  @Get('getAll')
  async findAll() {
    return this.asistenciaService.findAllAttendance();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.asistenciaService.findOneAttendance(id);
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() asistenciaDto: AsistenciaDto) {
    return this.asistenciaService.updateAttendance(id, asistenciaDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: number) {
    return this.asistenciaService.deleteAttendance(id);
  }
}
