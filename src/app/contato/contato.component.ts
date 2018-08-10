import { Component, OnInit, Input } from '@angular/core';
import { MapaService } from '../mapa/mapa.service';
import { ToastyService } from 'ng2-toasty';
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

  loading: boolean;

  constructor(
    private mapaService: MapaService,
    private toasty: ToastyService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.form();
  }

  public onSubmit(formulario: FormGroup) {
    this.loading = true;
    this.mapaService.sendEmailContato(formulario)
      .then(response => {

        this.loading = false;
        this.toasty.success({
          title: 'O contato foi enviado com Sucesso',
          msg: `<p>Obrigado pelo contato!</p>`
        });

        this.formulario.reset({
          laboratorioSelecionado: this.laboratorio.nome,
          laboratorio: this.laboratorio.nome,
          emails: this.laboratorio.emails,
          emailCoordenador: this.laboratorio.emailPesquisador
        });
      })
      .catch(erro => {
        console.log(`Erro ao enviar email`, erro);
        this.loading = false;
        this.toasty.error({
          title: 'Erro ao enviar o contato',
          msg: `<p>Por Favor tente mais tarde!</p>`
        });
      });

  }

  private form() {
    this.formulario = this.fb.group({
      'nome': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'assunto': new FormControl('', Validators.required),
      'menssagem': new FormControl('', Validators.required),
      'laboratorio': new FormControl(this.laboratorio.nome),
      'emails': new FormControl(this.laboratorio.emails),
      'captcha': new FormControl('', Validators.required),
      'emailCoordenador': new FormControl(this.laboratorio.emailPesquisador),
      'laboratorioSelecionado': new FormControl({ value: `${this.laboratorio.nome}`, disabled: true })
    });
  }
}
