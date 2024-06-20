import { Injectable } from '@nestjs/common';

export interface Order {  // Ajoutez export ici
  id: number;
  product: string;
  quantity: number;
  price: number;
}

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  createOrder(order: Order): Order {
    this.orders.push(order);
    return order;
  }

  findAll(): Order[] {
    return this.orders;
  }
}
