import { TestBed } from '@angular/core/testing';

import { ManipularClienteService } from './manipular-cliente.service';

describe('ManipularClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManipularClienteService = TestBed.get(ManipularClienteService);
    expect(service).toBeTruthy();
  });
});
