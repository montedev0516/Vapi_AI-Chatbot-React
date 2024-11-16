import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppConfigModule } from 'src/config/app/app-config.module';
import { WhmcsModule } from '../whmcs/whmcs.module';
import { WhmcsService } from '../whmcs/whmcs.service';
import { BvpnService } from '../bvpn/bvpn.service';

@Module({
  controllers: [AuthController],
  imports: [AppConfigModule],
  providers: [AuthService, WhmcsService, BvpnService],
})
export class AuthModule {}
