import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { AsistenciaDto } from './dto/asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
  ) {}

  async createAttendance(asistenciaDto: AsistenciaDto): Promise<Asistencia> {
    const asistencia = this.asistenciaRepository.create(asistenciaDto);
    return await this.asistenciaRepository.save(asistencia);
  }

  async findAllAttendance(): Promise<Asistencia[]> {
    return await this.asistenciaRepository.find();
  }

  async findOneAttendance(id: number): Promise<Asistencia> {
    const criterio: FindOneOptions = { where: { id: id } };
    const asistencia = await this.asistenciaRepository.findOne(criterio);
    if (!asistencia) {
      throw new NotFoundException(`Asistencia con ID ${id} no encontrada`);
    }
    return asistencia;
  }

  async updateAttendance(
    id: number,
    asistenciaDto: AsistenciaDto,
  ): Promise<Asistencia> {
    const criterio: FindOneOptions = { where: { id: id } };
    const existingAsistencia = await this.asistenciaRepository.findOne(
      criterio,
    );
    const updatedAsistencia = Object.assign(existingAsistencia, asistenciaDto);
    return await this.asistenciaRepository.save(updatedAsistencia);
  }

  async deleteAttendance(id: number): Promise<void> {
    const criterio: FindOneOptions = { where: { id: id } };
    const asistencia = await this.asistenciaRepository.findOne(criterio);
    await this.asistenciaRepository.remove(asistencia);
  }
}
