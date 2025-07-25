import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposComponent } from './tipos.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TiposComponent
      }
    ])
  ],
  declarations: [TiposComponent]
})
export class TiposExpedienteModule { }
