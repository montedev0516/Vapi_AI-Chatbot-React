import { Controller, Body, Res, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { WhmcsService } from '../whmcs/whmcs.service';
import { BvpnService } from '../bvpn/bvpn.service';
import { AppConfigService } from 'src/config/app/app-config.service';
import { SignUpEmailDto, SignUpSXPDto } from './dto/sign-up.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { LoginEmailDto } from './dto/log-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService,
    private readonly WhmcsService: WhmcsService,
    private readonly BvpnService: BvpnService,
    private readonly appConfig: AppConfigService,
  ) {}

  @Get('captcha')
  getCaptcha(@Res() res) {
    try {
      console.log('');
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log('');

      let result;
      const captcha = this.AuthService.getRandomCaptcha();
      if (!captcha) {
        result = {
          message: ['Captcha undefined!'],
          error: 'Internal Error',
          statusCode: 500,
        };
        console.log('ERROR!:500 @GET /auth/captcha', result);
        return res.status(500).json(result);
      }
      result = {
        message: ['Success'],
        result: captcha,
        statusCode: 200,
      };
      console.log('SUCCESS!:200 @GET /auth/captcha', result);
      return res.status(200).json(result);
    } catch (err) {
      let result = {
        message: [err],
        error: 'Internal Error',
        statusCode: 500,
      };
      console.log('ERROR!:500 @GET /auth/captcha', result);
      return res.status(500).json(result);
    }
  }

  @Post('sign-up-sxp')
  async signUpSXP(@Body() body: SignUpSXPDto, @Res() res) {
    try {
      console.log('');
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log('');

      let result;
      const publicKey = await this.AuthService.getPublicKey(body.wallet);
      if (!publicKey) {
        result = {
          message: ['Cannot sign up with a fresh wallet!'],
          error: 'Bad Request',
          statusCode: 400,
        };
        console.log('ERROR!:400 @POST /auth/sign-up-sxp', body, result);
        return res.status(400).json(result);
      }
      const isVerified = this.AuthService.verifyMessage(
        body.captcha,
        publicKey,
        body.signature,
      );

      if (!isVerified) {
        result = {
          message: ['Cannot verify the user!'],
          error: 'Bad Request',
          statusCode: 400,
        };
        console.log('ERROR!:400 @POST /auth/sign-up-sxp', body, result);
        return res.status(400).json(result);
      }

      result = {
        message: ['Success'],
        result: isVerified,
        statusCode: 200,
      };
      console.log('SUCCESS!:200 @POST /auth/sign-up-sxp', body, result);
      return res.status(200).json(result);
    } catch (err) {
      let result = {
        message: [err],
        error: 'Internal Error',
        statusCode: 500,
      };
      console.log('ERROR!:500 @GET /auth/sign-up-sxp', body, result);
      return res.status(500).json(result);
    }
  }

  @Post('sign-up-email')
  async signUpEmail(@Body() body: SignUpEmailDto, @Res() res) {
    try {
      console.log('');
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log('');

      let result;

      const WhmcsRes = await this.WhmcsService.createUser(
        body.email,
        body.password,
      );
      if (!WhmcsRes) {
        result = {
          message: ['WHMCS response undefined!'],
          error: 'Internal Error',
          statusCode: 500,
        };
        console.log('ERROR!:500 @POST /auth/sign-up-email', body, result);
        return res.status(500).json(result);
      }
      if (WhmcsRes.result === 'error') {
        result = {
          message: [WhmcsRes.message],
          error: 'Bad Request',
          statusCode: 400,
        };
        console.log('ERROR!:400 @POST /auth/sign-up-email', body, result);
        return res.status(400).json(result);
      }

      if (WhmcsRes.result === 'success' && WhmcsRes.clientid) {
        try {
          const BvpnRes = await this.BvpnService.createUser(
            body.email,
            body.password,
            WhmcsRes.clientid,
          );
          result = {
            message: ['Success'],
            result: true,
            statusCode: 200,
          };
          console.log('SUCCESS!:200 @POST /auth/sign-up-email', body, result);
          return res.status(200).json(result);
        } catch (err) {
          let result = {
            message: [err?.response?.data?.header?.message ?? err],
            error: 'Internal Error',
            statusCode: 500,
          };
          console.log(
            'ERROR!:500 @POST /auth/sign-up-email',
            body,
            result,
            err,
          );
          return res.status(500).json(result);
        }
      }

      result = {
        message: ['Unknown Error!'],
        error: 'Internal Error',
        statusCode: 500,
      };
      console.log('ERROR!:500 @POST /auth/sign-up-email', body, result);
      return res.status(500).json(result);
    } catch (err) {
      let result = {
        message: [err],
        error: 'Internal Error',
        statusCode: 500,
      };
      console.log('ERROR!:500 @POST /auth/sign-up-email', body, result);
      return res.status(500).json(result);
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto, @Res() res) {
    try {
      console.log('');
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log('');

      let result;

      const WhmcsRes = await this.WhmcsService.checkEmail(body.email);

      if (!WhmcsRes) {
        result = {
          message: ['The email does not exist!'],
          error: 'Bad Request',
          statusCode: 400,
        };
        console.log('ERROR!:400 @POST /auth/forgot-password', body, result);
        return res.status(400).json(result);
      }

      const magicLink = await this.AuthService.sendResetEmail(body.email);

      result = {
        message: ['Success'],
        result: true,
        statusCode: 200,
      };
      console.log('SUCCESS!:200 @POST /auth/forgot-password', body, result);
      return res.status(200).json(result);
    } catch (err) {
      let result = {
        message: [err.toString()],
        error: 'Internal Error',
        statusCode: 500,
      };
      console.log('ERROR!:500 @POST /auth/forgot-password', body, result, err);
      return res.status(500).json(result);
    }
  }

  @Get('reset-password')
  async handleResetPassword(@Query('token') token: string, @Res() res) {
    try {
      console.log('');
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log('');

      let result;

      const email = await this.AuthService.validateResetToken(token);

      if (!email) {
        result = {
          message: ['Reset link is not valid!'],
          error: 'Bad Request',
          statusCode: 400,
        };
        console.log('ERROR!:400 @Get /auth/reset-password', token, result);
        return res.status(400).json(result);
      }

      result = {
        message: ['Success'],
        result: email,
        statusCode: 200,
      };
      console.log('SUCCESS!:200 @Get /auth/reset-password', token, result);
      return res.status(200).json(result);
    } catch (err) {
      let result = {
        message: [err.toString()],
        error: 'Internal Error',
        statusCode: 500,
      };
      console.log('ERROR!:500 @GET /auth/reset-password', token, result, err);
      return res.status(500).json(result);
    }
  }

  @Post('update-password')
  async updatePassword(@Body() body: UpdatePasswordDto, @Res() res) {
    try {
      console.log('');
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log('');

      let result;

      // const response = await this.WhmcsService.updatePassword(
      //   body.email,
      //   body.password,
      // );

      // if (!response) {
      //   result = {
      //     message: ['Updating password failed!'],
      //     error: 'Bad Request',
      //     statusCode: 400,
      //   };
      //   console.log('ERROR!:400 @POST /auth/update-password', result);
      //   return res.status(400).json(result);
      // }

      const billingId = await this.WhmcsService.getIdByEmail(body.email);
      if (!billingId) {
        result = {
          message: ['Updating password failed!'],
          error: 'Bad Request',
          statusCode: 400,
        };
        console.log('ERROR!:400 @POST /auth/update-password', result);
        return res.status(400).json(result);
      }

      const response = await this.BvpnService.updatePassword(
        body.password,
        billingId,
      );
      if (!response) {
        result = {
          message: ['Updating password failed!'],
          error: 'Bad Request',
          statusCode: 400,
        };
        console.log('ERROR!:400 @POST /auth/update-password', result);
        return res.status(400).json(result);
      }

      result = {
        message: ['Success'],
        result: true,
        statusCode: 200,
      };
      console.log('SUCCESS!:200 @POST /auth/update-password', result);
      return res.status(200).json(result);
    } catch (err) {
      let result = {
        message: [err.toString()],
        error: 'Internal Error',
        statusCode: 500,
      };
      console.log('ERROR!:500 @POST /auth/update-password', result, err);
      return res.status(500).json(result);
    }
  }

  @Post('login-email')
  async login(@Body() body: LoginEmailDto, @Res() res) {
    try {
      console.log('');
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log('');

      let result;

      // const response = await this.WhmcsService.validateLogin(
      //   body.email,
      //   body.password,
      // );

      // if (!response) {
      //   result = {
      //     message: ['Wrong email or password!'],
      //     error: 'Bad Request',
      //     statusCode: 400,
      //   };
      //   console.log('ERROR!:400 @POST /auth/login-email', result);
      //   return res.status(400).json(result);
      // }

      result = {
        message: ['Success'],
        result: true,
        statusCode: 200,
      };
      console.log('SUCCESS!:200 @POST /auth/login-email', result);
      return res.status(200).json(result);
    } catch (err) {
      let result = {
        message: [err.toString()],
        error: 'Internal Error',
        statusCode: 500,
      };
      console.log('ERROR!:500 @POST /auth/login-email', result, err);
      return res.status(500).json(result);
    }
  }
}
