import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { AutenticacaoService } from '../servico/autenticacao.service';
import { UsuarioForm } from '../form/usuario.form';
import { Usuario } from '../model/usuario';

@Component({
    selector: 'app-registrar-usuario',
    templateUrl: './registrar-usuario.component.html',
    styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
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

    public registrar(template: TemplateRef<any>) {
        this.usuarioForm.removerRequired('nome');
        this.usuarioForm.removerRequired('repetirSenha');

        if (!this.usuarioForm.valid) {
            this.usuarioForm.markAllAsTouched();
            this.content = 'Preencha Todos os Campos Obrigatórios.';
            this.modalRef = this.modalService.show(template);

            return;
        }

        this.usuario = new Usuario(
            this.usuarioForm.get('email').value,
            this.usuarioForm.get('password').value,
            this.usuarioForm.get('repetirSenha').value,
            this.usuarioForm.get('nome').value
        );

        if (!this.usuario.equalpassword()) {
            this.content = 'Senhas Diferentes.';
            this.modalRef = this.modalService.show(template);

            return;
        }

        this.loading = true;

        this.autenticacaoService.registrarService(this.usuario).subscribe(
            resp => {
                this.content = 'Usuário registrado com sucesso, efetue o login.';
                this.modalRef = this.modalService.show(template);
                this.loading = false;
                this.router.navigateByUrl('login');
            }, error => {
                this.loading = false;
                this.content = 'Erro ao efetuar o registro.';
                this.modalRef = this.modalService.show(template);
            }
        );
    }

}
