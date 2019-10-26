import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { UsuarioForm } from './form/usuario.form';
import { AutenticacaoService } from './servico/autenticacao.service';

import { Usuario } from './model/usuario';

@Component({
    selector: 'app-autenticacao',
    templateUrl: './autenticacao.component.html',
    styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit {
    public loading: boolean;
    public usuarioForm: UsuarioForm;
    private usuario: Usuario;
    public modalRef: BsModalRef;
    public content: string;

    constructor(
        private modalService: BsModalService,
        private autenticacaoService: AutenticacaoService,
        private router: Router
    ) {
        this.loading = false;
        this.usuarioForm = new UsuarioForm();
    }

    ngOnInit() {
    }

    public logar(template: TemplateRef<any>) {
        if (!this.usuarioForm.valid) {
            this.usuarioForm.markAllAsTouched();
            this.content = 'Preencha Todos os Campos Obrigatórios.';
            this.modalRef = this.modalService.show(template);

            return;
        }

        this.usuario = new Usuario(
            this.usuarioForm.get('email').value,
            this.usuarioForm.get('password').value
        );

        this.loading = true;

        this.autenticacaoService.loginService(this.usuario).subscribe(
            usuario => {
                this.loading = false;
                localStorage.setItem('usuario', JSON.stringify(usuario));
                this.router.navigateByUrl('listar-cliente');
            }, error2 => {
                this.loading = false;
                if (error2.status === 400) {
                    this.content = 'Email ou senha Inválida.';
                    this.modalRef = this.modalService.show(template);

                    return;
                }
                this.content = 'Usuario não encontrado.';
                this.modalRef = this.modalService.show(template);
            }
        );
    }

}
