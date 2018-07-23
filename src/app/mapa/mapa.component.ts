import { Component, OnInit } from '@angular/core';
import { MapaService, Mapa, MapaFiltro } from './mapa.service';
import { NgForm } from '../../../node_modules/@angular/forms';

import { AgmSnazzyInfoWindow } from '@agm/snazzy-info-window/directives/snazzy-info-window';
import { LaboratorioSelecionado } from './model';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  //Posicao Inicial
  lat: number = -1.455779;
  lng: number = -48.490197;
  // zoom 
  zoom: number = 9;

  mapa: Mapa;

  mapaFiltro: MapaFiltro;

  label: string;

  markers: marker[] = [];

  laboratorios = [];
  instituicaos = [];
  servicos = [];
  pesquisadores = [];

  laboratorioSelecionado: LaboratorioSelecionado = new LaboratorioSelecionado();

  openWin: boolean;

  constructor(
    private mapaService: MapaService
  ) { }

  ngOnInit() {
    //console.log(this.markers);
    this.carregarLabs();
    this.mapaFiltro = new MapaFiltro();

  }

  private carregarLabs(): void {
    this.mapaService.findAll()
      .then(mapa => {
        this.carregarLaboratorios(mapa.laboratorios);
        this.laboratorios = mapa.laboratorios;

      })

  }



  public findLaboratorio() {

    this.mapaService.findAllParameter(this.mapaFiltro)
      .then(mapa => {
        //this.mapa = mapa;

        this.laboratorios = mapa.laboratorios;
        this.servicos = mapa.servicos;
        this.instituicaos = mapa.instituicaos;
        this.pesquisadores = mapa.pesquisadores;

        this.markers = [];

        this.carregarLaboratorios(mapa.laboratorios);

      })

  }

  private carregarLaboratorios(laboratorios: any) {
    this.markers = [];
    laboratorios.forEach(lab => {
      let maker: marker = { name: lab.nome, sigla: lab.sigla, logradouro: lab.logradouro, cidade: lab.cidadeNome, telefones: lab.telefones[0], website: lab.website, lat: Number(lab.latitude), lng: Number(lab.longitude), draggable: true }

      this.markers.push(maker);
      //maker = null;
    });
  }

  public selecionarLaboratorio(laboratorio: LaboratorioSelecionado) {

    this.openWin = false;

    this.laboratorioSelecionado = laboratorio;

    if (this.zoom  == 18) {
      this.zoom = 12
    }

    this.zoom++;

    this.openWin = true;


  }


}


//Marker Type
interface marker {
  name?: string;
  sigla: string;
  logradouro: string;
  cidade: string;
  telefones: string;
  website: string;
  lat: number;
  lng: number;
  draggable: boolean;
}
