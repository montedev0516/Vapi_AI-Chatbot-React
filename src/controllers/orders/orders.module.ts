import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersSchema } from 'src/models/orders.model';
import { SolarService } from '../solar/solar.service';
import { AppConfigModule } from 'src/config/app/app-config.module';

@Module({
  controllers: [OrdersController],
  imports: [
    MongooseModule.forFeature([{ name: 'Orders', schema: OrdersSchema }]),
    AppConfigModule,
  ],
  providers: [OrdersService, SolarService],
})
export class OrdersModule {}
