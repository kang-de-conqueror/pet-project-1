import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateMarketCarInputDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  rentalDueDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  availableFrom: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  availableTo: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  price: number;
}
