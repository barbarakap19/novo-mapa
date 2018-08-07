import { Component, OnInit, Input } from '@angular/core';
import { CadeiaProdutiva, MapaFiltro } from '../../mapa/model';
import { MapaService } from '../../mapa/mapa.service';

@Component({
  selector: 'app-accordion-cadeia',
  templateUrl: './accordion-cadeia.component.html',
  styleUrls: ['./accordion-cadeia.component.css']
})
export class AccordionCadeiaComponent implements OnInit {

  @Input() cadeiasProdutivas: CadeiaProdutiva[] = [];

  laboratorios = [];

  idSelecionado: string;

  mapaFiltro = new MapaFiltro();

  constructor(
    private mapaService: MapaService,

  ) { }

  ngOnInit() {
  }
  public carregarLaboratorio(id: any) {
    this.idSelecionado = id;
    console.log(id);
    this.mapaFiltro.idCadeiaProdutiva = id;
    this.mapaFiltro.parametro = null;
    this.mapaService.findAllBuscaAvancada(this.mapaFiltro)
      .then(mapa => {
        this.laboratorios = mapa.laboratorios;
      });
  }
}
