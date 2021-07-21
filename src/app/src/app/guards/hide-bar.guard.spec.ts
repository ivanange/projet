import { TestBed } from '@angular/core/testing';

import { HideBarGuard } from './hide-bar.guard';

describe('HideBarGuard', () => {
  let guard: HideBarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HideBarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
