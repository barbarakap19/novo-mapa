import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MapaService } from '../mapa.service';
import { AreaConhecimento, MapaFiltro } from '../model';
import { ToastyService } from '../../../../node_modules/ng2-toasty';

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

  @Output() public carregarLabporatorioMarcado: EventEmitter<any> = new EventEmitter<any>();

  area: any;

  subArea: any;

  constructor(
    private mapaService: MapaService,
    private toasty: ToastyService,
  ) { }

  ngOnInit() {
    this.findAreasConhecimentos();
  }

  private findAreasConhecimentos() {
    this.mapaService.findAreasConhecimento()
      .then(grandeAreas => {
        this.areaConhecimentos = grandeAreas;
      });
  }

  public findSubAreaConhecimento(event) {
    this.subAreaConhecimentos = [];
    this.laboratorios = [];
    this.subArea = null;
    if (event) {
      this.mapaService.findAllSubAreasConhecimento(event)
        .then(subArea => {
          this.subAreaConhecimentos = subArea;
        });
    } else {
      return null;
    }
  }

  public findLimparLaboratorios(event) {
    this.laboratorios = [];
    this.subArea = event;
  }

  public buscarLaboratorios() {
    this.laboratorios = [];
    if (this.subArea) {
      this.mapaFiltro.idSubAreaConhecimento = this.subArea;
      this.mapaFiltro.idAreaConhecimento = null;
    } else {
      this.mapaFiltro.idAreaConhecimento = this.area;
      this.mapaFiltro.idSubAreaConhecimento = null;
    }

    this.mapaService.findAllBuscaAvancada(this.mapaFiltro)
      .then(mapa => {
        if (mapa.laboratorios.length) {
          this.laboratorios = mapa.laboratorios;
        } else {
          this.toasty.info({
            title: 'Atenção!',
            msg: `Não foi encontrado nenhum labotatório!`
          });
        }
      });

  }

  public selecionarLaboratorio(laboratorio: any) {
    this.carregarLabporatorioMarcado.emit(laboratorio);
  }

  limparBuscar() {
    this.subAreaConhecimentos = [];
    this.laboratorios = [];
    this.area = null;
    this.subArea = null;
  }

}
