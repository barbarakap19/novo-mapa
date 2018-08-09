import { Component, OnInit } from '@angular/core';
import { MapaService } from '../mapa.service';
import { AreaConhecimento, MapaFiltro } from '../model';

@Component({
  selector: 'app-area-conhecimento',
  templateUrl: './area-conhecimento.component.html',
  styleUrls: ['./area-conhecimento.component.css']
})
export class AreaConhecimentoComponent implements OnInit {

  areaConhecimentos: AreaConhecimento[] = [];

  subAreaConhecimentos: AreaConhecimento[] = [];

  mapaFiltro = new MapaFiltro();

  laboratorios = [];

  area: any;

  subArea: any;

  constructor(
    private mapaService: MapaService,
  ) { }

  ngOnInit() {
    this.findAreasConhecimentos();
  }

  private findAreasConhecimentos() {
    this.mapaService.findAreasConhecimento()
      .then(grandeAreas => {
        this.areaConhecimentos = grandeAreas;
        console.log(this.areaConhecimentos);
      });
  }

  public findSubAreaConhecimento(event) {
    this.subAreaConhecimentos = [];
    if (event) {
      this.mapaService.findAllSubAreasConhecimento(event)
        .then(subArea => {
          this.subAreaConhecimentos = subArea;
          console.log(this.subAreaConhecimentos);
        });
    } else {
      this.areaConhecimentos = [];
    }
  }

  public buscarLaboratorios() {
    this.mapaFiltro.idAreaConhecimento = (this.subArea) ? this.subArea : this.area;

    this.mapaService.findAllBuscaAvancada(this.mapaFiltro)
      .then(mapa => {
        this.laboratorios = mapa.laboratorios;
        console.log(this.laboratorios);

      });

  }

}
