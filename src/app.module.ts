import { Module } from '@nestjs/common';
import { CiudadModule } from './ciudad/ciudad.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorModule } from './profesor/profesor.module';
import { EscuelaModule } from './escuela/escuela.module';
import { ClasesModule } from './clases/clases.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Tdf19955',
      database: 'db_colegio',
      entities: [__dirname + '/**/**/**.entity{.ts,.js}'],
      synchronize: true, //modo desarrollador.
    }),
    CiudadModule,
    ProfesorModule,
    EscuelaModule,
    ClasesModule,
    EstudiantesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
