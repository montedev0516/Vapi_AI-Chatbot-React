import { Controller, Post, Res, Body, HttpStatus } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { SolarService } from '../solar/solar.service';

import { ISolarWallet } from '../solar/type';
import { pricingData } from 'src/const/pricing';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly order: OrdersService,
    private readonly solar: SolarService,
  ) {}

  //   @Post()
  //   async createOrder(@Res() res, @Body() data: CreateOrder) {
  //     try {
  //       console.log(data);
  //       const result = await this.service.create(data);
  //       return res.status(HttpStatus.OK).json({
  //         message: ['Order created successfully'],
  //         result,
  //       });
  //     } catch (e) {
  //       return res.status(e.status).json(e.response);
  //     }
  //   }

  @Post('')
  async createOrder(@Body() body: CreateOrderDto, @Res() res) {
    try {
      console.log('');
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log('');

      let result;

      const solarWallet: ISolarWallet = this.solar.createWallet();
      const price: number = this.order.getPrice(body.period, body.plan);

      console.log('solarWallet', solarWallet);
      console.log('price', price);

      const data = {
        email: body.email,
        wallet: solarWallet.address,
        passphrase: solarWallet.passphrase,
        price: price,
        period: body.period,
        plan: body.plan,
        created_at: new Date(), // Set to current date and time
        expire_at: new Date(new Date().getTime() + 30 * 60000), // Add 30 minutes to created_at
        confirmed_at: null,
      };

      const dbResult = await this.order.create(data);

      console.log('dbResult', dbResult);

      //   const captcha = this.AuthService.getRandomCaptcha();
      //   if (!captcha) {
      //     result = {
      //       message: ['Captcha undefined!'],
      //       error: 'Internal Error',
      //       statusCode: 500,
      //     };
      //     console.log('ERROR!:500 @GET /auth/captcha', result);
      //     return res.status(500).json(result);
      //   }
      //   result = {
      //     message: ['Success'],
      //     result: captcha,
      //     statusCode: 200,
      //   };

      result = {
        message: ['success'],
        result: {
          data: data,
          dbResult: dbResult,
        },
        statusCode: 200,
      };

      console.log('SUCCESS!:200 @POST /orders', result);
      return res.status(200).json(result);
    } catch (err) {
      let result = {
        message: [err],
        error: 'Internal Error',
        statusCode: 500,
      };
      console.log('ERROR!:500 @POST /orders', result);
      return res.status(500).json(result);
    }
  }
}
