import { Module } from '@nestjs/common';
import { WhmcsController } from './whmcs.controller';
import { AppConfigModule } from 'src/config/app/app-config.module';
import { WhmcsService } from './whmcs.service';

@Module({
  controllers: [WhmcsController],
  imports: [AppConfigModule],
  providers: [WhmcsService],
})
export class WhmcsModule {}
