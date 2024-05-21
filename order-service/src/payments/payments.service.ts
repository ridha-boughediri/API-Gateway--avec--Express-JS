import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';

export interface Payment {  // Assurez-vous d'exporter cette interface
  id: number;
  orderId: number;
  amount: number;
  method: string;
  status: string;
}

@Injectable()
export class PaymentsService {
  private payments: Payment[] = [];

  createPayment(createPaymentDto: CreatePaymentDto): Payment {
    const payment: Payment = {
      id: this.payments.length + 1,
      ...createPaymentDto,
      status: 'pending',
    };
    this.payments.push(payment);
    // Logic to process payment can be added here
    payment.status = 'completed';
    return payment;
  }

  findAll(): Payment[] {
    return this.payments;
  }

  findByOrderId(orderId: number): Payment {
    return this.payments.find(payment => payment.orderId === orderId);
  }
}
