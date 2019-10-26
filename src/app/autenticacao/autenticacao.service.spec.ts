import { TestBed } from '@angular/core/testing';

import { AutenticacaoService } from './servico/autenticacao.service';

describe('AutenticacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutenticacaoService = TestBed.get(AutenticacaoService);
    expect(service).toBeTruthy();
  });
});
