import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaNaoEncontradaModule } from '../../pagina-nao-encontrada/pagina-nao-encontrada.module';
import { ManipularClienteModule } from '../../dashboard/manipular-cliente/manipular-cliente.module';
import { RegistrarClienteModule } from '../../dashboard/registrar-cliente/registrar-cliente.module';
import { RegistrarUsuarioModule } from '../../autenticacao/registrar-usuario/registrar-usuario.module';
import { AutenticacaoModule } from '../../autenticacao/autenticacao.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class NavModule { }
