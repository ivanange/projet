import { TestBed } from '@angular/core/testing';

import { ShowBarGuard } from './show-bar.guard';

describe('ShowBarGuard', () => {
  let guard: ShowBarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShowBarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
