/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "cart";

export interface InitOrderRequest {
  userId: number;
}

export interface InitOrderResponse {
  orderId: number;
}

export interface CartItemOperationResponse {
  status: number;
  error: string;
  message: string;
}

export interface GetCartByUserIdRequest {
  userId: number;
}

export interface CartPayload {
  userId: number;
  items: CartItemPayload[];
}

export interface CartItemPayload {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface AddItemToCartRequest {
  userId: number;
  productId: number;
  quantity: number;
}

export interface UpdateItemQuantityRequest {
  userId: number;
  productId: number;
  newQuantity: number;
}

export interface ClearCartRequest {
  userId: number;
}

export interface RemoveItemRequest {
  productId: number;
  userId: number;
}

export const CART_PACKAGE_NAME = "cart";

export interface CartServiceClient {
  getCartByUserId(request: GetCartByUserIdRequest): Observable<CartPayload>;

  addItem(request: AddItemToCartRequest): Observable<CartItemOperationResponse>;

  clearCart(request: ClearCartRequest): Observable<CartItemOperationResponse>;

  updateItemQuantity(request: UpdateItemQuantityRequest): Observable<CartItemOperationResponse>;

  removeItem(request: RemoveItemRequest): Observable<CartItemOperationResponse>;

  initOrder(request: InitOrderRequest): Observable<InitOrderResponse>;
}

export interface CartServiceController {
  getCartByUserId(request: GetCartByUserIdRequest): Promise<CartPayload> | Observable<CartPayload> | CartPayload;

  addItem(
    request: AddItemToCartRequest,
  ): Promise<CartItemOperationResponse> | Observable<CartItemOperationResponse> | CartItemOperationResponse;

  clearCart(
    request: ClearCartRequest,
  ): Promise<CartItemOperationResponse> | Observable<CartItemOperationResponse> | CartItemOperationResponse;

  updateItemQuantity(
    request: UpdateItemQuantityRequest,
  ): Promise<CartItemOperationResponse> | Observable<CartItemOperationResponse> | CartItemOperationResponse;

  removeItem(
    request: RemoveItemRequest,
  ): Promise<CartItemOperationResponse> | Observable<CartItemOperationResponse> | CartItemOperationResponse;

  initOrder(request: InitOrderRequest): Promise<InitOrderResponse> | Observable<InitOrderResponse> | InitOrderResponse;
}

export function CartServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getCartByUserId",
      "addItem",
      "clearCart",
      "updateItemQuantity",
      "removeItem",
      "initOrder",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CartService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CartService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CART_SERVICE_NAME = "CartService";
