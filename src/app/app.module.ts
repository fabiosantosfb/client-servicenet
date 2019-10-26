import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './partls/nav/nav.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { RegistrarClienteModule } from './dashboard/registrar-cliente/registrar-cliente.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { RegistrarUsuarioModule } from './autenticacao/registrar-usuario/registrar-usuario.module';
import {ManipularClienteModule} from './dashboard/manipular-cliente/manipular-cliente.module';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        PaginaNaoEncontradaComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RegistrarClienteModule,
        AutenticacaoModule,
        RegistrarUsuarioModule,
        ManipularClienteModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
