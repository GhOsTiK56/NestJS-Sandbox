import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { UserResponseDto } from './dto';
import type { User } from '../../../prisma/generated/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private mapToDto(user: User): UserResponseDto {
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true
    });
  }

  public async getProfile(userId: string): Promise<UserResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.mapToDto(user);
  }
}
