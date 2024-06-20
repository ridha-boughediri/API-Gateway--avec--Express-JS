import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add an item to the cart', () => {
    service.addItem(1, 2);
    const cart = service.getCart();
    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe(1);
    expect(cart[0].quantity).toBe(2);
  });

  it('should increase quantity if item already in cart', () => {
    service.addItem(1, 2);
    service.addItem(1, 3);
    const cart = service.getCart();
    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe(1);
    expect(cart[0].quantity).toBe(5);
  });

  it('should remove an item from the cart', () => {
    service.addItem(1, 2);
    service.removeItem(1);
    const cart = service.getCart();
    expect(cart.length).toBe(0);
  });

  it('should clear the cart', () => {
    service.addItem(1, 2);
    service.addItem(2, 3);
    service.clearCart();
    const cart = service.getCart();
    expect(cart.length).toBe(0);
  });
});
