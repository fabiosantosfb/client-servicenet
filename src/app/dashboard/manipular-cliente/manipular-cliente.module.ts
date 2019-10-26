import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgMaskModule } from '@fagnerlima/ng-mask';

import { ManipularClienteComponent } from './manipular-cliente.component';
import { RegistrarClienteService } from '../servico/registrar-cliente.service';
import { RouteDataTransfer } from '../../utils/route-data-transfer';

@NgModule({
    imports: [
        CommonModule,
        NgMaskModule,
        RouterModule
    ],
    declarations: [ManipularClienteComponent],
    bootstrap: [ManipularClienteComponent],
    exports: [ManipularClienteComponent],
    providers: [RegistrarClienteService, RouteDataTransfer]
})
export class ManipularClienteModule { }
