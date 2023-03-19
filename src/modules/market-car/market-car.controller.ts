import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BaseApiErrorResponse,
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from 'src/shared/dto/response.dto';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserInRequest } from '../user/dto/user-in-request.dto';
import { MarketCarService } from './market-car.service';
import { CreateMarketCarInputDto } from './dto/create-market-car-input.dto';
import { GetMarketCarListQuery } from './dto/get-car-on-market.query';
import { GetMarketCarOutputDto } from './dto/get-market-car-output.dto';
import { UpdateMarketCarInputDto } from './dto/update-market-car-input.dto';

@ApiTags('Market Car')
@Controller('market-cars')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MarketCarController {
  constructor(private readonly marketCarService: MarketCarService) {}

  @Post()
  @ApiOperation({
    summary: 'Create market car',
    description: 'Create market car',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
  })
  async createMarketCar(
    @Body() body: CreateMarketCarInputDto,
    @GetUser()
    user: UserInRequest,
  ): Promise<void> {
    await this.marketCarService.createMarketCar(user.id, body);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get market car',
    description: 'Get market car by id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(GetMarketCarOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async getMarketCar(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseApiResponse<GetMarketCarOutputDto>> {
    const data = await this.marketCarService.getMarketCar(id);
    return {
      data,
      meta: {},
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update market car',
    description: 'Update market car',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'No content',
  })
  async updateMarketCar(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMarketCarInputDto,
    @GetUser()
    user: UserInRequest,
  ): Promise<void> {
    await this.marketCarService.updateMarketCar(user.id, id, body);
  }

  @Get()
  @ApiOperation({
    summary: 'Get market car list',
    description: 'Get market car list',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([GetMarketCarOutputDto]),
  })
  async getMarketCarList(
    @Query() query: GetMarketCarListQuery,
  ): Promise<BaseApiResponse<GetMarketCarOutputDto[]>> {
    const { data, total } = await this.marketCarService.getMarketCarList(query);
    return {
      data,
      meta: {
        total,
      },
    };
  }
}
