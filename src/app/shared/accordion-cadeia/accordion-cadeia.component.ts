import { Component, OnInit, Input } from '@angular/core';
import { CadeiaProdutiva } from '../../mapa/model';

@Component({
  selector: 'app-accordion-cadeia',
  templateUrl: './accordion-cadeia.component.html',
  styleUrls: ['./accordion-cadeia.component.css']
})
export class AccordionCadeiaComponent implements OnInit {

  @Input() cadeiasProdutivas: CadeiaProdutiva[] = [];

  constructor() { }

  ngOnInit() {
  }

}
