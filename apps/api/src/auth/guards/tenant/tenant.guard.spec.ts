import { TenantGuard } from './tenant.guard.js';

describe('TenantGuard', () => {
  it('should be defined', () => {
    expect(new TenantGuard()).toBeDefined();
  });
});
