import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AppConfigService } from 'src/config/app/app-config.service';
import { convertToJson } from 'src/helper/json-helper';
import { URLSearchParams } from 'url';

@Injectable()
export class WhmcsService {
  constructor(private readonly appConfig: AppConfigService) {}

  async createUser(email: string, password: string): Promise<any> {
    const response = await axios.post(
      this.appConfig.bvpnWhmcsUrl,
      new URLSearchParams({
        action: 'AddClient',
        username: this.appConfig.bvpnWhmcsIdentifier,
        password: this.appConfig.bvpnWhmcsSecret,
        accesskey: this.appConfig.bvpnWhmcsAccessKey,
        firstname: '-',
        lastname: '-',
        email: email,
        address1: 'N/A',
        city: 'N/A',
        state: 'N/A',
        postcode: '0000',
        country: 'US',
        phonenumber: '-',
        password2: password,
        responsetype: 'json',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    console.log('WhmcsService.createUser', response.data);
    return response.data;
  }

  async getIdByEmail(email: string): Promise<number> {
    const response = await axios.post(
      this.appConfig.bvpnWhmcsUrl,
      new URLSearchParams({
        action: 'GetClients',
        username: this.appConfig.bvpnWhmcsIdentifier,
        password: this.appConfig.bvpnWhmcsSecret,
        accesskey: this.appConfig.bvpnWhmcsAccessKey,
        search: email,
        responsetype: 'json',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    console.log('WhmcsService.checkEmail', response.data);

    const clientList = response.data?.clients?.client ?? [];
    const id: number =
      clientList?.find((one) => one.email === email)?.id ?? null;

    return id;
  }

  async checkEmail(email: string): Promise<boolean> {
    const response = await axios.post(
      this.appConfig.bvpnWhmcsUrl,
      new URLSearchParams({
        action: 'GetClients',
        username: this.appConfig.bvpnWhmcsIdentifier,
        password: this.appConfig.bvpnWhmcsSecret,
        accesskey: this.appConfig.bvpnWhmcsAccessKey,
        search: email,
        responsetype: 'json',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    console.log('WhmcsService.checkEmail', response.data);

    const clientList = response.data?.clients?.client ?? [];
    const isExisting: boolean = clientList.some((one) => one.email === email);

    return isExisting;
  }

  async updatePassword(email: string, password: string): Promise<boolean> {
    const response = await axios.post(
      this.appConfig.bvpnWhmcsUrl,
      new URLSearchParams({
        action: 'UpdateClient',
        username: this.appConfig.bvpnWhmcsIdentifier,
        password: this.appConfig.bvpnWhmcsSecret,
        accesskey: this.appConfig.bvpnWhmcsAccessKey,
        clientemail: email,
        password2: password,
        responsetype: 'json',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    console.log('WhmcsService.updatePassword', response.data);

    if (response.data.result === 'success') return true;
    return false;
  }

  async validateLogin(email: string, password: string): Promise<boolean> {
    const response = await axios.post(
      this.appConfig.bvpnWhmcsUrl,
      new URLSearchParams({
        action: 'ValidateLogin',
        username: this.appConfig.bvpnWhmcsIdentifier,
        password: this.appConfig.bvpnWhmcsSecret,
        accesskey: this.appConfig.bvpnWhmcsAccessKey,
        email: email,
        password2: password,
        responsetype: 'json',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    console.log('WhmcsService.validateLogin', email, password, response.data);
    return true;
  }
}
