import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiceComponent } from './indice.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IndiceComponent
      }
    ]),
  ],
  declarations: [IndiceComponent]
})
export class IndiceModule { }
