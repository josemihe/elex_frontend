/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExpedientesService } from './expedientes.service';

describe('Service: Expedientes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpedientesService]
    });
  });

  it('should ...', inject([ExpedientesService], (service: ExpedientesService) => {
    expect(service).toBeTruthy();
  }));
});
