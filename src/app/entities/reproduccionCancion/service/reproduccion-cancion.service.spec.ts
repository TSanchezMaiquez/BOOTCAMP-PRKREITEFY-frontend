import { TestBed } from '@angular/core/testing';

import { ReproduccionCancionService } from './reproduccion-cancion.service';

describe('ReproduccionCancionService', () => {
  let service: ReproduccionCancionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReproduccionCancionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
