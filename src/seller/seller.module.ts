import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerSchema } from './seller.schema';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
    AuthModule
  ],
  controllers: [SellerController],
  providers: [SellerService]
})
export class SellerModule { }
