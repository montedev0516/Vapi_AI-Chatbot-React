import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/config/app/app-config.service';

import {
  Managers,
  Identities,
  Transactions,
  Crypto,
} from '@solar-network/crypto';

import { generateMnemonic } from 'bip39';
import { ISolarWallet } from './type';

@Injectable()
export class SolarService {
  constructor(private readonly appConfig: AppConfigService) {}

  private generateMnemonic(): string {
    const passphrase = generateMnemonic();
    return passphrase;
  }

  private getAddress(mnemonic: string): string {
    Managers.configManager.setFromPreset(
      this.appConfig.netConfig === 'mainnet' ? 'mainnet' : 'testnet',
    );
    return Identities.Address.fromPassphrase(mnemonic.normalize('NFD'));
  }

  private getPublicKey(mnemonic: string): string {
    Managers.configManager.setFromPreset(
      this.appConfig.netConfig === 'mainnet' ? 'mainnet' : 'testnet',
    );
    return Identities.PublicKey.fromPassphrase(mnemonic.normalize('NFD'));
  }

  createWallet(): ISolarWallet {
    const passphrase = this.generateMnemonic();
    const address = this.getAddress(passphrase);
    const result: ISolarWallet = {
      passphrase,
      address,
    };
    return result;
  }

  async getBalance(addr: string): Promise<number> {
    try {
      return (
        ((
          await (
            await fetch(`${this.appConfig.solarApiUrl}/wallets/${addr}`)
          ).json()
        ).data.balance as number) / 1e8
      );
    } catch {
      return 0;
    }
  }
}
