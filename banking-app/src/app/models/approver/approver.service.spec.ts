import { TestBed } from '@angular/core/testing';

import { ApproverService } from './approver.service';

describe('ApproverService', () => {
  let service: ApproverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
