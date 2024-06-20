import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';

interface AddItemDto {
  productId: number;
  quantity: number;
}

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addItem(@Body() addItemDto: AddItemDto): void {
    this.cartService.addItem(addItemDto.productId, addItemDto.quantity);
  }

  @Delete('remove/:productId')
  removeItem(@Param('productId') productId: number): void {
    this.cartService.removeItem(productId);
  }

  @Get()
  getCart() {
    return this.cartService.getCart();
  }

  @Delete('clear')
  clearCart(): void {
    this.cartService.clearCart();
  }
}
