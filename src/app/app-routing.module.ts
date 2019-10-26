import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component';
import { RegistrarUsuarioComponent } from './autenticacao/registrar-usuario/registrar-usuario.component';
import { RegistrarClienteComponent } from './dashboard/registrar-cliente/registrar-cliente.component';
import { ManipularClienteComponent } from './dashboard/manipular-cliente/manipular-cliente.component';


const APP_ROUTES: Routes = [
    { path: 'login', component: AutenticacaoComponent,
        data: { title: 'Login' }
    },
    { path: 'registrar',  component: RegistrarUsuarioComponent,
        data: { title: 'Registrar' }
    },
    { path: 'registrar-cliente',  component: RegistrarClienteComponent,
        data: { title: 'Registrar' }
    },
    { path: 'listar-cliente',  component: ManipularClienteComponent,
        data: { title: 'Listar' }
    },
    { path: 'editar-cliente',  component: RegistrarClienteComponent,
        data: { title: 'Editar' }
    },
    { path: '',  pathMatch: 'full', redirectTo: 'login' },
    { path: '**', component: PaginaNaoEncontradaComponent,
        data: { title: 'Pagina Não Encontrada' }
    }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
