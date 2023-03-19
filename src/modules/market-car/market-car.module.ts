import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { MarketCarController } from './market-car.controller';
import { MarketCarService } from './market-car.service';

@Module({
  imports: [SharedModule],
  providers: [MarketCarService],
  controllers: [MarketCarController],
})
export class MarketCarModule {}
