import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {
        
     }

    async createToken(user) {
        const accessToken = await this.jwtService.sign({ email: user.email });

        return accessToken;
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return {};
    }
}