import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';

import { SolarModule } from './controllers/solar/solar.module';
import { OrdersModule } from './controllers/orders/orders.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.NET_CONFIG === 'mainnet'
        ? 'mongodb://localhost/bvpn'
        : 'mongodb://localhost/bvpn-testnet',
    ),
    AuthModule,
    SolarModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
