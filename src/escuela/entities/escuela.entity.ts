import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Escuela {
  //atributos
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsString()
  @IsNotEmpty()
  nombre: string;
  @Column()
  @IsString()
  @IsNotEmpty()
  domicilio: string;
  //relaciones

  //constructor
  constructor(nombre: string, domicilio: string) {
    this.nombre = nombre;
    this.domicilio = domicilio;
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
  public getdomicilio(): string {
    return this.domicilio;
  }
  public setdomicilio(domicilio: string) {
    this.domicilio = domicilio;
  }
}
