import { TestBed } from '@angular/core/testing';

import { HideTabsGuard } from './hide-tabs.guard';

describe('HideTabsGuard', () => {
  let guard: HideTabsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HideTabsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
