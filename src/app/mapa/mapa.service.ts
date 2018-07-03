import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

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
