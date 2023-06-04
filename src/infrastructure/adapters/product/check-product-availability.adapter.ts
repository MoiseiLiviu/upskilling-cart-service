import { CheckProductAvailabilityPort } from '../../../application/ports/output/check-product-availability.port';
import { Inject, Injectable } from '@nestjs/common';
import { ProductServiceToken } from '../../../tokens/cart-tokens';
import {
  CheckProductAvailabilityResponse,
  ProductServiceClient,
} from './proto/product.pb';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CheckProductAvailabilityAdapter
  implements CheckProductAvailabilityPort
{
  constructor(
    @Inject(ProductServiceToken)
    private readonly productServiceClient: ProductServiceClient,
  ) {}

  async execute(productId: number, quantity: number): Promise<boolean> {
    const response: CheckProductAvailabilityResponse = await firstValueFrom(
      this.productServiceClient.checkProductAvailability({
        productId,
        quantity,
      }),
    );

    return response.isAvailable;
  }
}
