import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AsistenciaDto } from './dto/asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { EstudianteClase } from 'src/estudiantes/entities/estudiante_clase.entity'; // import { EstudianteClase } from 'src/estudianteentities/estudiante_clase.entity';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(EstudianteClase)
    private readonly estudianteClaseRepository: Repository<EstudianteClase>,
  ) {}

  async findAllAttendance(): Promise<AsistenciaDto[]> {
    return await this.asistenciaRepository.find();
  }

  async findOneAttendance(id: number): Promise<AsistenciaDto> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const asistencia: AsistenciaDto = await this.asistenciaRepository.findOne(
        criterio,
      );
      if (asistencia) return asistencia;
      else throw new Error('No se encuentra el asistenacia');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Error en asistenacia - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createAttendance(AsistenciaDto: AsistenciaDto) {
    const { estudianteId, claseId } = AsistenciaDto;
    const asistencia_estudiante = await this.estudianteClaseRepository.findOne({
      where: { estudianteId: estudianteId, claseId: claseId },
    });
    if (!asistencia_estudiante) return 'no existe estudiante/clase';
    return await this.asistenciaRepository.save(
      new Asistencia(claseId, estudianteId),
    );
  }

  async updateAttendance(id: number, AsistenciaDto: AsistenciaDto) {
    return `This action updates a #${id} asistencia`;
  }

  async deleteAttendance(id: number) {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const asistencia: Asistencia = await this.asistenciaRepository.findOne(
        criterio,
      );
      if (!asistencia) throw new Error('no se pudo eliminar la asistencia ');
      else {
        await this.asistenciaRepository.remove(asistencia);
        return { id: id, message: 'se elimino exitosamente' };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en asistencia - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
