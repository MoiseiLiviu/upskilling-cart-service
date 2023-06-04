/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "product";

export interface CheckProductAvailabilityResponse {
  isAvailable: boolean;
}

export interface CheckProductAvailabilityRequest {
  productId: number;
  quantity: number;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  unitsAvailable: number;
  imageUrl: string;
  userId: number;
  categoriesId: number[];
}

export interface GetProductByIdRequest {
  id: number;
}

export interface ProductCategoryPayload {
  id: number;
  name: string;
}

export interface ProductPayload {
  id: number;
  name: string;
  price: number;
  unitsAvailable: number;
  imageUrl: string;
  categories: ProductCategoryPayload[];
}

export const PRODUCT_PACKAGE_NAME = "product";

export interface ProductServiceClient {
  getById(request: GetProductByIdRequest): Observable<ProductPayload>;

  createProduct(request: CreateProductRequest): Observable<ProductPayload>;

  checkProductAvailability(request: CheckProductAvailabilityRequest): Observable<CheckProductAvailabilityResponse>;
}

export interface ProductServiceController {
  getById(request: GetProductByIdRequest): Promise<ProductPayload> | Observable<ProductPayload> | ProductPayload;

  createProduct(request: CreateProductRequest): Promise<ProductPayload> | Observable<ProductPayload> | ProductPayload;

  checkProductAvailability(
    request: CheckProductAvailabilityRequest,
  ):
    | Promise<CheckProductAvailabilityResponse>
    | Observable<CheckProductAvailabilityResponse>
    | CheckProductAvailabilityResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getById", "createProduct", "checkProductAvailability"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = "ProductService";
