import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Http, URLSearchParams } from '@angular/http';

// import 'rxjs/add/operator/toPromise';

export interface InstituicaoFiltro {
  nome: string;
}

export interface LaboratorioFiltro {
  nome: string;
}

export interface ServicoFiltro {
  nome: string;
}

export interface PesquisadorFiltro {
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  
  private resourceUrl;

  constructor(private http: Http) {
    this.resourceUrl = `${environment.baseUrl}/api/laboratorios/all`
   }

  findAll(): Promise<Laboratorio[]> {
    return this.http.get(this.resourceUrl)
      .toPromise()
      .then(res => res.json() as Laboratorio[])
      //.catch(this.handleError);
  }

  //Busca de laboratorios
  findLaboratorio(filtro: LaboratorioFiltro):Promise<any>{

    const params = new URLSearchParams();
    // const headers = new Headers();

    //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    
    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.resourceUrl}/api/laboratorios/busca`,
    { search: params })
    .toPromise()
    .then(res => res.json() as Laboratorio[])
  }
  //Busca de instituições
  findInstituicao(filtro: InstituicaoFiltro):Promise<any>{

    const params = new URLSearchParams();
    // const headers = new Headers();

    //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    
    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.resourceUrl}/api/instituicaos/busca`,
    { search: params })
    .toPromise()
    .then(res => res.json() as Laboratorio[])
  }

  ////Busca de serviços
  findServicos(filtro: ServicoFiltro):Promise<any>{
    
    const params = new URLSearchParams();
    // const headers = new Headers();

    //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    
    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.resourceUrl}/api/servicos`,
    { search: params })
    .toPromise()
    .then(res => res.json() as Laboratorio[])
  
  }

  //Busca de pesquisadores
  findPesquisadores(filtro: PesquisadorFiltro):Promise<any>{
    const params = new URLSearchParams();
    // const headers = new Headers();

    //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    
    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.resourceUrl}/api/pesquisadors`,
    { search: params })
    .toPromise()
    .then(res => res.json() as Laboratorio[])
  
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
