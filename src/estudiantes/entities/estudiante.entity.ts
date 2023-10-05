import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estudiante {
  //atributo
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  fecha_Nacimiento: Date;
  //relaciones

  //constructor
  constructor(nombre: string, apellido: string, fechaNacimiento: Date) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.fecha_Nacimiento = fechaNacimiento;
  }

  //geters y seters
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
  public getFechaNacimiento(): Date {
    return this.fecha_Nacimiento;
  }
  public setFechaNacimiento(fechaNacimiento: Date) {
    this.fecha_Nacimiento = fechaNacimiento;
  }
}
