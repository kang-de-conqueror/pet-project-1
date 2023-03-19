import { Expose, Type } from 'class-transformer';

class OwnerOutputDto {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  @Type(() => String)
  email: string;

  @Expose()
  @Type(() => String)
  avatar: string;
}

export class GetMarketCarOutputDto {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Type(() => OwnerOutputDto)
  owner: OwnerOutputDto;

  @Expose()
  brand: string;

  @Expose()
  model: string;

  @Expose()
  color: string;

  @Expose()
  @Type(() => Number)
  year: number;

  @Expose()
  @Type(() => Number)
  price: number;

  @Expose()
  @Type(() => Date)
  availableFrom: Date;

  @Expose()
  @Type(() => Date)
  availableTo: Date;
}
