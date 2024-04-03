import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tipos-expediente',
    loadChildren: () => import('./modules/tipos-expediente-module/tipos.module').then(m => m.TiposExpedienteModule)
  },
  {
    path: 'expedientes',
    loadChildren: () => import('./modules/expedientes-module/expedientes.module').then(m => m.ExpedientesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
