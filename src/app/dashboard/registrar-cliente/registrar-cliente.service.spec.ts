import { TestBed } from '@angular/core/testing';

import { RegistrarClienteService } from '../servico/registrar-cliente.service';

describe('RegistrarClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarClienteService = TestBed.get(RegistrarClienteService);
    expect(service).toBeTruthy();
  });
});
