import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserRepository } from '../user/user.repository';
import { CreateMarketCarInputDto } from './dto/create-market-car-input.dto';
import { GetMarketCarListQuery } from './dto/get-car-on-market.query';
import { GetMarketCarOutputDto } from './dto/get-market-car-output.dto';
import { UpdateMarketCarInputDto } from './dto/update-market-car-input.dto';
import { MarketCar } from './market-car.entity';
import { MarketCarRepository } from './market-car.repository';

@Injectable()
export class MarketCarService {
  constructor(
    private readonly carOnMarketRepository: MarketCarRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createMarketCar(
    userId: number,
    input: CreateMarketCarInputDto,
  ): Promise<void> {
    try {
      await this.carOnMarketRepository.insert(
        plainToInstance(MarketCar, {
          ...input,
          ownerId: userId,
        }),
      );
    } catch (error) {
      console.error('error', error);
    }
  }

  async getMarketCarList(query: GetMarketCarListQuery): Promise<{
    data: GetMarketCarOutputDto[];
    total: number;
  }> {
    const { availableFrom, availableTo } = query;
    this.validateValidateFromTo(availableFrom, availableTo);

    const { data, total } = await this.carOnMarketRepository.findMarketCarList(
      query,
    );
    const ownerUserIds = [
      ...new Set(data.map((car) => car.ownerId).filter(Boolean)),
    ];
    const users = await this.userRepository.findByIds(ownerUserIds);
    const usersMap = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    return {
      data: plainToInstance(
        GetMarketCarOutputDto,
        data.map((item) => ({
          ...item,
          owner: usersMap[item.ownerId],
        })),
        {
          excludeExtraneousValues: true,
        },
      ),
      total,
    };
  }

  async getMarketCar(id: number): Promise<GetMarketCarOutputDto> {
    const carOnMarket = await this.carOnMarketRepository.findMarketCarById(id);
    const owner = await this.userRepository.findOne(carOnMarket.ownerId);

    return plainToInstance(
      GetMarketCarOutputDto,
      { ...carOnMarket, owner },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async updateMarketCar(
    userId: number,
    id: number,
    body: UpdateMarketCarInputDto,
  ): Promise<void> {
    const carOnMarket = await this.carOnMarketRepository.findMarketCarById(id);

    const { availableFrom, availableTo, price } = body;

    if (availableFrom || availableTo || price) {
      this.validateValidateFromTo(availableFrom, availableTo);

      if (carOnMarket.ownerId !== userId) {
        throw new BadRequestException(`You can't update this car`);
      }
    }

    // TODO: Check for user cash and car price in case of rental car request
    Object.entries(body).forEach(([key, value]) => {
      if (value) {
        carOnMarket[key] = value;
      }
    });

    await this.carOnMarketRepository.save(carOnMarket);
  }

  private validateValidateFromTo(availableFrom: Date, availableTo: Date) {
    if (availableFrom && availableTo && availableFrom > availableTo) {
      throw new BadRequestException(
        `availableFrom must be less than availableTo`,
      );
    }
  }
}
