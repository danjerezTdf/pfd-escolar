import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './dto/ciudad.dto';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get('raw')
  async getAllRaw(): Promise<Ciudad[]> {
    return await this.ciudadService.findAllRaw();
  }

  @Get('orm')
  async getAllOrm(): Promise<Ciudad[]> {
    return await this.ciudadService.findAllOrm();
  }
  @Get(':id')
  async getId(@Param('id') id: number): Promise<Ciudad> {
    return await this.ciudadService.findById(id);
  }
  @Post('crear')
  async create(@Body() body) {
    return await this.ciudadService.create(body);
  }
  @Put('actualizar/:id')
  async actualizarCiudadId(
    @Body() ciudadDTO: CiudadDTO,
    @Param('id') id: number,
  ) {
    return await this.ciudadService.updateCity(ciudadDTO, id);
  }
  @Delete('eliminiar/:id')
  async eliminiarCiudadId(@Param('id') id: number) {
    return await this.ciudadService.deleteCityById(id);
  }
}
