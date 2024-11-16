import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AppConfigService } from 'src/config/app/app-config.service';
import { getCurrentDateDDMMYYYY } from 'src/helper/date-helper';

@Injectable()
export class BvpnService {
  constructor(private readonly appConfig: AppConfigService) {}

  async updatePassword(password: string, billingId: number): Promise<any> {
    const accessResponse = await this.getAccessToken();
    const accessToken = accessResponse?.access_token;

    const response = await axios.put(
      `${this.appConfig.bvpnApiUrl}/user/${billingId}`,
      {
        password: password,
        client_type: 'unpaid',
        status: 'in-active',
        billing_id: `${billingId}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(
      'BvpnService.updatePassword',
      password,
      billingId,
      response.data,
    );
    return response.data;
  }

  async createUser(
    email: string,
    password: string,
    billingId: number,
  ): Promise<any> {
    const accessResponse = await this.getAccessToken();
    const accessToken = accessResponse?.access_token;

    const response = await axios.post(
      `${this.appConfig.bvpnApiUrl}/user`,
      {
        email: email,
        password: password,
        signup_date: getCurrentDateDDMMYYYY(),
        client_type: 'unpaid',
        status: 'in-active',
        billing_id: `${billingId}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(
      'BvpnService.createUser',
      email,
      password,
      billingId,
      response.data,
    );
    return response.data;
  }

  async getAccessToken() {
    const response = await axios.post(
      this.appConfig.bvpnAuthUrl,
      new URLSearchParams({
        client_id: this.appConfig.bvpnClientId,
        client_secret: this.appConfig.bvpnClientSecret,
        grant_type: this.appConfig.bvpnGrantType,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    console.log('BvpnService.getAccessToken', response.data);
    return response.data;
  }
}
