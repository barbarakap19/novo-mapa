import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Http, URLSearchParams } from '@angular/http';

// import 'rxjs/add/operator/toPromise';

export class MapaFiltro {
  parametro: string;
}

export interface Mapa {
  laboratorios: any,
  servicos: any,
  instituicoes: any,
  pesquisadores: any,
}

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  private resourceUrl;

  constructor(private http: Http) {
    this.resourceUrl = `${environment.baseUrl}/api/mapa`
  }

  findAll(): Promise<any> {
    return this.http.get(`${this.resourceUrl}/laboratorios`)
      .toPromise()
      .then(res => res.json() as any)
    //.catch(this.handleError);
  }

  //Busca de laboratorios
  findAllParameter(filtro: MapaFiltro): Promise<any> {

    console.log(filtro);
    

    const params = new URLSearchParams();
    // const headers = new Headers();
    //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if (filtro.parametro) {
      params.set('parametro', filtro.parametro);
    }

    return this.http.get(`${this.resourceUrl}`,
      { search: params })
      .toPromise()
      .then(res => res.json() as Mapa)
  }

}




