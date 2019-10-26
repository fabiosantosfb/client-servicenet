import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/internal/operators';

import { UsuarioInterface } from '../model/usuario.interface';
import { Usuario } from '../model/usuario';


@Injectable({
    providedIn: 'root'
})
export class AutenticacaoService {
    readonly registro: string = '/api/autenticacao/';
    readonly login: string = '/api/autenticacao/login/';
    private url = 'http://localhost:8000';

    constructor(private httpClient: HttpClient) { }

    public loginService(usuario: Usuario): Observable<UsuarioInterface> {
        const dados = new FormData();
        dados.append('email', usuario.email);
        dados.append('password', usuario.password);

        return this.httpClient
            .post<UsuarioInterface>(this.url + this.login, dados, { withCredentials: false })
            .pipe(mergeMap(data => {
                return of(data);
            }));
    }

    public registrarService(usuario: Usuario): Observable<any> {
        const dados = new FormData();
        dados.append('nome', usuario.nome);
        dados.append('email', usuario.email);
        dados.append('password', usuario.password);

        return this.httpClient.post<any>( this.url + this.registro, dados, { withCredentials: false })
            .pipe(mergeMap(data => {
                return of(data);
            }));
    }
}
