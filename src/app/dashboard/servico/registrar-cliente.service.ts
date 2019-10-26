import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/internal/operators';

import { DadosCepInterface } from '../model/dados-cep.interface';

@Injectable({
    providedIn: 'root'
})
export class RegistrarClienteService {
    readonly clientes: string = '/api/cliente/';
    private url = 'http://localhost:8000';

    constructor(private httpClient: HttpClient) { }

    /**
     * @description Buscar cep
     *
     * @param {string} cep
     * @returns {Observable<DadosCepInterface>}
     */
    public consultaCep(cep: string): Observable<DadosCepInterface> {
        const cepValue = cep.replace(/\D/g, '');

        return this.httpClient.get<DadosCepInterface>(`https://viacep.com.br/ws/${cepValue}/json`)
            .pipe(map((response: DadosCepInterface) => response));
    }

    /**
     * @description listar todos clientes
     *
     * @returns {Observable<any>}
     */
    public listarCliente(): Observable<any> {
        return this.httpClient.get<any>( this.url + this.clientes)
            .pipe(mergeMap(data => {
                return of(data);
            }));
    }

    /**
     * @description remover cliente por id
     *
     * @param cliente
     * @returns {Observable<any>}
     */
    public removerCliente(cliente: any): Observable<any> {
        return this.httpClient.delete<any>( this.url + this.clientes + `${cliente.id}`)
            .pipe(mergeMap(data => {
                return of(data);
            }));
    }

    /**
     * @description buscar dados do cliente por id
     *
     * @param cliente
     * @returns {Observable<any>}
     */
    public buscarCliente(cliente: any): Observable<any> {
        return this.httpClient.get<any>( this.url + this.clientes + `${cliente.id}`)
            .pipe(mergeMap(data => {
                return of(data);
            }));
    }

    /**
     * @description salvar dados cliente
     *
     * @param cliente
     * @returns {Observable<any>}
     */
    public salvarCliente(cliente: any): Observable<any> {
        const dados = new FormData();
        dados.append('nome', cliente.nome);
        dados.append('telefone', cliente.telefone);
        dados.append('cep', cliente.cep);
        dados.append('bairro', cliente.bairro);
        dados.append('estado', cliente.estado);
        dados.append('cidade', cliente.cidade);
        dados.append('pais', cliente.pais);
        dados.append('numero', cliente.numero);
        dados.append('rua', cliente.logradouro);

        return this.httpClient.post<any>( this.url + this.clientes, dados, { withCredentials: false })
            .pipe(mergeMap(data => {
                return of(data);
            }));
    }

    /**
     * @description editar dados do cliente
     *
     * @param cliente
     * @returns {Observable<any>}
     */
    public editarCliente(cliente: any): Observable<any> {
        const dados = new FormData();
        dados.append('nome', cliente.nome);
        dados.append('telefone', cliente.telefone);
        dados.append('cep', cliente.cep);
        dados.append('bairro', cliente.bairro);
        dados.append('estado', cliente.estado);
        dados.append('cidade', cliente.cidade);
        dados.append('pais', cliente.pais);
        dados.append('numero', cliente.numero);
        dados.append('rua', cliente.logradouro);

        return this.httpClient.put<any>(this.url + this.clientes + `${cliente.id}`, dados, { withCredentials: false })
            .pipe(mergeMap(data => {
                return of(data);
            }));
    }
}
