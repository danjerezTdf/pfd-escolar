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
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { UpdateEscuelaDto } from './dto/update-escuela.dto';
import { Escuela } from './entities/escuela.entity';

@Controller('escuela')
export class EscuelaController {
  // constructor(private readonly escuelaService: EscuelaService) {}
  // @Get('getAll')
  // async getAll(): Promise<Escuela[]> {
  //   return await this.escuelaService.findAllEscuelas();
  // }
  // @Get(':id')
  // async getById(@Param('id') id: number): Promise<Escuela> {
  //   return await this.escuelaService.findOneEscuela(id);
  // }
  // @Post('create')
  // createEscuela(@Body() createEscuelaDto: CreateEscuelaDto): Promise<boolean> {
  //   return this.escuelaService.createEscuela(createEscuelaDto);
  // }
  // @Put('update/:id')
  // async updateEscuela(
  //   @Param('id') id,
  //   @Body() updateEscuelaDto: UpdateEscuelaDto,
  // ) {
  //   return this.escuelaService.updateEscuela(updateEscuelaDto, id);
  // }
  // @Delete('remove/:id')
  // removeEscuela(@Param('id') id: number) {
  //   return this.escuelaService.deleteEscuela(id);
  // }
}
