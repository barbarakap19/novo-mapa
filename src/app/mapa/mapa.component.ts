import { Component, OnInit } from '@angular/core';
import { MapaService, Mapa, MapaFiltro } from './mapa.service';
import { FormGroup, NgForm } from '../../../node_modules/@angular/forms';

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
  zoom: number = 14;

  mapa: Mapa;

  mapaFiltro: MapaFiltro;

  markers: marker[] = [];

  constructor(
    private mapaService: MapaService
  ) {}

  ngOnInit() {
    //console.log(this.markers);
    this.carregarLabs();
    this.mapaFiltro = new MapaFiltro();

  }

  private carregarLabs(): void {
    this.mapaService.findAll()
      .then(labs => {
        console.log(labs);
        labs.laboratorios.forEach(lab => {
          let maker: marker = { name: lab.nome, sigla: lab.sigla, logradouro: lab.logradouro, cidade: lab.cidadeNome, telefones: lab.telefones[0], website: lab.website, lat: Number(lab.latitude), lng: Number(lab.longitude), draggable: true }

          // this.maker.name = lab.nome;
          // this.maker.lat = lab.latitude;
          // this.maker.lng = lab.longitude;
          // this.maker.draggable = true;

          this.markers.push(maker);
          //maker = null;
        });

      })

    console.log(this.markers);

  }

  public findLaboratorio(mapaform: NgForm) {
  this.mapaService.findAllParameter(this.mapaFiltro)
  .then((mapa) => this.mapa = mapa);
  console.log(this.mapa);
  
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
