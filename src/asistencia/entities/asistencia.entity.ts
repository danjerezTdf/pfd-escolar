import { EstudianteClase } from 'src/estudiantes/entities/estudiante_clase.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'asistencia' })
export class Asistencia {
  //atributos
  @PrimaryColumn({ name: 'estudianteClaseId' })
  claseId: number;
  @PrimaryColumn({ name: 'estudianteClaseEstuadianteId' })
  estudianteId: number;
  @CreateDateColumn()
  fecha: Date;

  //relaciones
  @ManyToOne(
    () => EstudianteClase,
    (estudianteClase) => estudianteClase.asistencia,
  )
  @JoinColumn()
  estudianteClase: EstudianteClase;

  //constructor
  constructor(claseId: number, estudianteId: number) {
    this.claseId = claseId;
    this.estudianteId = estudianteId;
  }
  //geter y seter
}
