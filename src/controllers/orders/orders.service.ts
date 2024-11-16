import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from 'src/core/base.service';

import { Orders } from 'src/models/orders.model';

import { pricingData } from 'src/const/pricing';

@Injectable()
export class OrdersService extends BaseService<Orders> {
  constructor(
    @InjectModel('Orders') private readonly ordersModel: Model<Orders>,
  ) {
    super(ordersModel);
  }

  getPrice(period: number, plan: number) {
    try {
      const price =
        (pricingData[period]?.data[plan]?.price ?? 0) *
        (pricingData[period]?.months ?? 0) *
        (1 - (pricingData[period].data[plan].discount ?? 0));
      return price;
    } catch (err) {
      return -1;
    }
  }
}
