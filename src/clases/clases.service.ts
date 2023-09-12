import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';

@Injectable()
export class ClasesService {
  constructor(
    @InjectRepository(Clase)
    private claseRepository: Repository<Clase>,
  ) {}

  async findAllClase(): Promise<Clase[]> {
    return await this.claseRepository.find();
  }

  async findOneClase(id: number): Promise<Clase> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const clase: Clase = await this.claseRepository.findOne(criterio);
      if (clase) return clase;
      else throw new Error('Nose encontro la Clase');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Error en Clase -' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async createClase(createClaseDto: CreateClaseDto): Promise<boolean> {
    try {
      const clase = await this.claseRepository.save(
        new Clase(createClaseDto.nombre),
      );
      if (clase) return true;
      else {
        throw new Error('Nose creo la Clase');
        // return false;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Error en Clase -' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async updateClase(
    updateClaseDto: UpdateClaseDto,
    id: number,
  ): Promise<string> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let clase: Clase = await this.claseRepository.findOne(criterio);
      if (!clase) throw new Error('La clase no existe');
      else {
        const claseVieja = clase.getNombre();
        clase.setNombre(updateClaseDto.nombre);
        clase = await this.claseRepository.save(clase);
        return `OK ${claseVieja} ----> ${updateClaseDto.nombre}`;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Error al Eliminar' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async deleteClase(id: number): Promise<any> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const clase: Clase = await this.claseRepository.findOne(criterio);
      if (!clase) throw new Error('No se elimina clase');
      else {
        await this.claseRepository.remove(clase);
        return { id: id, message: 'se elimino clase' };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Error al Eliminar' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
