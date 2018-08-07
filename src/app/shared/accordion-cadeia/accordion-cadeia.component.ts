import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CadeiaProdutiva, MapaFiltro } from '../../mapa/model';
import { MapaService } from '../../mapa/mapa.service';

@Component({
  selector: 'app-accordion-cadeia',
  templateUrl: './accordion-cadeia.component.html',
  styleUrls: ['./accordion-cadeia.component.css']
})
export class AccordionCadeiaComponent implements OnInit {

  @Input() cadeiasProdutivas: CadeiaProdutiva[] = [];

  @Output() public carregarLabporatorioMarcado: EventEmitter<any> = new EventEmitter<any>();

  laboratorios = [];

  idSelecionado = '';

  mapaFiltro = new MapaFiltro();

  constructor(
    private mapaService: MapaService,

  ) { }

  ngOnInit() {
  }
  public carregarLaboratorio(id: any) {
    //
    console.log(id);
    console.log(this.idSelecionado);
    if (this.idSelecionado !== id) {
      this.mapaFiltro.idCadeiaProdutiva = id;
      this.mapaFiltro.parametro = null;
      this.mapaService.findAllBuscaAvancada(this.mapaFiltro)
        .then(mapa => {
          this.laboratorios = mapa.laboratorios;
          this.idSelecionado = id;
        });
    } else { null; }
  }

  public selecionarLaboratorio(laboratorio: any) {
    console.log(laboratorio);
    this.carregarLabporatorioMarcado.emit(laboratorio);
  }
}
