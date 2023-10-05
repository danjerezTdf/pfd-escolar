import { IsNotEmpty, IsString } from 'class-validator';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Clase {
  //atributos
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  // relaciones
  @ManyToOne(() => Profesor, (profesor) => profesor.clases)
  @JoinColumn({ name: 'fk_id_profesor' })
  profesor: Profesor;

  @ManyToOne(() => Escuela, (escuela) => escuela.clases)
  @JoinColumn({ name: 'fk_id_escuela' })
  escuela: Escuela;

  //constructor
  constructor(nombre: string) {
    this.nombre = nombre;
  }

  //geter y seter
  public getId(): number {
    return this.id;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public setNombre(nombre: string) {
    this.nombre = nombre;
  }
}
