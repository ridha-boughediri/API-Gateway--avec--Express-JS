import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

interface Order {
  id: number;
  product: string;
  quantity: number;
  price: number;
}

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() order: Order) {
    return this.ordersService.createOrder(order);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}
