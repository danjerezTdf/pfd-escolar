//import
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CiudadProfesor } from './ciudad_profesor.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';

//atributos
@Entity({ name: 'ciudad' })
export class Ciudad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  //relaciones
  @OneToMany(() => CiudadProfesor, (domicilios) => domicilios.ciudad)
  domicilios: CiudadProfesor[];

  @OneToMany(() => Escuela, (escuela) => escuela.ciudad)
  public escuelas: Escuela[];

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
