import { Injectable } from '@nestjs/common';

class CartItem {
  constructor(
    public productId: number,
    public quantity: number,
  ) {}
}

@Injectable()
export class CartService {
  private cart: CartItem[] = [];

  addItem(productId: number, quantity: number): void {
    const item = this.cart.find((item) => item.productId === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      this.cart.push(new CartItem(productId, quantity));
    }
  }

  removeItem(productId: number): void {
    this.cart = this.cart.filter((item) => item.productId !== productId);
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  clearCart(): void {
    this.cart = [];
  }
}
