import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedientesComponent } from './expedientes.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActuacionesComponent } from '../actuaciones/actuaciones.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
