import { Injectable } from '@nestjs/common';
import {
  Managers,
  Identities,
  Transactions,
  Crypto,
} from '@solar-network/crypto';
import * as jwt from 'jsonwebtoken';
import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { AppConfigService } from 'src/config/app/app-config.service';

@Injectable()
export class AuthService {
  constructor(private readonly appConfig: AppConfigService) {}

  getRandomCaptcha(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  validateAddress(address: string): boolean {
    Managers.configManager.setFromPreset(
      this.appConfig.netConfig === 'mainnet' ? 'mainnet' : 'testnet',
    );
    return Identities.Address.validate(address);
  }

  signMessage = (message: string, mnemonic: string) => {
    return Crypto.Message.sign(message, mnemonic.normalize('NFD')).signature;
  };

  verifyMessage = (message: string, publicKey: string, signature: string) => {
    return Crypto.Message.verify({ message, publicKey, signature });
  };

  async getPublicKey(wallet: string): Promise<string> {
    const walletDataRes = await fetch(
      `${this.appConfig.solarApiUrl}/wallets/${wallet}`,
    );
    const walletDataJson = await walletDataRes.json();
    const publicKey = walletDataJson?.data?.publicKey;
    return publicKey;
  }

  generateResetToken(email: string) {
    const payload = { email };
    console.log(this.appConfig.jwtSecret, this.appConfig.jwtExpiresIn, jwt);
    const token = jwt.sign(payload, this.appConfig.jwtSecret, {
      expiresIn: this.appConfig.jwtExpiresIn,
    });
    return token;
  }

  async sendResetEmail(email: string): Promise<string> {
    const token = this.generateResetToken(email);
    const magicLink = `${this.appConfig.liveFrontendUrl}/reset-password/${token}`;

    console.log(
      this.appConfig.mailgunApiKey,
      this.appConfig.mailgunDomain,
      this.appConfig.mailgunSenderEmail,
    );

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: 'api',
      key: this.appConfig.mailgunApiKey,
      url: 'https://api.eu.mailgun.net',
    });

    const mailgunData = {
      from: this.appConfig.mailgunSenderEmail,
      to: email,
      subject: 'Password Reset',
      html: `
        <p>You requested a password reset. Click the following link to reset your password:</p>
        <a href="${magicLink}">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    };

    await mg.messages.create(this.appConfig.mailgunDomain, mailgunData);
    return magicLink;
  }

  async validateResetToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, this.appConfig.jwtSecret);
      console.log('AuthService.validateResetToken', token, decoded);
      return (decoded as { email: string }).email;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.error('AuthService.validateResetToken', 'Token expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        console.error('AuthService.validateResetToken', 'Invalid token');
      } else {
        console.error(
          'AuthService.validateResetToken',
          'Token verification error:',
          error,
        );
      }
      return '';
    }
  }
}
