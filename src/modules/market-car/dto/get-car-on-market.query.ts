import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PaginationParamsDto } from 'src/shared/dto/pagination.dto';

export class GetMarketCarListQuery extends PaginationParamsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brand: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  model: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  color: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  year: number;

  @ApiPropertyOptional({
    type: Date,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  availableFrom: Date;

  @ApiPropertyOptional({
    type: Date,
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  availableTo: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice: number;
}
