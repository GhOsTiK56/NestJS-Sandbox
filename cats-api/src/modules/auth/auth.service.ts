import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { RegisterRequestDto } from './dto/requests/register.request.dto';
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from './interfaces/jwt.interface';
import ms, { StringValue } from 'ms';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { LoginRequestDto } from './dto/requests/login.request.dto';
import { nanoid } from 'nanoid';
import { createHash } from 'crypto';
import { Prisma } from '../../../prisma/generated/client';
import { TokensResponseDto } from './dto';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: StringValue;
  private readonly JWT_REFRESH_TOKEN_TOKEN_TTL: StringValue;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_ACCESS_TOKEN_TTL'
    );
    this.JWT_REFRESH_TOKEN_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_REFRESH_TOKEN_TOKEN_TTL'
    );
  }

  async register(data: RegisterRequestDto) {
    const { name, age, email, password } = data;

    try {
      const user = await this.prismaService.user.create({
        data: {
          name,
          age,
          email,
          password: await hash(password)
        }
      });

      return this.generateTokens(user.id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'The user with this email already exists'
          );
        }
      }
      throw error;
    }
  }

  public async login(data: LoginRequestDto) {
    const { email, password } = data;

    const user = await this.prismaService.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        password: true
      }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prismaService.refreshToken.updateMany({
      where: {
        userId: user.id
      },
      data: {
        revoked: true
      }
    });

    return this.generateTokens(user.id);
  }

  public async refresh(refreshToken: string): Promise<TokensResponseDto> {
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify<JwtPayload>(refreshToken);

      if (!payload?.id || !payload?.jti) {
        throw new UnauthorizedException('Invalid refresh token');
      }
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const storedToken = await this.prismaService.refreshToken.findUnique({
      where: {
        jti: payload.jti
      }
    });

    if (!storedToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    if (storedToken.revoked) {
      await this.prismaService.refreshToken.updateMany({
        where: {
          userId: storedToken.userId
        },
        data: {
          revoked: true
        }
      });
      throw new UnauthorizedException(
        'Compromised token detected. All sessions revoked.'
      );
    }

    if (storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const incomintHash = createHash('sha256')
      .update(refreshToken)
      .digest('hex');
    if (storedToken.tokenHash !== incomintHash) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.prismaService.refreshToken.update({
      where: {
        id: storedToken.id
      },
      data: {
        revoked: true
      }
    });

    return this.generateTokens(payload.id);
  }

  public async logout(userId: string) {
    if (!userId) {
      throw new UnauthorizedException('User ID is required for logout');
    }

    await this.prismaService.refreshToken.updateMany({
      where: {
        userId,
        revoked: false
      },
      data: {
        revoked: true
      }
    });

    return { message: 'ok' };
  }

  public validateUserPayload(userId: string) {
    return { id: userId };
  }

  private async generateTokens(userId: string): Promise<TokensResponseDto> {
    const jti = nanoid();

    const payload: JwtPayload = { id: userId, jti };

    const accessToken = this.jwtService.sign(
      { id: userId },
      {
        expiresIn: this.JWT_ACCESS_TOKEN_TTL
      }
    );

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TOKEN_TTL
    });

    await this.saveRefreshToken(userId, refreshToken, jti);

    return {
      accessToken,
      refreshToken
    };
  }

  private async saveRefreshToken(userId: string, token: string, jti: string) {
    const tokenHash = createHash('sha256').update(token).digest('hex');

    await this.prismaService.refreshToken.create({
      data: {
        userId,
        jti,
        tokenHash,
        expiresAt: new Date(Date.now() + ms(this.JWT_REFRESH_TOKEN_TOKEN_TTL))
      }
    });
  }
}
