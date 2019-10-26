import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgMaskModule } from '@fagnerlima/ng-mask';

import { AutenticacaoService } from './servico/autenticacao.service';
import { AutenticacaoComponent } from './autenticacao.component';

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
        AutenticacaoComponent
    ],
    bootstrap: [
        AutenticacaoComponent
    ],
    exports: [
        AutenticacaoComponent
    ],
    providers: [
        AutenticacaoService
    ]
})
export class AutenticacaoModule { }
