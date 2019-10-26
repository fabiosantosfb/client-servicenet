import {FormControl, FormGroup, Validators} from '@angular/forms';

export class UsuarioForm extends FormGroup {

    constructor() {
        super({
            nome: new FormControl(null),
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            repetirSenha: new FormControl(null)
        });
    }

    public removerRequired(campo: string) {
        this.get(campo).setValidators(Validators.required);
    }

    /**
     * @param value
     * @param form
     * @returns {{'has-error': any; 'has-feedback': any}}
     * @memberof UsuarioForm
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
     * @memberof UsuarioForm
     */
    public validateCampo(campo: any): boolean {
        return !this.get(campo).valid && this.get(campo).touched;
    }

    /**
     * Método responsável por verificar se todos os inputs do UsuarioForm foram tocados
     * @returns {void}
     * @memberof UsuarioForm
     */
    public markAllAsTouched(): void {
        for (const controlName of Object.keys(this.controls)) {
            this.get(controlName).markAsTouched();
        }
    }

}
