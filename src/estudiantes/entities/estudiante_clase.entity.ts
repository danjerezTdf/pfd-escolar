import {
  //Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  //OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Estudiante } from './estudiante.entity';
import { Clase } from 'src/clases/entities/clase.entity';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';
// import { Asistencia } from 'src/asistencia/entities/asistencia.entity';

@Entity('clase_estudiante')
export class EstudianteClase {
  @PrimaryColumn()
  estudianteId: number;

  @PrimaryColumn()
  claseId: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.estudianteClases)
  @JoinColumn()
  estudiante: Estudiante;

  @ManyToOne(() => Clase, (clase) => clase.estudianteClases)
  @JoinColumn()
  clase: Clase;

  @OneToMany(() => Asistencia, (asistencia) => asistencia.estudianteClase)
  asistencia: Asistencia;

  constructor(estudiante: number, clase: number) {
    this.estudianteId = estudiante;
    this.claseId = clase;
  }
}
