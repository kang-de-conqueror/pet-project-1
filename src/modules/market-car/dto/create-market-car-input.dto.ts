import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateMarketCarInputDto {
  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
  brand: string;

  @ApiProperty({
    type: Number,
  })
  @IsPositive()
  year: string;

  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  availableFrom: Date;

  @ApiPropertyOptional()
  @Type(() => Date)
  @IsDate()
  availableTo: Date;
}
