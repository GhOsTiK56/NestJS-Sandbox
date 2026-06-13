import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateCatRequest, UpdateCatRequest } from './dto';
import type { Cat } from 'prisma/generated/client';

@Injectable()
export class CatsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: CreateCatRequest): Promise<Cat> {
    const cat = await this.prismaService.cat.create({
      data
    });

    return cat;
  }

  public async findAll(): Promise<Cat[]> {
    return await this.prismaService.cat.findMany();
  }

  public async findWithId(id: number): Promise<Cat[]> {
    return await this.prismaService.cat.findMany({
      where: {
        id
      }
    });
  }

  public async findAllWhere(age?: number, breed?: string): Promise<Cat[]> {
    return await this.prismaService.cat.findMany({
      where: {
        age,
        breed
      }
    });
  }

  public async update(id: number, data: UpdateCatRequest): Promise<Cat> {
    return await this.prismaService.cat.update({
      where: {
        id
      },
      data: {
        ...data
      }
    });
  }

  public async remove(id: number): Promise<Cat> {
    return await this.prismaService.cat.delete({
      where: {
        id
      }
    });
  }

  public async removeAll() {
    return await this.prismaService.cat.deleteMany({});
  }
}
