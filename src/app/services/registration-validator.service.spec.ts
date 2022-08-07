import { TestBed } from '@angular/core/testing';

import { RegistrationValidatorService } from './registration-validator.service';

describe('RegistrationValidatorService', () => {
  let service: RegistrationValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
