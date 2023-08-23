import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { superuserGuardGuard } from './superuser-guard.guard';

describe('superuserGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => superuserGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
