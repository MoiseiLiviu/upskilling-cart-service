import { GetProductByIdPort } from '../../../application/ports/output/get-product-by-id.port';
import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../../domain/models/product.model';
import { ProductServiceToken } from '../../../tokens/cart-tokens';
import { ProductPayload, ProductServiceClient } from './proto/product.pb';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GetProductByIdAdapter implements GetProductByIdPort {
  constructor(
    @Inject(ProductServiceToken)
    private readonly productServiceClient: ProductServiceClient,
  ) {}

  async execute(id: number): Promise<Product> {
    const productPayload: ProductPayload = await firstValueFrom(
      this.productServiceClient.getById({ id }),
    );

    return {
      id: productPayload.id,
      imageUrl: productPayload.imageUrl,
      unitsAvailable: productPayload.unitsAvailable,
      price: productPayload.price,
      name: productPayload.name,
    };
  }
}
