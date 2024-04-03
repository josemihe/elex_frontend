import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedientesComponent } from './expedientes.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ExpedientesComponent
      }
    ])
  ],
  declarations: [ExpedientesComponent]
})
export class ExpedientesModule { }
