import { Component, OnInit } from '@angular/core';
import { MapaService, Mapa, MapaFiltro } from './mapa.service';

import { LaboratorioSelecionado } from './model';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  //Posicao Inicial
  lat: number = -3.082571;
  lng: number = -52.298043;
  // zoom 
  zoom: number = 6;

  mapa: Mapa;

  mapaFiltro: MapaFiltro;

  label: string;

  markers: marker[] = [];

  laboratorios = [];
  laboratorios_nome = [];
  laboratorios_sigla = [];
  laboratorios_descricao = [];
  instituicaos = [];
  servicos = [];
  pesquisadores = [];
  labsIconnects = [];

  laboratorioSelecionado: LaboratorioSelecionado = new LaboratorioSelecionado();

  openWin: boolean;

  constructor(
    private mapaService: MapaService
  ) { }

  ngOnInit() {
    
    this.carregarLabs();
    this.mapaFiltro = new MapaFiltro();

  }

  private carregarLabs(): void {
    this.mapaService.findAll()
      .then(mapa => {
        console.log("Mapa",mapa);
        
        this.mapa = mapa;
        this.laboratorios = mapa.laboratorios;
        
        /**
         * ICONNECT
         */
        /* this.mapaService.findAllIconnect()
        .then(labsIconnects => {
          console.log(labsIconnects);
          
          this.labsIconnects = labsIconnects;
        }) */

        this.carregarLaboratorios(this.laboratorios);
      })

  }

  public findLaboratorio() {

    this.mapaService.findAllParameter(this.mapaFiltro)
      .then(mapa => {
        //this.mapa = mapa;

        this.laboratorios = mapa.laboratorios;
        this.laboratorios_nome = mapa.laboratorios_nome;
        this.laboratorios_sigla = mapa.laboratorios_sigla;
        this.laboratorios_descricao = mapa.laboratorios_descricao;
        this.servicos = mapa.servicos;
        this.instituicaos = mapa.instituicaos;
        this.pesquisadores = mapa.pesquisadores;

        this.markers = [];

        this.carregarLaboratorios(this.laboratorios, this.laboratorios_nome, this.laboratorios_sigla, this.laboratorios_descricao);

      })

  }

  private carregarLaboratorios(
      laboratorios = [], 
      laboratorios_nome = [], 
      laboratorios_sigla = [], 
      laboratorios_descricao = []
    ) {
    this.markers = [];
    
    if (laboratorios) {
      laboratorios.forEach(lab => {
        let maker: marker = { name: lab.nome, sigla: lab.sigla, logradouro: lab.logradouro, cidade: lab.cidadeNome, telefones: lab.telefones[0], website: lab.website, lat: Number(lab.latitude), lng: Number(lab.longitude), draggable: true }

        this.markers.push(maker);
        //maker = null;
      });
    }

    if (laboratorios_nome) {
      laboratorios_nome.forEach(lab => {
        let maker: marker = { name: lab.nome, sigla: lab.sigla, logradouro: lab.logradouro, cidade: lab.cidadeNome, telefones: lab.telefones[0], website: lab.website, lat: Number(lab.latitude), lng: Number(lab.longitude), draggable: true }

        this.markers.push(maker);
        //maker = null;
      });
    }

    if (laboratorios_sigla) {
      laboratorios_sigla.forEach(lab => {
        let maker: marker = { name: lab.nome, sigla: lab.sigla, logradouro: lab.logradouro, cidade: lab.cidadeNome, telefones: lab.telefones[0], website: lab.website, lat: Number(lab.latitude), lng: Number(lab.longitude), draggable: true }

        this.markers.push(maker);
        //maker = null;
      });
    }

    if (laboratorios_descricao) {
      laboratorios_descricao.forEach(lab => {
        let maker: marker = { name: lab.nome, sigla: lab.sigla, logradouro: lab.logradouro, cidade: lab.cidadeNome, telefones: lab.telefones[0], website: lab.website, lat: Number(lab.latitude), lng: Number(lab.longitude), draggable: true }

        this.markers.push(maker);
        //maker = null;
      });
    }

    if (this.labsIconnects) {
      laboratorios_descricao.forEach(lab => {
        let maker: marker = { name: lab.nome, sigla: lab.sigla, logradouro: lab.logradouro, cidade: lab.cidadeNome, telefones: lab.telefones[0], website: lab.website, lat: Number(lab.latitude), lng: Number(lab.longitude), draggable: true }

        this.markers.push(maker);
        //maker = null;
      });
    }
  }

  public selecionarLaboratorio(laboratorio: LaboratorioSelecionado) {

    this.lat = laboratorio.latitude;
    this.lng = laboratorio.longitude;

    console.log(laboratorio);

    this.laboratorioSelecionado = new LaboratorioSelecionado();
    
    this.openWin = false;

    this.laboratorioSelecionado = laboratorio;

    this.zoom = 8;
   
    this.openWin = true;

  }

  get totalLaboratorios(): number {
    return this.laboratorios.length + this.laboratorios_nome.length + this.laboratorios_sigla.length + this.laboratorios_descricao.length;
  }

  get totalLaboratoriosPesquisados(): number {
    return this.laboratorios_nome.length + this.laboratorios_sigla.length + this.laboratorios_descricao.length;
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
