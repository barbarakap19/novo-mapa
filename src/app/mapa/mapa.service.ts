import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { MapaFiltro, Mapa } from './model';

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
    this.resourceIconnectUrl = environment.baseIconnectUrl;
  }

  findAll(): Promise<any> {
    return this.http.get(`${this.resourceUrl}/laboratorios`, )
      .toPromise()
      .then(res => res.json() as any)
    //.catch(this.handleError);
  }

  findAllIconnect(): Promise<any> {
    return this.http.get(`${this.resourceIconnectUrl}/laboratorios/getall`, { headers: this.headers })
      .toPromise()
      .then(res => res.json() as any)
    //.catch(this.handleError);
  }

  //Busca de laboratorios
  findAllParameter(filtro: MapaFiltro): Promise<any> {

    const params = new URLSearchParams();
    // const headers = new Headers();
    //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if (filtro.parametro) {
      params.set('parametro', filtro.parametro);
    }

    return this.http.get(`${this.resourceUrl}`,
      { search: params })
      .toPromise()
      .then(res => {
        const mapa = res.json() as Mapa
        console.log(mapa);
        
        return mapa
      })
  }

}



