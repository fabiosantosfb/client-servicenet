export class Cliente {
    private _id: number;
    private _nome: string;
    private _telefone: string;
    private _cep: string;
    private _estado: string;
    private _cidade: string;
    private _bairro: string;
    private _numero: string;
    private _pais: string;
    private _logradouro: string;
    private _latitude: string;
    private _longitude: string;


    constructor(
        id?: number,
        nome?: string,
        telefone?: string,
        estado?: string,
        cidade?: string,
        bairro?: string,
        pais?: string,
        logradouro?: string,
        cep?: string,
        numero?: string,
        latitude?: string,
        longitude?: string
    ) {
        this._id = id;
        this._nome = nome;
        this._telefone = telefone;
        this._cep = cep;
        this._estado = estado;
        this._cidade = cidade;
        this._bairro = bairro;
        this._numero = numero;
        this._pais = pais;
        this._logradouro = logradouro;
        this._latitude = latitude;
        this._longitude = longitude;
    }

    public get nome(): string {
        return this._nome;
    }

    public get telefone(): string {
        return this._telefone;
    }

    public get id(): number {
        return this._id;
    }

    public get cep(): string {
        return this._cep;
    }

    public get estado(): string {
        return this._estado;
    }

    public get cidade(): string {
        return this._cidade;
    }

    public get bairro(): string {
        return this._bairro;
    }

    public get numero(): string {
        return this._numero;
    }

    public get pais(): string {
        return this._pais;
    }

    public get logradouro(): string {
        return this._logradouro;
    }

    public get latitude(): string {
        return this._latitude;
    }

    public get longitude(): string {
        return this._longitude;
    }
}
