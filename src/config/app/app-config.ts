import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT,
  liveBackendUrl: process.env.LIVE_BACKEND_URL,
  liveFrontendUrl: process.env.LIVE_FRONTEND_URL,
  solarApiUrl:
    process.env.NET_CONFIG === 'mainnet'
      ? process.env.SOLAR_API_URL
      : process.env.SOLAR_API_URL_TESTNET,
  netConfig: process.env.NET_CONFIG,
  bvpnWhmcsUrl: process.env.BVPN_WHMCS_URL,
  bvpnWhmcsIdentifier: process.env.BVPN_WHMCS_IDENTIFIER,
  bvpnWhmcsSecret: process.env.BVPN_WHMCS_SECRET,
  bvpnWhmcsAccessKey: process.env.BVPN_WHMCS_ACCESS_KEY,
  bvpnApiUrl: process.env.BVPN_API_URL,
  bvpnAuthUrl: process.env.BVPN_AUTH_URL,
  bvpnClientId: process.env.BVPN_CLIENT_ID,
  bvpnClientSecret: process.env.BVPN_CLIENT_SECRET,
  bvpnGrantType: process.env.BVPN_GRANT_TYPE,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  mailgunApiKey: process.env.MAILGUN_API_KEY,
  mailgunSenderEmail: process.env.MAILGUN_SENDER_EMAIL,
  mailgunDomain: process.env.MAILGUN_DOMAIN,
}));
