import { Injectable } from '@angular/core';
import Stripe from 'stripe';
import { environment } from '../../../environments/environment';

const stripe = new Stripe(environment.stripe.secretKey, {
  apiVersion: '2023-08-16'
});


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  async fetchProductDetails() {
    const price = await stripe.prices.retrieve('price_1NkaSMAudd3spP872k8tBsyC');
    const shipping = await stripe.shippingRates.retrieve('shr_1NkaYrAudd3spP87NFhM0nuB');

    return { price: price.unit_amount, shipping: shipping.fixed_amount?.amount };
  }

  async handlePayment(token: string, userId: string) {
    const { price, shipping } = await this.fetchProductDetails();

    const totalAmount = price! + shipping!;

    const charge = await stripe.charges.create({
      amount: totalAmount,
      currency: 'usd',
      description: 'My Husband Cooks',
      source: token,
    });
  }


}
