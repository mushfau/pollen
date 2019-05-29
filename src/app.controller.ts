import { Controller, Get, Render, Res, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './auth/jwt-auth.quard';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  root(@Req() req: Request, @Res() res: Response) {
    if (req.cookies && req.cookies.jwt) {
      res.render('index', { auth: true })
    } else {
      res.render('index', { auth: false })
    }

  }
}
