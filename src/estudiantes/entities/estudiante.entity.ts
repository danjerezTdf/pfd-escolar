import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsString()
  @IsNotEmpty()
  apellidoNombre: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  fechaNacimiento: string;

  constructor(apellidoNombre: string, fechaNacimiento: string) {
    this.apellidoNombre = apellidoNombre;
    this.fechaNacimiento = fechaNacimiento;
  }
  public getId(): number {
    return this.id;
  }
  public getNombreApellido(): string {
    return this.apellidoNombre;
  }
  public setNombreApellido(nombreApellido: string) {
    this.apellidoNombre = nombreApellido;
  }
  public getFechaNacimiento(): string {
    return this.fechaNacimiento;
  }
  public setFechaNacimiento(fechaNacimiento: string) {
    this.fechaNacimiento = fechaNacimiento;
  }
}
