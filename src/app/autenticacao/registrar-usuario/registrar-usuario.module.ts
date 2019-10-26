import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgMaskModule } from '@fagnerlima/ng-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutenticacaoService } from '../servico/autenticacao.service';
import { RegistrarUsuarioComponent } from './registrar-usuario.component';

@NgModule({
    imports: [
        CommonModule,
        NgMaskModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        ModalModule.forRoot()
    ],
    declarations: [
        RegistrarUsuarioComponent
    ],
    bootstrap: [
        RegistrarUsuarioComponent
    ],
    exports: [
        RegistrarUsuarioComponent
    ],
    providers: [
        AutenticacaoService
    ]
})
export class RegistrarUsuarioModule { }
