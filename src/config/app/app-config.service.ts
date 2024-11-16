import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}
  get port(): string {
    return this.configService.get('app.port');
  }
  get liveBackendUrl(): string {
    return this.configService.get('app.liveBackendUrl');
  }
  get liveFrontendUrl(): string {
    return this.configService.get('app.liveFrontendUrl');
  }
  get solarApiUrl(): string {
    return this.configService.get('app.solarApiUrl');
  }
  get netConfig(): string {
    return this.configService.get('app.netConfig');
  }
  get bvpnWhmcsUrl(): string {
    return this.configService.get('app.bvpnWhmcsUrl');
  }
  get bvpnWhmcsIdentifier(): string {
    return this.configService.get('app.bvpnWhmcsIdentifier');
  }
  get bvpnWhmcsSecret(): string {
    return this.configService.get('app.bvpnWhmcsSecret');
  }
  get bvpnWhmcsAccessKey(): string {
    return this.configService.get('app.bvpnWhmcsAccessKey');
  }
  get bvpnApiUrl(): string {
    return this.configService.get('app.bvpnApiUrl');
  }
  get bvpnAuthUrl(): string {
    return this.configService.get('app.bvpnAuthUrl');
  }
  get bvpnClientId(): string {
    return this.configService.get('app.bvpnClientId');
  }
  get bvpnClientSecret(): string {
    return this.configService.get('app.bvpnClientSecret');
  }
  get bvpnGrantType(): string {
    return this.configService.get('app.bvpnGrantType');
  }
  get jwtSecret(): string {
    return this.configService.get('app.jwtSecret');
  }
  get jwtExpiresIn(): string {
    return this.configService.get('app.jwtExpiresIn');
  }
  get mailgunApiKey(): string {
    return this.configService.get('app.mailgunApiKey');
  }
  get mailgunSenderEmail(): string {
    return this.configService.get('app.mailgunSenderEmail');
  }
  get mailgunDomain(): string {
    return this.configService.get('app.mailgunDomain');
  }
}
