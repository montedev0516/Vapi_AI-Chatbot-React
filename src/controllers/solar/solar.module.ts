import { Module } from '@nestjs/common';
import { SolarService } from './solar.service';
import { SolarController } from './solar.controller';
import { AppConfigModule } from 'src/config/app/app-config.module';

@Module({
  providers: [SolarService],
  imports: [AppConfigModule],
  controllers: [SolarController],
})
export class SolarModule {}
