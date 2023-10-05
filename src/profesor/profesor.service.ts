import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfesorDto } from './dto/profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  async findAllTeacher(): Promise<ProfesorDto[]> {
    return await this.profesorRepository.find();
  }

  async findOneTeacher(id: number): Promise<ProfesorDto> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const profesor: ProfesorDto = await this.profesorRepository.findOne(
        criterio,
      );
      if (profesor) return profesor;
      else throw new Error('No se encuentra el profesor');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Error en profesor - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createTeacher(profesorDto: ProfesorDto): Promise<boolean> {
    try {
      const profesor: Profesor = await this.profesorRepository.save(
        new Profesor(profesorDto.nombre, profesorDto.apellido),
      );
      if (profesor) return true;
      else throw new Error('No se pudo crear el profesor');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en profesor - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateTeacher(profesorDto: ProfesorDto, id: number): Promise<string> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let profesor: Profesor = await this.profesorRepository.findOne(criterio);

      if (!profesor) {
        throw Error('No se encontró el profesor');
      } else {
        // Verifica si el DTO contiene un nombre
        if (profesorDto.nombre) {
          const nombreViejo = profesor.getNombre();
          profesor.setNombre(profesorDto.nombre);
          profesor = await this.profesorRepository.save(profesor);

          let mensaje = `Nombre actualizado: ${nombreViejo} --> ${profesorDto.nombre}`;

          // Verifica si el DTO contiene un apellido
          if (profesorDto.apellido) {
            const apellidoViejo = profesor.getApellido();
            profesor.setApellido(profesorDto.apellido);
            profesor = await this.profesorRepository.save(profesor);
            mensaje += `, Apellido actualizado: ${apellidoViejo} --> ${profesorDto.apellido}`;
          }

          return `OK - ${mensaje}`;
        } else {
          throw Error('El DTO no contiene un nombre válido');
        }
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en profesor - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteTeacher(id: number): Promise<any> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const profesor: Profesor = await this.profesorRepository.findOne(
        criterio,
      );
      if (!profesor) throw new Error('no se eliminar profesor ');
      else {
        await this.profesorRepository.remove(profesor);
        return { id: id, message: 'se elimino exitosamente' };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en profesor - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
