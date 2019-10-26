import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

import { RegistrarClienteComponent } from './registrar-cliente.component';
import { NgMaskModule } from '@fagnerlima/ng-mask';

import { RegistrarClienteService } from '../servico/registrar-cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { RouteDataTransfer } from '../../utils/route-data-transfer';

@NgModule({
    imports: [
        CommonModule,
        NgMaskModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDCRcfBf8jRXiDmYh1E5vipmJULbsxmvt4',
            libraries: ['places']
        }),
        RouterModule,
        ModalModule.forRoot()
    ],
    declarations: [RegistrarClienteComponent],
    bootstrap: [RegistrarClienteComponent],
    exports: [RegistrarClienteComponent],
    providers: [RegistrarClienteService, RouteDataTransfer]
})
export class RegistrarClienteModule { }
