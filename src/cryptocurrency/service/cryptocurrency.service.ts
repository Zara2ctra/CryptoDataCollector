import { Injectable, NotFoundException } from '@nestjs/common';
import { Cryptocurrency, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CryptocurrencyService {
  constructor(private prisma: PrismaService) {}

  async findOrCreate(
    data: Prisma.CryptocurrencyCreateInput,
  ): Promise<{ id: number }> {
    try {
      return this.prisma.cryptocurrency.upsert({
        where: { name: data.name },
        update: { currentPrice: data.currentPrice },
        create: { name: data.name, currentPrice: data.currentPrice },
        select: { id: true },
      });
    } catch (error) {
      throw new NotFoundException('Failed to find or create cryptocurrency.');
    }
  }

  async getAll(): Promise<Partial<Cryptocurrency>[]> {
    try {
      return this.prisma.cryptocurrency.findMany({
        select: {
          id: true,
          name: true,
          currentPrice: true,
          updatedAt: true,
        },
        orderBy: { id: 'asc' },
      });
    } catch (error) {
      throw new NotFoundException('Failed to retrieve cryptocurrencies.');
    }
  }
}
