import { Module } from '@nestjs/common';
import { BvpnController } from './bvpn.controller';
import { BvpnService } from './bvpn.service';
import { AppConfigModule } from 'src/config/app/app-config.module';

@Module({
  controllers: [BvpnController],
  imports: [AppConfigModule],
  providers: [BvpnService],
})
export class BvpnModule {}
