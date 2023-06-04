import { InitOrderPort } from '../../../application/ports/output/init-order.port';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InitOrderResponse, OrderServiceClient } from './proto/order.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CartRepositoryToken } from '../../../tokens/cart-tokens';
import { CartRepository } from '../../../domain/repositories/cart.repository';
import { LoggerAdapterToken, LoggerPort } from '@nest-upskilling/common';

@Injectable()
export class InitOrderAdapter implements InitOrderPort, OnModuleInit {
  private orderServiceClient: OrderServiceClient;

  constructor(
    @Inject(LoggerAdapterToken)
    private readonly loggerPort: LoggerPort,
    @Inject('ORDER_PACKAGE')
    private readonly clientGrpc: ClientGrpc,
    @Inject(CartRepositoryToken)
    private readonly cartRepository: CartRepository,
  ) {}

  onModuleInit(): any {
    this.orderServiceClient =
      this.clientGrpc.getService<OrderServiceClient>('OrderService');
  }

  async execute(userId: number) {
    const { items } = await this.cartRepository.getByUserId(userId);
    this.loggerPort.log(
      'InitOrderAdapter',
      `Initiating order for user with id: ${userId},
      items: ${items}`,
    );
    const response: InitOrderResponse = await firstValueFrom(
      this.orderServiceClient.initOrder({
        userId,
        items,
      }),
    );

    return response.orderId;
  }
}
