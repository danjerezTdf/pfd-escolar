import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class EstudiantesService {
  //constructor con el inject del Repository
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  async findAllStudent(): Promise<EstudianteDto[]> {
    return await this.estudianteRepository.find();
  }

  async findOneStudent(id: number): Promise<EstudianteDto> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const estudiante: EstudianteDto = await this.estudianteRepository.findOne(
        criterio,
      );
      if (estudiante) return estudiante;
      else throw new Error('No se encuentra el o la estudiante');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Error en estudiante - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createStudent(EstudianteDto: EstudianteDto): Promise<boolean> {
    try {
      const estudiante: Estudiante = await this.estudianteRepository.save(
        new Estudiante(
          EstudianteDto.nombre,
          EstudianteDto.apellido,
          EstudianteDto.fecha_Nacimiento,
        ),
      );
      if (estudiante) return true;
      else throw new Error('No se pudo crear el Estudiante');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en estudiante - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateStudent(estudianteDto: EstudianteDto, id: number) {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let estudiante: Estudiante = await this.estudianteRepository.findOne(
        criterio,
      );

      if (!estudiante)
        throw new Error('no se pudo encontrar la estudiante a modificar ');
      else {
        const estudianteViejo = estudiante.getNombre();

        if (estudianteDto.nombre != null && estudianteDto.nombre != undefined) {
          estudiante.setNombre(estudianteDto.nombre);
        }
        if (
          estudianteDto.apellido != null &&
          estudianteDto.apellido != undefined
        ) {
          estudiante.setApellido(estudianteDto.apellido);
        }
        if (
          estudianteDto.fecha_Nacimiento != null &&
          estudianteDto.fecha_Nacimiento != undefined
        ) {
          estudiante.setFechaNacimiento(estudianteDto.fecha_Nacimiento);
        }

        estudiante = await this.estudianteRepository.save(estudiante);
        return `OK - ${estudianteViejo} --> ${estudianteDto.nombre}`;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en estudiante - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteStudent(id: number): Promise<any> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const estudiante: Estudiante = await this.estudianteRepository.findOne(
        criterio,
      );
      if (!estudiante) throw new Error('no se puedeliminar estudiante ');
      else {
        await this.estudianteRepository.remove(estudiante);
        return { id: id, message: 'se elimino exitosamente' };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en estudiante - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
