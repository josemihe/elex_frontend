import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentosComponent } from './documentos.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'documentos/:id',
        component: DocumentosComponent
      }
    ])
  ],
  declarations: [DocumentosComponent]
})
export class DocumentosModule { }
