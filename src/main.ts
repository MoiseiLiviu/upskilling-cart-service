import { NestFactory } from '@nestjs/core';
import { CartModule } from './cart.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from './proto/cart.pb';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CartModule,
    {
      transport: Transport.GRPC,
      options: {
        package: protobufPackage,
        protoPath: 'node_modules/upskilling-protos/proto/cart.proto',
        url: '0.0.0.0:5004',
      },
    },
  );

  await app.listen();
}

bootstrap();
