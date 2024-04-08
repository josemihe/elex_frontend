/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentosService } from './documentos.service';

describe('Service: Documentos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentosService]
    });
  });

  it('should ...', inject([DocumentosService], (service: DocumentosService) => {
    expect(service).toBeTruthy();
  }));
});
