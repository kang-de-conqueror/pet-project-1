import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { configModuleOptions } from './config/config-options';
import { AllExceptionsFilter } from './filters/all-exception-filter';
import { OrmModule } from './orm/orm.module';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), OrmModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [OrmModule, ConfigModule],
})
export class SharedModule {}
