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
    return await this.ciudadService.findAllCityOrm();
  }
  @Get(':id')
  async getId(@Param('id') id: number): Promise<Ciudad> {
    return await this.ciudadService.findCityById(id);
  }
  @Post('create')
  async create(@Body() body) {
    return await this.ciudadService.createCity(body);
  }
  @Put('update/:id')
  async actualizarCiudadId(
    @Body() ciudadDTO: CiudadDTO,
    @Param('id') id: number,
  ) {
    return await this.ciudadService.updateCity(ciudadDTO, id);
  }
  @Delete('remove/:id')
  async eliminiarCiudadId(@Param('id') id: number) {
    return await this.ciudadService.deleteCityById(id);
  }
}
