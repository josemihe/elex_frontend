//ELEX: SpringBoot3.2 + Angular17.3 -> Paso5: Controlador componente GENERAL

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Hay que añadir estos componentes de Librerias Angular
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { LoginService } from './services/auth/login.service'; 
import { ActuacionesModule } from './modules/actuaciones/actuaciones.module';
import { DocumentosModule } from './modules/documentos/documentos.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Añadimos el HttpClient y el Forms
    HttpClientModule,
    FormsModule,
    ActuacionesModule,
    DocumentosModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true},
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
