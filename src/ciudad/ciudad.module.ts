import { Module } from '@nestjs/common';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadProfesor } from './entities/ciudad_profesor.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad, CiudadProfesor, Escuela])],
  controllers: [CiudadController],
  providers: [CiudadService],
})
export class CiudadModule {}
