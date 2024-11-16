import * as Joi from 'joi';

export const appConfigValidationSchema = Joi.object({
  PORT: Joi.string().required(),
  LIVE_BACKEND_URL: Joi.string().required(),
  LIVE_FRONTEND_URL: Joi.string().required(),
  SOLAR_API_URL: Joi.string().required(),
  NET_CONFIG: Joi.string().required(),
  BVPN_WHMCS_URL: Joi.string().required(),
  BVPN_WHMCS_IDENTIFIER: Joi.string().required(),
  BVPN_WHMCS_SECRET: Joi.string().required(),
  BVPN_WHMCS_ACCESS_KEY: Joi.string().required(),
  BVPN_API_URL: Joi.string().required(),
  BVPN_AUTH_URL: Joi.string().required(),
  BVPN_CLIENT_ID: Joi.string().required(),
  BVPN_CLIENT_SECRET: Joi.string().required(),
  BVPN_GRANT_TYPE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  MAILGUN_API_KEY: Joi.string().required(),
  MAILGUN_SENDER_EMAIL: Joi.string().required(),
  MAILGUN_DOMAIN: Joi.string().required(),
});
