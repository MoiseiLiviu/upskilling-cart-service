import { Module } from '@nestjs/common';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import * as productProto from './adapters/product/proto/product.pb';
import * as orderProto from './adapters/order/proto/order.pb';

import { CartDataAccessModule } from './mongo/cart-data-access.module';
import {
  CHECK_PRODUCT_AVAILABILITY_ADAPTER_TOKEN,
  GET_PRODUCT_BY_ID_ADAPTER_TOKEN,
  INIT_ORDER_ADAPTER_TOKEN,
  ProductServiceToken,
} from '../tokens/cart-tokens';
import { CheckProductAvailabilityAdapter } from './adapters/product/check-product-availability.adapter';
import { GetProductByIdAdapter } from './adapters/product/get-product-by-id.adapter';
import { InitOrderAdapter } from './adapters/order/init-order-adapter.service';
import { LoggerModule } from '@nest-upskilling/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule,
    CartDataAccessModule,
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT_PACKAGE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('PRODUCT_SERVICE_URL'),
            package: productProto.protobufPackage,
            protoPath: 'node_modules/upskilling-protos/proto/product.proto',
          },
        }),
      },
      {
        name: 'ORDER_PACKAGE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('ORDER_SERVICE_URL'),
            package: orderProto.protobufPackage,
            protoPath: 'node_modules/upskilling-protos/proto/order.proto',
          },
        }),
      },
    ]),
  ],
  providers: [
    {
      inject: ['PRODUCT_PACKAGE'],
      useFactory: (clientGrpc: ClientGrpc) =>
        clientGrpc.getService<productProto.ProductServiceClient>(
          'ProductService',
        ),
      provide: ProductServiceToken,
    },
    {
      provide: CHECK_PRODUCT_AVAILABILITY_ADAPTER_TOKEN,
      useClass: CheckProductAvailabilityAdapter,
    },
    {
      provide: GET_PRODUCT_BY_ID_ADAPTER_TOKEN,
      useClass: GetProductByIdAdapter,
    },
    {
      provide: INIT_ORDER_ADAPTER_TOKEN,
      useClass: InitOrderAdapter,
    },
  ],
  exports: [
    CartDataAccessModule,
    ProductServiceToken,
    GET_PRODUCT_BY_ID_ADAPTER_TOKEN,
    CHECK_PRODUCT_AVAILABILITY_ADAPTER_TOKEN,
    INIT_ORDER_ADAPTER_TOKEN,
  ],
})
export class CartInfrastructureModule {}
