import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketCarRepository } from 'src/modules/market-car/market-car.repository';
import { UserRepository } from 'src/modules/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          keepConnectionAlive: true,
          host: configService.get<string>('database.host'),
          port: configService.get<number | undefined>('database.port'),
          database: configService.get<string>('database.name'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.pass'),
          charset: configService.get<string>('database.charset'),
          entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
          timezone: 'Z',
          synchronize: false,
          ssl: configService.get<string>('database.ssl') === 'true',
          logging: true,
        };
      },
    }),
    TypeOrmModule.forFeature([UserRepository, MarketCarRepository]),
  ],
  exports: [TypeOrmModule],
})
export class OrmModule {}
