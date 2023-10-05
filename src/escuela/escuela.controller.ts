import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { EscuelaDto } from './dto/escuela.dto';
import { Escuela } from './entities/escuela.entity';

@Controller('escuela')
export class EscuelaController {
  constructor(private readonly escuelaService: EscuelaService) {}

  @Get('getAll')
  async getAll(): Promise<Escuela[]> {
    return await this.escuelaService.findAllSchools();
  }
  @Get(':id')
  async getById(@Param('id') id: number): Promise<EscuelaDto> {
    return await this.escuelaService.findOneSchool(id);
  }
  @Post('create')
  async create(@Body() EscuelaDto: EscuelaDto): Promise<boolean> {
    return this.escuelaService.createSchool(EscuelaDto);
  }
  @Put('update/:id')
  async update(@Param('id') id, @Body() EscuelaDto: EscuelaDto) {
    return this.escuelaService.updateSchool(EscuelaDto, id);
  }
  @Delete('remove/:id')
  async remove(@Param('id') id: number): Promise<Escuela> {
    return this.escuelaService.deleteSchool(id);
  }
}
