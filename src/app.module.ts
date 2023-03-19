import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MarketCarModule } from './modules/market-car/market-car.module';

@Module({
  imports: [AuthModule, MarketCarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
