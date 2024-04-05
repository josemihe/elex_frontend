import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard } from './services/auth/authGuard.service';

const routes: Routes = [

  {
    path: 'tipos-expediente',
    loadChildren: () => import('./modules/tipos-expediente-module/tipos.module').then(m => m.TiposExpedienteModule),
    canActivate: [canActivateGuard],
    
  },
  {
    path: 'expedientes',
    loadChildren: () => import('./modules/expedientes-module/expedientes.module').then(m => m.ExpedientesModule),
    canActivate: [canActivateGuard],
    
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login-module/login-module.module').then(m => m.LoginModule),
    data: { hideHeader: true }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
