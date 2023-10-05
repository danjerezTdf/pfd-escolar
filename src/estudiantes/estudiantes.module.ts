import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { Estudiante } from './entities/estudiante.entity';
import { Clase } from 'src/clases/entities/clase.entity';

@Module({
  imports: [Estudiante, Clase],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
})
export class EstudiantesModule {}
