import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CryptocurrencyService } from '../service/cryptocurrency.service';
import { CryptocurrencyPriceService } from '../service/cryptocurrencyPrice.service';
import { Cryptocurrency, CryptocurrencyPrice } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('/cryptocurrencies')
@ApiBearerAuth()
export class CryptocurrencyController {
  constructor(
    private readonly cryptocurrencyService: CryptocurrencyService,
    private readonly cryptocurrencyPriceService: CryptocurrencyPriceService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all cryptocurrency pair' })
  async getAllCryptocurrencies(): Promise<Partial<Cryptocurrency>[]> {
    try {
      return this.cryptocurrencyService.getAll();
    } catch (error) {
      throw new NotFoundException('Failed to retrieve cryptocurrencies.');
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get cryptocurrency by id between' })
  @ApiQuery({ name: 'end', required: false })
  @ApiQuery({ name: 'start', required: false })
  async getCryptocurrencyByIdBetween(
    @Param('id') id: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ): Promise<Partial<CryptocurrencyPrice>[]> {
    try {
      return this.cryptocurrencyPriceService.getPricesByIdBetween(
        id,
        start,
        end,
      );
    } catch (error) {
      throw new NotFoundException('Failed to retrieve cryptocurrency prices.');
    }
  }
}
