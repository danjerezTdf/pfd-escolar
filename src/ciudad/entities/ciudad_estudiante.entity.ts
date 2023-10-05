import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Ciudad } from './ciudad.entity';

@Entity({ name: 'ciudad_estudiante' })
export class CiudadEstudiante {
  //atributos
  @PrimaryColumn()
  estudianteId: number;

  @PrimaryColumn()
  ciudadId: number;

  @Column()
  direction: string;

  constructor(estudianteId: number, ciudadId: number, direction: string) {
    this.estudianteId = estudianteId;
    this.ciudadId = ciudadId;
    this.direction = direction;
  }
  //relaciones
  @ManyToOne(() => Estudiante, (estudiante) => estudiante.domicilios)
  estudiante: Estudiante;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.domicilios)
  ciudad: Ciudad;
}
