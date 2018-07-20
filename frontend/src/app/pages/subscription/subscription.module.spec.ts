import { SubscriptionModule } from './subscription.module';

describe('subscriptionModule', () => {
  let subscriptionModule: SubscriptionModule;

  beforeEach(() => {
    subscriptionModule = new SubscriptionModule();
  });

  it('should create an instance', () => {
    expect(subscriptionModule).toBeTruthy();
  });
});
