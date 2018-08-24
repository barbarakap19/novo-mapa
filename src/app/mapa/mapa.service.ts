import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { MapaFiltro, Mapa, Contato, CadeiaProdutiva, SetorEconomia, AreaConhecimento } from './model';

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
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', 'Origin, X-Request-Width, Accept');
  }

  findAll(): Promise<any> {
    return this.http.get(`${this.resourceUrl}/laboratorios`)
      .toPromise()
      .then(res => res.json() as any)
      .catch();
  }

  findAllIconnect(): Promise<any> {
    // return this.http.get(`${this.resourceIconnectUrl}/laboratorios/getall`, { headers: this.headers })
     return this.http.get(`${environment.baseIconnectUrlLocal}`)
      .toPromise()
      .then(res => {
        const labIconnect = res.json() as any;
        console.log(labIconnect);
        return labIconnect;
      })
      .catch((err) => console.log('Erro acessar Inconnect', err));
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

  findAllBuscaAvancada(filtro: MapaFiltro): Promise<Mapa> {

    const params = new URLSearchParams();
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if (filtro.parametro) {
      params.set('parametro', filtro.parametro);
    }

    if (filtro.idSetorEconomia) {
      params.set('idSetorEconomia', filtro.idSetorEconomia);
    }

    if (filtro.idAreaConhecimento) {
      params.set('idAreaConhecimento', filtro.idAreaConhecimento);
    }

    if (filtro.idSubAreaConhecimento) {
      params.set('idSubAreaConhecimento', filtro.idSubAreaConhecimento);
    }

    return this.http.get(`${this.resourceUrl}/buscaAvancada`,
      { search: params })
      .toPromise()
      .then(res => {
        const mapa = res.json() as Mapa;
        // console.log(mapa);
        return mapa;
      });
  }

  findCadeiasProdutivas(): Promise<CadeiaProdutiva[]> {
    return this.http.get(`${this.resourceUrl}/cadeiaprodutiva`)
      .toPromise()
      .then(res => {
        const cadeia = res.json() as CadeiaProdutiva[];
        return cadeia;
      });
    // .catch(this.handleError);
  }

  findAreasConhecimento(): Promise<AreaConhecimento[]> {
    return this.http.get(`${this.resourceUrl}/grandeareaconhecimento`)
      .toPromise()
      .then(res => {
        const areaConhecimento = res.json() as AreaConhecimento[];
        return areaConhecimento;
      })
    .catch();
  }

  findAllSubAreasConhecimento(id: number): Promise<AreaConhecimento[]> {
    return this.http.get(`${this.resourceUrl}/subareaconhecimento/${id}`)
      .toPromise()
      .then(res => {
        const subArea = res.json() as AreaConhecimento[];
        return subArea;
      });
    // .catch(this.handleError);
  }

  findAllSuperSertorEconomia(): Promise<SetorEconomia[]> {
    return this.http.get(`${this.resourceUrl}/superSetorEconomia`)
      .toPromise()
      .then(res => {
        const superSE = res.json() as SetorEconomia[];
        return superSE;
      })
     .catch();
  }

  findAllSubSertorEconomia(id: number): Promise<SetorEconomia[]> {
    return this.http.get(`${this.resourceUrl}/subSetorEconomia/${id}`)
      .toPromise()
      .then(res => {
        const subSE = res.json() as SetorEconomia[];
        return subSE;
      })
     .catch();
  }

  sendEmailContato(contato: any): Promise<any> {
    console.log(contato);
    return this.http.post(`${this.resourceUrl}/contato`, contato)
      .toPromise()
      .then(response => {
        const contatoEnviado = response.json() as Contato;
        return contatoEnviado;
      })
      .catch(erro => {
        Promise.reject(`Erro ao enviar email`);
      });
  }

}



