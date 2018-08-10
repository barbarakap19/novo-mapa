import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CadeiaProdutiva, MapaFiltro } from '../../mapa/model';
import { MapaService } from '../../mapa/mapa.service';

@Component({
  selector: 'app-accordion-cadeia',
  templateUrl: './cadeia-produtiva.component.html',
  styleUrls: ['./cadeia-produtiva.component.css']
})
export class CadeiaProdutivaComponent implements OnInit {

  cadeiasProdutivas: CadeiaProdutiva[] = [];

  @Output() public carregarLabporatorioMarcado: EventEmitter<any> = new EventEmitter<any>();

  laboratorios = [];

  idSelecionado = '';

  mapaFiltro = new MapaFiltro();

  constructor(
    private mapaService: MapaService,

  ) { }

  ngOnInit() {
    this.CarregarCadeiasProdutivas();
  }

  private CarregarCadeiasProdutivas(): void {

    this.mapaService.findCadeiasProdutivas()
      .then(cadeias => {
        this.cadeiasProdutivas = cadeias;
        console.log(this.cadeiasProdutivas);
      });

  }

  public selecionarLaboratorio(laboratorio: any) {
    console.log(laboratorio);
    this.carregarLabporatorioMarcado.emit(laboratorio);
  }
}
