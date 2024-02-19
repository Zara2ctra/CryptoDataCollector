import { Injectable, NotFoundException } from '@nestjs/common';
import { CryptocurrencyPrice } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CryptocurrencyPriceService {
  constructor(private prisma: PrismaService) {}

  async createCryptocurrencyPrice(data: {
    cryptocurrencyId: number;
    price: number;
    timestamp: Date;
  }): Promise<CryptocurrencyPrice> {
    try {
      return this.prisma.cryptocurrencyPrice.create({ data });
    } catch (error) {
      throw new NotFoundException('Failed to create cryptocurrency price.');
    }
  }

  async getPricesByIdBetween(id: string, start?: string, end?: string) {
    try {
      return this.prisma.cryptocurrencyPrice.findMany({
        where: {
          cryptocurrencyId: Number(id),
          timestamp: {
            lte: new Date(end || new Date()),
            gte: new Date(start || new Date(0)),
          },
        },
        orderBy: { timestamp: 'asc' },
        select: {
          price: true,
          timestamp: true,
        },
      });
    } catch (error) {
      throw new NotFoundException('Failed to retrieve cryptocurrency prices.');
    }
  }
}
