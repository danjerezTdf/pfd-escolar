import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { Estudiante } from './entities/estudiante.entity';
import { Clase } from 'src/clases/entities/clase.entity';
import { EstudianteClase } from './entities/estudiante_clase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadEstudiante } from 'src/ciudad/entities/ciudad_estudiante.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Estudiante,
      Clase,
      EstudianteClase,
      CiudadEstudiante,
    ]),
  ],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
})
export class EstudiantesModule {}
