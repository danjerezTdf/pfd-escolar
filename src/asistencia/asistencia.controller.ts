import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaDto } from './dto/asistencia.dto';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Get('getAll')
  async findAll(): Promise<AsistenciaDto[]> {
    return this.asistenciaService.findAllAttendance();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AsistenciaDto> {
    return this.asistenciaService.findOneAttendance(+id);
  }

  @Post('create')
  async create(@Body() createAsistenciaDto: AsistenciaDto): Promise<any> {
    return await this.asistenciaService.createAttendance(createAsistenciaDto);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() AsistenciaDto: AsistenciaDto) {
    return this.asistenciaService.updateAttendance(+id, AsistenciaDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return this.asistenciaService.deleteAttendance(+id);
  }
}
