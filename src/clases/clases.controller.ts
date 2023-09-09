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
import { ClasesService } from './clases.service';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { Clase } from './entities/clase.entity';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Get('getAll')
  async getAll(): Promise<Clase[]> {
    return await this.clasesService.findAllClase();
  }

  @Get('id')
  async getById(@Param('id') id: number): Promise<Clase> {
    return await this.clasesService.findOneClase(id);
  }
  @Post('create')
  createClase(@Body() createClaseDto: CreateClaseDto): Promise<boolean> {
    return this.clasesService.createClase(createClaseDto);
  }
  @Put('update/:id')
  async updateClase(@Param('id') id, @Body() clase: UpdateClaseDto) {
    return this.clasesService.updateClase(id, clase);
  }
  @Delete('remove/:id')
  removeClase(@Param('id') id: number) {
    return this.clasesService.deleteClase(id);
  }

  // @Post()
  // create(@Body() createClaseDto: CreateClaseDto) {
  //   return this.clasesService.create(createClaseDto);
  // }

  // @Get()
  // findAll() {
  //   return this.clasesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.clasesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClaseDto: UpdateClaseDto) {
  //   return this.clasesService.update(+id, updateClaseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.clasesService.remove(+id);
  // }
}
