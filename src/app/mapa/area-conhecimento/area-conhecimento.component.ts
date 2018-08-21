import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MapaService } from '../mapa.service';
import { AreaConhecimento, MapaFiltro } from '../model';
import { ToastyService } from '../../../../node_modules/ng2-toasty';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
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

  subarea: any;

  loading: boolean;

  // Autocomplete
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  searchSubarea: any;
  searching = false;

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
    const list = [];
    this.subAreaConhecimentos = [];
    this.laboratorios = [];
    this.subarea = null;
    if (event) {
      this.mapaService.findAllSubAreasConhecimento(event)
        .then(subArea => {
          this.subAreaConhecimentos = subArea;
          this.subAreaConhecimentos.forEach(ar => {
            list.push(ar.nome);
          });

          this.searchSubarea = (text$: Observable<string>) => {
            const debouncedText$ = text$.pipe(
              debounceTime(200),
              distinctUntilChanged());
            const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
            const inputFocus$ = this.focus$;

            return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
              map(term => (term === '' ? list
                : list.filter(area => area.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 100)),
            );
          };
        });

    } else {
      return null;
    }
  }

  public findLimparLaboratorios(event) {
    this.laboratorios = [];
    this.subarea = event;
  }

  public buscarLaboratorios() {
    this.loading = true;
    this.laboratorios = [];
    if (this.subarea) {
      this.mapaFiltro.idSubAreaConhecimento = this.subarea;
      this.mapaFiltro.idAreaConhecimento = null;
    } else {
      this.mapaFiltro.idAreaConhecimento = this.area;
      this.mapaFiltro.idSubAreaConhecimento = null;
    }

    this.mapaService.findAllBuscaAvancada(this.mapaFiltro)
      .then(mapa => {
        if (mapa.laboratorios.length) {
          setTimeout(() => {
            this.loading = false;
            this.laboratorios = mapa.laboratorios;
          }, 2000);
        } else {
          setTimeout(() => {
            this.loading = false;
            this.toasty.info({
              title: 'Atenção!',
              msg: `Não foi encontrado nenhum labotatório!`
            });
          }, 2000);
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
    this.subarea = null;
    this.focus$ = new Subject<string>();
    this.click$ = new Subject<string>();
  }

}
