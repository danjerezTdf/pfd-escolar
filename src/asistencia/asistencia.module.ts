import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteClase } from 'src/estudiantes/entities/estudiante_clase.entity';
import { Asistencia } from './entities/asistencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asistencia, EstudianteClase])],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
})
export class AsistenciaModule {}
