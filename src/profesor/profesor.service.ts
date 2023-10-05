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

      if (!profesor)
        throw new Error('no se pudo encontrar el profesor a modificar ');
      else {
        const profesorViejo = profesor.getNombre();

        if (profesorDto.nombre != null && profesorDto.nombre != undefined)
          profesor.setNombre(profesorDto.nombre);

        profesor = await this.profesorRepository.save(profesor);
        return `OK - ${profesorViejo} --> ${profesorDto.nombre}`;
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

  async removeTeacher(id: number): Promise<any> {
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
