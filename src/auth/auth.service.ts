import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    hashData(data: string) {
        return bcrypt.hash(data, 10)
    }

    async getToekn(userId: number, email: string) {
        const accessToken = await this.jwtService.signAsync({
            sub: userId,
            email,
        },
            {
                expiresIn: 60 * 15,
            },
        )
    }

    async signupLocal(dto: AuthDto): Promise<Tokens> {
        const hash = await this.hashData(dto.password)
        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            }
        })
    }
    signinLocal() { }
    logout() { }
    refreshToken() { }
}