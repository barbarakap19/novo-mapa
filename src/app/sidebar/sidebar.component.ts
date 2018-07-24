import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Mapa, MapaFiltro } from '../mapa/mapa.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges {

  @Input() mapa: Mapa;

  mapaFiltro: MapaFiltro = new MapaFiltro();

  laboratorios = [];
  instituicaos = [];
  servicos = [];
  pesquisadores = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges () {
    if (this.mapa) {
      console.log(this.mapa);
      this.laboratorios = this.mapa.laboratorios;
      
    }
    
  }

  findLaboratorio() {
    
  }

  get totalLaboratorios(): number {
    return this.laboratorios.length
  }

}
