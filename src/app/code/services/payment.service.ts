import { Injectable } from '@angular/core';
import Stripe from 'stripe';
import { environment } from '../../../environments/environment';
import { addDoc, collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../app.module';
import { Product } from '@stripe/firestore-stripe-payments';

const stripe = new Stripe(environment.stripe.secretKey, {
  apiVersion: '2023-08-16'
});


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() {
  }

  async fetchAvailableProducts() {
    const products: Product[] = [];
    const q = query(collection(db, 'products'), where('active', '==', true));
    const querySnapshot = await getDocs(q);
    for (const doc of querySnapshot.docs) {
      const productData = doc.data();
      const priceSnap = await getDocs(collection(doc.ref, 'prices'));
      const prices = priceSnap.docs.map(priceDoc => priceDoc.data());
      products.push({ ...productData, prices } as Product);
    }
    return products;
  }

  async createCheckoutSession(userId: string, priceId: string) {
    const checkoutSessionRef = collection(doc(db, 'customers', userId), 'checkout_sessions');
    return addDoc(checkoutSessionRef, {
      mode: 'payment',
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin
    });
  }


}
