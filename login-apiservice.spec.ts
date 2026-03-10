import { TestBed } from '@angular/core/testing';

import { LoginApiservice } from './login-apiservice';

describe('LoginApiservice', () => {
  let service: LoginApiservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginApiservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
