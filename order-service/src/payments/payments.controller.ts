import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PaymentsService, Payment } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Get(':orderId')
  async findByOrderId(@Param('orderId') orderId: number): Promise<Payment> {
    return this.paymentsService.findByOrderId(orderId);
  }
}
