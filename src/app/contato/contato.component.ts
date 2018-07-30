import { Component, OnInit, Input } from '@angular/core';
import { MapaService } from '../mapa/mapa.service';
import { Contato } from '../mapa/model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  // contato: Contato = new Contato();

  @Input() laboratorio: any;

  formulario: FormGroup;

  constructor(
    private mapaService: MapaService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form();
  }

  public onSubmit(formulario: FormGroup) {
    this.mapaService.sendEmailContato(formulario)
      .then(response => {
        this.formulario.reset({laboratorioSelecionado: this.laboratorio.nome, laboratorio: this.laboratorio.nome });
      });

  }

  private form() {
    this.formulario = this.fb.group({
      'nome': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'assunto': new FormControl('', Validators.required),
      'menssagem': new FormControl('', Validators.required),
      'laboratorio': new FormControl(this.laboratorio.nome),
      'laboratorioSelecionado': new FormControl({value: `${this.laboratorio.nome}`, disabled: true})
    });
  }
}
