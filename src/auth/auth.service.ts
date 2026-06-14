import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterRequestDto } from './dto/requests/register.request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(data: RegisterRequestDto) {
    const { name, age, email, password } = data;

    const existUser = await this.prismaService.user.findUnique({
      where: {
        email
      }
    });

    if (existUser) {
      throw new ConflictException('The user with this email already exists');
    }

    const user = await this.prismaService.user.create({
      data: {
        name,
        age,
        email,
        password
      }
    });

    return user;
  }
}
