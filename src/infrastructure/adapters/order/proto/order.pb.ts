/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "order";

export enum OrderStatus {
  UNKNOWN = 0,
  CREATED = 1,
  APPROVED = 2,
  PAID = 3,
  PAYMENT_FAILED = 4,
  ITEMS_REJECTED = 5,
  UNRECOGNIZED = -1,
}

export interface GetOrderStatusRequest {
  orderId: number;
}

export interface GetOrderStatusResponse {
  status: OrderStatus;
}

export interface InitOrderRequest {
  userId: number;
  items: CartItemPayload[];
}

export interface InitOrderResponse {
  orderId: number;
}

export interface CartItemPayload {
  productId: number;
  quantity: number;
  price: number;
}

export const ORDER_PACKAGE_NAME = "order";

export interface OrderServiceClient {
  initOrder(request: InitOrderRequest): Observable<InitOrderResponse>;

  getOrderStatus(request: GetOrderStatusRequest): Observable<GetOrderStatusResponse>;
}

export interface OrderServiceController {
  initOrder(request: InitOrderRequest): Promise<InitOrderResponse> | Observable<InitOrderResponse> | InitOrderResponse;

  getOrderStatus(
    request: GetOrderStatusRequest,
  ): Promise<GetOrderStatusResponse> | Observable<GetOrderStatusResponse> | GetOrderStatusResponse;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["initOrder", "getOrderStatus"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_SERVICE_NAME = "OrderService";
