import { TestBed } from '@angular/core/testing';

import { ValoracionCancionService } from './valoracion-cancion.service';

describe('ValoracionCancionService', () => {
  let service: ValoracionCancionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValoracionCancionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
