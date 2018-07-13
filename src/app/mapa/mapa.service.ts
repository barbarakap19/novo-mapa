import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Http, URLSearchParams } from '@angular/http';

// import 'rxjs/add/operator/toPromise';

export interface MapaFiltro {
  parametro: string;
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
  findAllParameter(filtro: MapaFiltro):Promise<any>{

    const params = new URLSearchParams();
    // const headers = new Headers();

    //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    
    if (filtro.parametro) {
      params.set('nome', filtro.parametro);
    }

    return this.http.get(`${this.resourceUrl}`,
    { search: params })
    .toPromise()
    .then(res => res.json() as any)
  }
  
  }
  
export class Laboratorio {
  nome: string;
  sigla: string;
  logradouro: string;
  cidadeNome: string;
  telefones: string;
  website:string;
  latitude: number;
  longitude: number;
}

export class Instituicao {
  nome: string;
  sigla: string;
  website:string;
  descricao:string;
  status:string;
  cidadeNome: string;
  
}

export class Servicos {
  nome: string;
  descricao: string;
  status: string;
  tipoServico: string;
  laboratorio: string;
  setoresEconomicos:string;
  
}

export class Pesquisadores {
  codigo: string;
  cpf: string;
  idCNPQ: string;
  dataSincronizacao: string;
  titulacao: string;
  atuacao:string;
  user: string;
  
}
