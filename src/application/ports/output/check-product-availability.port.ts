export interface CheckProductAvailabilityPort {
  execute(productId: number, quantity: number): Promise<boolean>;
}
