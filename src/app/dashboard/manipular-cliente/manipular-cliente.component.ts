import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegistrarClienteService } from '../servico/registrar-cliente.service';
import { RouteDataTransfer } from '../../utils/route-data-transfer';

@Component({
    selector: 'app-manipular-cliente',
    templateUrl: './manipular-cliente.component.html',
    styleUrls: ['./manipular-cliente.component.css']
})
export class ManipularClienteComponent implements OnInit {
    public clientes: any;
    public user: any;

    constructor(
        private registrarClienteService: RegistrarClienteService,
        private routeDataTransfer: RouteDataTransfer,
        private router: Router
    ) {
        this.clientes = [];
        this.user = null;
    }

    ngOnInit() {
        this.listarClientes();
        this.user = JSON.parse(localStorage.getItem('usuario'));

        if (!this.user) {
            this.logout();
        }
    }

    private listarClientes() {
        this.registrarClienteService.listarCliente().subscribe(
            dados => {
                this.clientes = dados;
            }, error2 => {
                alert('Erro ao listar os clientes.');
            }
        );
    }

    public editar(cliente: any) {
        this.routeDataTransfer.addElement('cliente', cliente);
        this.router.navigateByUrl('editar-cliente');
    }

    public remover(cliente: any, index: number) {
        this.registrarClienteService.removerCliente(cliente).subscribe(
            dados => {
                this.clientes.splice(index, 1);
                alert('Cliente removido com sucesso.');
            }, error2 => {
                alert('Erro ao remover clientes.');
            }
        );
    }

    public logout() {
        localStorage.removeItem('usuario');
        localStorage.clear();
        this.router.navigateByUrl('login');
    }
}
