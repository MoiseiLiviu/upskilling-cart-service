import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AddItemToCartRequest,
  CartItemOperationResponse,
  CartPayload,
  ClearCartRequest,
  GetCartByUserIdRequest,
  InitOrderRequest,
  InitOrderResponse,
  RemoveItemRequest,
  UpdateItemQuantityRequest,
} from '../proto/cart.pb';
import {
  ADD_TO_CART_USE_CASE,
  CartRepositoryToken,
  CLEAR_CART_USE_CASE,
  INIT_ORDER_ADAPTER_TOKEN,
  REMOVE_CART_ITEM_USE_CASE,
  UPDATE_CART_ITEM_USE_CASE,
} from '../tokens/cart-tokens';
import { AddToCartPort } from '../application/ports/input/add-to-cart.port';
import { UpdateCartItemPort } from '../application/ports/input/update-cart-item.port';
import { ClearCartPort } from '../application/ports/input/clear-cart.port';
import { RemoveItemPort } from '../application/ports/input/remove-item.port';
import { CartRepository } from '../domain/repositories/cart.repository';
import { CartMapper } from './cart.mapper';
import { InitOrderPort } from '../application/ports/output/init-order.port';
import { LoggerAdapterToken, LoggerPort } from '@nest-upskilling/common/dist';

@Controller()
export class CartController {
  constructor(
    @Inject(ADD_TO_CART_USE_CASE)
    private readonly addToCartPort: AddToCartPort,
    @Inject(UPDATE_CART_ITEM_USE_CASE)
    private readonly updateCartItemPort: UpdateCartItemPort,
    @Inject(CLEAR_CART_USE_CASE)
    private readonly clearCartPort: ClearCartPort,
    @Inject(REMOVE_CART_ITEM_USE_CASE)
    private readonly removeItemPort: RemoveItemPort,
    @Inject(CartRepositoryToken)
    private readonly cartRepository: CartRepository,
    @Inject(INIT_ORDER_ADAPTER_TOKEN)
    private readonly initOrderPort: InitOrderPort,
    @Inject(LoggerAdapterToken)
    private readonly loggerPort: LoggerPort,
  ) {}

  @GrpcMethod('CartService', 'AddItem')
  async addItem(
    payload: AddItemToCartRequest,
  ): Promise<CartItemOperationResponse> {
    return await this.addToCartPort.addToCart(
      payload.userId,
      payload.productId,
      payload.quantity,
    );
  }

  @GrpcMethod('CartService', 'UpdateItemQuantity')
  async updateItem(
    payload: UpdateItemQuantityRequest,
  ): Promise<CartItemOperationResponse> {
    return await this.updateCartItemPort.execute(
      payload.userId,
      payload.productId,
      payload.newQuantity,
    );
  }

  @GrpcMethod('CartService', 'ClearCart')
  async clearCart(
    payload: ClearCartRequest,
  ): Promise<CartItemOperationResponse> {
    return await this.clearCartPort.execute(payload.userId);
  }

  @GrpcMethod('CartService', 'RemoveItem')
  async removeItem(
    payload: RemoveItemRequest,
  ): Promise<CartItemOperationResponse> {
    return await this.removeItemPort.execute(payload.userId, payload.productId);
  }

  @GrpcMethod('CartService', 'GetCartByUserId')
  async getCartByUserId(payload: GetCartByUserIdRequest): Promise<CartPayload> {
    const cart = await this.cartRepository.getByUserId(payload.userId);
    return CartMapper.toCartPayload(cart);
  }

  @GrpcMethod('CartService', 'InitOrder')
  async initOrder(payload: InitOrderRequest): Promise<InitOrderResponse> {
    this.loggerPort.log(
      'CartController',
      `Received init order request for user with id ${payload.userId}`,
    );
    const orderId = await this.initOrderPort.execute(payload.userId);
    this.loggerPort.log(
      'CartController',
      `Order initiated successfully, created order id: ${orderId}`,
    );

    return { orderId };
  }
}
