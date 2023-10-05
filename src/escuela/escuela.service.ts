import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EscuelaDto } from './dto/escuela.dto';
import { Escuela } from './entities/escuela.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EscuelaService {
  constructor(
    @InjectRepository(Escuela)
    private escuelaRepository: Repository<Escuela>,
  ) {}

  async findAllSchools(): Promise<Escuela[]> {
    return await this.escuelaRepository.find();
  }

  async findOneSchool(id: number): Promise<EscuelaDto> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const escuela: EscuelaDto = await this.escuelaRepository.findOne(
        criterio,
      );
      if (escuela) return escuela;
      else throw new Error('No se encuentra la escuela');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Error en escuela - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createSchool(escuelaDto: EscuelaDto): Promise<boolean> {
    try {
      const escuela: Escuela = await this.escuelaRepository.save(
        new Escuela(escuelaDto.nombre, escuelaDto.domicilio),
      );
      if (escuela) return true;
      else throw new Error('No se pudo crear la escuela');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en escuela - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateSchool(EscuelaDto: EscuelaDto, id: number): Promise<string> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let escuela: Escuela = await this.escuelaRepository.findOne(criterio);

      if (!escuela)
        throw new Error('no se pudo encontrar la escuela a modificar ');
      else {
        const escuelaVieja = escuela.getNombre();

        if (EscuelaDto.nombre != null && EscuelaDto.nombre != undefined)
          escuela.setNombre(EscuelaDto.nombre);

        escuela = await this.escuelaRepository.save(escuela);
        return `OK - ${escuelaVieja} --> ${EscuelaDto.nombre}`;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en escuela - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteSchool(id: number): Promise<any> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const escuela: Escuela = await this.escuelaRepository.findOne(criterio);
      if (!escuela) throw new Error('no se eliminar escuela ');
      else {
        await this.escuelaRepository.remove(escuela);
        return { id: id, message: 'se elimino exitosamente' };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en escuela - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
