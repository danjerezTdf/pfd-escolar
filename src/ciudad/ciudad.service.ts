import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CiudadDTO } from './dto/ciudad.dto';

@Injectable()
export class CiudadService {
  private ciudades: Ciudad[] = [];

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  async findAllRaw(): Promise<Ciudad[]> {
    try {
      this.ciudades = [];
      const datos = await this.ciudadRepository.query('select * from ciudad');
      datos.forEach((element) => {
        const ciudad: Ciudad = new Ciudad(element['nombre']);
        this.ciudades.push(ciudad); // No necesitas usar { ciudad }
      });
      return this.ciudades; // Agrega esta línea para devolver la lista de ciudades
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Error en Ciudad -' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async findAllOrm(): Promise<Ciudad[]> {
    return await this.ciudadRepository.find();
  }

  async findById(id: number): Promise<Ciudad> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
      if (ciudad) return ciudad;
      else throw new Error('Nose encontro la Ciudad');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Error en Ciudad -' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async create(ciudadDTO: CiudadDTO): Promise<CiudadDTO> {
    try {
      const ciudad = await this.ciudadRepository.save(
        new Ciudad(ciudadDTO.nombre),
      );
      if (ciudad) return ciudadDTO;
      else throw new Error('Nose creo la Ciudad');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Error en Ciudad -' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateCity(ciudadDTO: CiudadDTO, id: number): Promise<string> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);

      if (!ciudad) throw Error('no se encontro la ciudad');
      else {
        const ciudadVieja = ciudad.getNombre();
        ciudad.setNombre(ciudadDTO.nombre);
        ciudad = await this.ciudadRepository.save(ciudad);
        return `OK ${ciudadVieja} ---> ${ciudadDTO.nombre}`;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en ciudad - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteCityById(id: number): Promise<any> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
      if (!ciudad) throw new Error('no se elimina ciudad ');
      else {
        await this.ciudadRepository.remove(ciudad);
        return { id: id, message: 'se elimino exitosamente' };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en ciudad - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
