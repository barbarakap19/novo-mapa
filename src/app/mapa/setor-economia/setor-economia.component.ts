import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MapaService } from '../mapa.service';
import { SetorEconomia, MapaFiltro } from '../model';
import { ToastyService } from '../../../../node_modules/ng2-toasty';

@Component({
  selector: 'app-setor-economia',
  templateUrl: './setor-economia.component.html',
  styleUrls: ['./setor-economia.component.css']
})
export class SetorEconomiaComponent implements OnInit {

  laboratorios = [];

  @Output() public carregarLabporatorioMarcado: EventEmitter<any> = new EventEmitter<any>();

  mapaFiltro: MapaFiltro = new MapaFiltro();

  secaos: SetorEconomia[] = [];
  divisaos: SetorEconomia[] = [];
  grupos: SetorEconomia[] = [];
  classes: SetorEconomia[] = [];
  subClasses: SetorEconomia[] = [];

  id: any;
  idSecao: any;
  idDivisao: any;
  idGrupo: any;
  idClasse: any;
  idSubClasse: any;

  constructor(
    private mapaService: MapaService,
    private toasty: ToastyService,
  ) { }

  ngOnInit() {
    this.listarSuperSertorEconomia();
  }

  private listarSuperSertorEconomia() {
    this.laboratorios = [];
    this.mapaService.findAllSuperSertorEconomia()
      .then(secaos => {
        this.secaos = secaos;
      });
  }

  public findDivisao(event) {
    this.laboratorios = [];
    this.divisaos = [];

    if (event) {
      this.id = event;
      this.mapaService.findAllSubSertorEconomia(this.id)
        .then(divisaos => {
          this.divisaos = divisaos;
          this.grupos = [];
          this.classes = [];
          this.subClasses = [];
          this.idGrupo = null;
          this.idClasse = null;
          this.idSubClasse = null;
        });

    } else {
      this.limparBuscar();
    }
  }

  public findGrupos(event) {
    this.laboratorios = [];
    this.grupos = [];
    if (event) {
      this.id = event;
      this.mapaService.findAllSubSertorEconomia(event)
        .then(grupos => {
          this.grupos = grupos;
          this.classes = [];
          this.subClasses = [];
          this.idClasse = null;
          this.idSubClasse = null;
        });
    } else {
      this.grupos = [];
      this.classes = [];
      this.subClasses = [];
      this.idGrupo = null;
      this.idClasse = null;
      this.idSubClasse = null;
    }
  }

  public findClasses(event) {
    this.laboratorios = [];
    this.classes = [];
    if (event) {
      this.id = event;
      this.mapaService.findAllSubSertorEconomia(event)
        .then(classes => {
          this.classes = classes;
          this.subClasses = [];
          this.idSubClasse = null;
        });
    } else {
      this.classes = [];
      this.subClasses = [];
      this.idClasse = null;
      this.idSubClasse = null;
    }
  }

  public findSubclasse(event) {
    this.laboratorios = [];
    this.subClasses = [];
    if (event) {
      this.id = event;
      this.mapaService.findAllSubSertorEconomia(event)
        .then(subClasses => {
          this.subClasses = subClasses;
        });
    } else {
      this.subClasses = [];
      this.idSubClasse = null;
    }
  }

  public findIdBusca(event) {
    this.laboratorios = [];
    if (event) {
      this.id = event;
    }
  }

  buscarLaboratorios() {
    this.laboratorios = [];
    this.mapaFiltro.idSetorEconomia = this.id;
    this.mapaFiltro.parametro = null;
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

  limparBuscar() {
    this.laboratorios = [];
    this.secaos = [];
    this.divisaos = [];
    this.grupos = [];
    this.classes = [];
    this.subClasses = [];
    this.limparIds();
    this.listarSuperSertorEconomia();
  }

  private limparIds() {
    this.id = null;
    this.idSecao = null;
    this.idDivisao = null;
    this.idGrupo = null;
    this.idClasse = null;
    this.idSubClasse = null;
  }

  public selecionarLaboratorio(laboratorio: any) {
    this.carregarLabporatorioMarcado.emit(laboratorio);
  }

}
