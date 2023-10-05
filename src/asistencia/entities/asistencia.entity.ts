import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EstudianteClase } from 'src/estudiantes/entities/estudiante_clase.entity';

@Entity('asistencia')
export class Asistencia {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  fecha: Date;

  @ManyToOne(
    () => EstudianteClase,
    (estudianteClase) => estudianteClase.asistencia,
  )
  @JoinColumn()
  estudianteClase: EstudianteClase;
}
