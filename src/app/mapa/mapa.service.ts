import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { MapaFiltro, Mapa, Laboratorio, Contato, CadeiaProdutiva } from './model';

// import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})
export class MapaService {

  private resourceUrl;
  private resourceIconnectUrl;

  private headers: Headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });


  constructor(private http: Http) {
    this.resourceUrl = `${environment.baseUrl}/api/mapa`;
    this.resourceIconnectUrl = environment.baseIconnectUrlLocal;
  }

  findAll(): Promise<any> {
    return this.http.get(`${this.resourceUrl}/laboratorios`, )
      .toPromise()
      .then(res => res.json() as any);
    // .catch(this.handleError);
  }


  findCadeiasProdutivas(): Promise<CadeiaProdutiva[]> {
    return this.http.get(`${this.resourceUrl}/cadeiaprodutiva`, )
      .toPromise()
      .then(res => {
        const cadeia = res.json() as CadeiaProdutiva[];
        return cadeia;
      });
    // .catch(this.handleError);
  }

  findAllIconnect(): Promise<any> {
    // return this.http.get(`${this.resourceIconnectUrl}/laboratorios/getall`, { headers: this.headers })
    return this.http.get(`${this.resourceIconnectUrl}`)
      .toPromise()
      .then(res => res.json() as any);
    // .catch(this.handleError);
  }

  // Busca de laboratorios
  findAllParameter(filtro: MapaFiltro): Promise<any> {

    const params = new URLSearchParams();
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if (filtro.parametro) {
      params.set('parametro', filtro.parametro);
    }

    return this.http.get(`${this.resourceUrl}`,
      { search: params })
      .toPromise()
      .then(res => {
        const mapa = res.json() as Mapa;
        console.log(mapa);
        return mapa;
      });
  }

  sendEmailContato(contato: any): Promise<any> {
    return this.http.post(`${this.resourceUrl}/contato`, contato)
      .toPromise()
      .then(response => {
        const contatoEnviado = response.json() as Contato;
        console.log(contato);
        return contatoEnviado;
      })
      .catch(erro => {
        Promise.reject(`Erro ao enviar email`);
      });
  }

}



