/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActuacionesService } from './actuaciones.service';

describe('Service: Actuaciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActuacionesService]
    });
  });

  it('should ...', inject([ActuacionesService], (service: ActuacionesService) => {
    expect(service).toBeTruthy();
  }));
});
