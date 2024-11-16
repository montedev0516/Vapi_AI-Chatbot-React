export interface IPlan {
  plan: string;
  discount?: number;
  extraMonths?: number;
  exPrice: number;
  price: number;
  priceA: string;
  priceB: string;
  buttonText: string;
}

export interface IPeriod {
  title: string;
  available: boolean;
  months: number;
  data: Array<IPlan>;
}

export const pricingData: Array<IPeriod> = [
  {
    title: '5-year plan',
    available: true,
    months: 60,
    data: [
      {
        plan: 'Max',
        discount: 0.83,
        exPrice: 19.95,
        price: 3.33,
        priceA: '3',
        priceB: '.33',
        buttonText: 'Get 5 year Plan',
      },
      {
        plan: 'Plus',
        discount: 0.83,
        exPrice: 15.95,
        price: 2.66,
        priceA: '2',
        priceB: '.66',
        buttonText: 'Get 5 year Plan',
      },
      {
        plan: 'Standard',
        discount: 0.83,
        exPrice: 12.95,
        price: 2.16,
        priceA: '2',
        priceB: '.16',
        buttonText: 'Get 5 year Plan',
      },
    ],
  },
  {
    title: '2-year plan',
    available: true,
    months: 24,
    data: [
      {
        plan: 'Max',
        discount: 0.8,
        extraMonths: 3,
        exPrice: 19.95,
        price: 4.07,
        priceA: '4',
        priceB: '.07',
        buttonText: 'Get Max Plan',
      },
      {
        plan: 'Plus',
        discount: 0.81,
        extraMonths: 3,
        exPrice: 15.95,
        price: 2.96,
        priceA: '2',
        priceB: '.96',
        buttonText: 'Get Plus Plan',
      },
      {
        plan: 'Standard',
        discount: 0.83,
        extraMonths: 3,
        exPrice: 12.95,
        price: 2.14,
        priceA: '2',
        priceB: '.14',
        buttonText: 'Get Standard Plan',
      },
      {
        plan: 'Teams',
        discount: 0.47,
        exPrice: 8.95,
        price: 4.75,
        priceA: '4',
        priceB: '.75',
        buttonText: 'Get Teams Plan',
      },
    ],
  },
  {
    title: '1-year plan',
    available: true,
    months: 12,
    data: [
      {
        plan: 'Max',
        discount: 0.65,
        exPrice: 19.95,
        price: 7.07,
        priceA: '7',
        priceB: '.07',
        buttonText: 'Get Max Plan',
      },
      {
        plan: 'Plus',
        discount: 0.63,
        exPrice: 15.95,
        price: 5.82,
        priceA: '5',
        priceB: '.82',
        buttonText: 'Get Plus Plan',
      },
      {
        plan: 'Standard',
        discount: 0.69,
        exPrice: 12.95,
        price: 3.99,
        priceA: '3',
        priceB: '.99',
        buttonText: 'Get Standard Plan',
      },
      {
        plan: 'Teams',
        discount: 0.39,
        exPrice: 8.95,
        price: 5.45,
        priceA: '5',
        priceB: '.45',
        buttonText: 'Get Teams Plan',
      },
    ],
  },
  {
    title: 'Monthly plan',
    available: true,
    months: 1,
    data: [
      {
        plan: 'Max',
        exPrice: 19.95,
        price: 19.95,
        priceA: '19',
        priceB: '.95',
        buttonText: 'Get Max Plan',
      },
      {
        plan: 'Plus',
        exPrice: 15.95,
        price: 15.95,
        priceA: '15',
        priceB: '.95',
        buttonText: 'Get Plus Plan',
      },
      {
        plan: 'Standard',
        exPrice: 12.95,
        price: 12.95,
        priceA: '12',
        priceB: '.95',
        buttonText: 'Get Standard Plan',
      },
      {
        plan: 'Teams',
        exPrice: 8.95,
        price: 8.95,
        priceA: '8',
        priceB: '.95',
        buttonText: 'Get Teams Plan',
      },
    ],
  },
];
