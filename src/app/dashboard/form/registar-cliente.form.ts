import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ClienteInterface} from '../model/cliente.interface';

export class RegistarClienteForm extends FormGroup {

    constructor() {
        super({
            cep: new FormControl(null),
            estado: new FormControl(null, Validators.required),
            cidade: new FormControl(null, Validators.required),
            bairro: new FormControl(null, Validators.required),
            rua: new FormControl(null, Validators.required),
            pais: new FormControl(null, Validators.required),
            telefone: new FormControl(null, Validators.required),
            nome: new FormControl(null, Validators.required),
            logradouro: new FormControl(null),
            latitude: new FormControl(null),
            longitude: new FormControl(null),
            numero: new FormControl(null)
        });
    }

    /**
     * Método responsável por preecher os inputs com dados do endereço
     * @param { ClienteInterface } cliente
     * @memberof RegistarClienteForm
     */
    public populateValueEndereco(cliente: any, endereco: any): void {
        this.get('cep').setValue(endereco.cep);
        this.get('estado').setValue(endereco.estado);
        this.get('cidade').setValue(endereco.cidade);
        this.get('bairro').setValue(endereco.bairro);
        this.get('logradouro').setValue(endereco.rua);
        this.get('latitude').setValue(endereco.latitude);
        this.get('longitude').setValue(endereco.longitude);
        this.get('numero').setValue(endereco.numero);
        this.get('pais').setValue(endereco.pais);
        this.get('nome').setValue(cliente.nome);
        this.get('telefone').setValue(cliente.telefone);
    }

    public populaDadosEndereco(dados: any) {
        this.limpaDadosEndereco();

        if (('erro' in dados)) {
            return false;
        }

        this.patchValue({
            cep:  dados.cep,
            estado: dados.uf,
            cidade: dados.localidade,
            bairro: dados.bairro,
            rua: dados.logradouro,
            logradouro: dados.logradouro + ' - ' + dados.bairro + ' , ' + dados.localidade
        });
    }

    public limpaDadosEndereco(): void {
        this.patchValue({
            cep:  '',
            estado: '',
            cidade: '',
            bairro: '',
            logradouro: '',
            numero:  '',
            pais: '',
            complemento: ''
        });
    }

    public limpaDadosCliente(): void {
        this.patchValue({
            nome:  '',
            telefone: ''
        });

        this.limpaDadosEndereco();
    }

    /**
     * @param value
     * @param form
     * @returns {{'has-error': any; 'has-feedback': any}}
     * @memberof RegistarClienteForm
     */
    public erroFormulario(value: any) {
        return {
            'has-error': this.validateCampo(value),
            'has-feedback': this.validateCampo(value)
        };
    }

    /**
     * @param campo
     * @returns {boolean}
     * @memberof RegistarClienteForm
     */
    public validateCampo(campo: any): boolean {
        return !this.get(campo).valid && this.get(campo).touched;
    }

    /**
     * Método responsável por verificar se todos os inputs do AnucianteForm foram tocados
     * @returns {void}
     * @memberof RegistarClienteForm
     */
    public markAllAsTouched(): void {
        for (const controlName of Object.keys(this.controls)) {
            this.get(controlName).markAsTouched();
        }
    }
}
