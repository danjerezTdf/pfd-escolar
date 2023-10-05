import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CiudadProfesor } from 'src/ciudad/entities/ciudad_profesor.entity';
import { Clase } from 'src/clases/entities/clase.entity';

@Entity({ name: 'profesor' })
export class Profesor {
  //atributos
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  // @IsString()
  // @IsNotEmpty()
  nombre: string;
  @Column()
  // @IsString()
  // @IsNotEmpty()
  apellido: string;
  //relaciones

  @OneToMany(() => CiudadProfesor, (domicilios) => domicilios.profesor)
  domicilios: CiudadProfesor[];

  @OneToMany(() => Clase, (clases) => clases.profesor)
  clases: Clase[];

  // constructor
  constructor(nombre: string, apellido: string) {
    this.nombre = nombre;
    this.apellido = apellido;
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
  public getApellido(): string {
    return this.apellido;
  }
  public setApellido(apellido: string) {
    this.apellido = apellido;
  }
}
