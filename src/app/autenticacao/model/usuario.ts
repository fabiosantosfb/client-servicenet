export class Usuario {
    private _nome: string;
    private _password: string;
    private _email: string;
    private _repetirpassword: string;

    constructor(
        email: string,
        password: string,
        repetirpassword?: string,
        nome?: string
    ) {
        this._nome = nome;
        this._password = password;
        this._email = email;
        this._repetirpassword = repetirpassword;
    }

    public get nome(): string {
        return this._nome;
    }

    public get password(): string {
        return this._password;
    }

    public get email(): string {
        return this._email;
    }

    public get repetirpassword(): string {
        return this._repetirpassword;
    }

    public equalpassword(): boolean {
        return this.password === this.repetirpassword;
    }
}
