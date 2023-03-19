import { NotFoundException } from '@nestjs/common';
import { DbListQueryImp } from 'src/shared/builders/implementations/db-list-query.imp';
import { EntityRepository, Repository } from 'typeorm';
import { GetMarketCarListQuery } from './dto/get-car-on-market.query';
import { MarketCar } from './market-car.entity';

@EntityRepository(MarketCar)
export class MarketCarRepository extends Repository<MarketCar> {
  async findMarketCarList(query: GetMarketCarListQuery): Promise<{
    data: Partial<MarketCar>[];
    total: number;
  }> {
    const {
      availableFrom,
      availableTo,
      brand,
      color,
      limit,
      maxPrice,
      minPrice,
      model,
      offset,
      year,
    } = query;

    const queryBuilder = this.createQueryBuilder('mc');
    const getMarketCarsQuery = new DbListQueryImp<MarketCar>()
      .init(queryBuilder, 'mc')
      .chainFullTextSerchQuery({
        parameterName: 'brand',
        parameterValue: brand,
        shouldIncludeQuery: brand?.trim()?.length > 0,
      })
      .chainFullTextSerchQuery({
        parameterName: 'model',
        parameterValue: model,
        shouldIncludeQuery: model?.trim()?.length > 0,
      })
      .chainFullTextSerchQuery({
        parameterName: 'color',
        parameterValue: color,
        shouldIncludeQuery: color?.trim()?.length > 0,
      })
      .chainQuery('mc.year', { year }, !!year)
      .chainQuery('mc.price >= :minPrice', { minPrice }, !!minPrice)
      .chainQuery('mc.price <= :maxPrice', { maxPrice }, !!maxPrice)
      .chainQuery(
        '(mc.rentalDueDate is null or mc.rentalDueDate < :availableFrom)',
        {
          availableFrom,
        },
        !!availableFrom,
      )
      .chainQuery(
        `(mc.availableFrom is null or (mc.availableFrom <= :availableFrom and mc.availableTo >= :availableFrom))`,
        {
          availableFrom,
        },
        !!availableFrom,
      )
      .chainQuery(
        `(mc.availableTo is null or (mc.availableFrom <= :availableTo and mc.availableTo >= :availableTo))`,
        {
          availableTo,
        },
        !!availableTo,
      )
      .build();

    try {
      const [data, total] = await Promise.all([
        getMarketCarsQuery.limit(limit).offset(offset).getMany(),
        getMarketCarsQuery.getCount(),
      ]);

      return { data, total };
    } catch (error) {
      return {
        data: [],
        total: 0,
      };
    }
  }

  async findMarketCarById(id: number): Promise<MarketCar> {
    const carOnMarket = await this.findOne(id);
    if (!carOnMarket) {
      throw new NotFoundException(`Car on market with id ${id} not found`);
    }

    return carOnMarket;
  }
}
