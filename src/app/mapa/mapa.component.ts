import { Component, OnInit } from '@angular/core';
import { MapaService } from './mapa.service';

import { LaboratorioSelecionado, Mapa, MapaFiltro, LabsIconnects, Servico, Laboratorio, CadeiaProdutiva } from './model';
import { ToastyService } from '../../../node_modules/ng2-toasty';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {


  public latitude: number;
  public longitude: number;
  public zoom: number;

  mapa: Mapa;

  mapaFiltro: MapaFiltro;

  label: string;

  markers: Marker[] = [];

  laboratorios = [];
  laboratorios_nome = [];
  laboratorios_sigla = [];
  laboratorios_descricao = [];
  instituicaos = [];
  servicos: Servico[] = [];
  servico: Servico = new Servico();
  pesquisadores = [];
  coordenadores = []; // vinculado a presquisadores.coordenadores
  cidades = [];
  labsIconnects: LabsIconnects = new LabsIconnects();

  laboratorioSelecionado: LaboratorioSelecionado = new LaboratorioSelecionado();

  cadeiasProdutivas: CadeiaProdutiva[] = [];

  openWin: boolean;

  constructor(
    private mapaService: MapaService,
    private toasty: ToastyService,
  ) { }

  ngOnInit() {
    this.carregarLabs();
    this.carregarLabsIconnets();

    console.log(this.markers);
    this.mapaFiltro = new MapaFiltro();
    this.CarregarCadeiasProdutivas();

    // set google maps defaults
    this.zoom = 6;
    this.latitude = -3.082571;
    this.longitude = -52.298043;
  }

  private carregarLabs(): void {
    this.mapaService.findAll()
      .then(mapa => {
        this.mapa = mapa;

        /**
         * ICONNECT
         */
        this.mapaService.findAllIconnect()
          .then(labsIconnects => {
            this.labsIconnects = labsIconnects;
          });

        this.carregarMapa(this.mapa);
      });

  }

  private carregarLabsIconnets() {
    this.mapaService.findAllIconnect()
      .then(labsIconnects => {
        this.labsIconnects = labsIconnects;
        console.log(this.labsIconnects.lines);
        this.labsIconnects.lines.forEach(lab => {
          this.markers.push(this.carregarMakerIcconets(lab));
          // maker = null;
        });
      });
    // this.labsIconnects = mapa.labsIconnects.lines;
  }

  private CarregarCadeiasProdutivas(): void {

    this.mapaService.findCadeiasProdutivas()
      .then(cadeias => {
        console.log(cadeias);

        this.cadeiasProdutivas = cadeias;
      });
  }

  public reloadMapa() {
    this.mapaFiltro = new MapaFiltro();
    this.carregarLabs();
  }

  public findLaboratorio() {
    // this.limparAtributos();

    if (this.mapaFiltro.parametro) {
      this.mapaService.findAllParameter(this.mapaFiltro)
        .then(mapa => {
          this.mapa = mapa;

          this.carregarMapa(this.mapa);

        });

    } else {
      this.toasty.info({
        title: 'ATENÇÃO',
        msg: `<span style="font-size: 13px">Informe um parametro para pesquisa</span></strong>`
      });
      return null;
    }

  }

  public buscaLaboratoriosByCadeias(id: number) {
    
  }

  private carregarMapa(mapa: Mapa) {
    this.markers = [];

    if (mapa.laboratorios) {
      this.laboratorios = [];
      this.laboratorios = mapa.laboratorios;
      this.laboratorios.forEach(lab => {
        this.markers.push(this.carregarMaker(lab));
        // maker = null;
      });
    }

    if (mapa.laboratorios_nome) {
      this.laboratorios_nome = [];
      this.laboratorios_nome = mapa.laboratorios_nome;
      this.laboratorios_nome.forEach(lab => {

        this.markers.push(this.carregarMaker(lab));
        // maker = null;
      });
    }

    if (mapa.laboratorios_sigla) {
      this.laboratorios_sigla = [];
      this.laboratorios_sigla = mapa.laboratorios_sigla;
      this.laboratorios_sigla.forEach(lab => {

        this.markers.push(this.carregarMaker(lab));
        // maker = null;
      });
    }

    if (mapa.laboratorios_descricao) {
      this.laboratorios_descricao = [];
      this.laboratorios_descricao = mapa.laboratorios_descricao;
      this.laboratorios_descricao.forEach(lab => {

        this.markers.push(this.carregarMaker(lab));
        // maker = null;
      });
    }

    if (mapa.pesquisadores) {
      this.pesquisadores = [];
      this.pesquisadores = mapa.pesquisadores;
      this.pesquisadores.forEach(p => {
        if (p.coordenadores) {
          p.coordenadores.forEach(lab => {
            this.markers.push(this.carregarMaker(lab));
          });
        }
      });
    }

    if (mapa.instituicaos) {
      this.instituicaos = [];
      this.instituicaos = mapa.instituicaos;
      this.instituicaos.forEach(i => {
        if (i.laboratorios) {
          i.laboratorios.forEach(lab => {

            this.markers.push(this.carregarMaker(lab));
          });
        }
      });
    }

    if (mapa.servicos) {
      this.servicos = [];
      // this.servicos = mapa.servicos;
      this.servicos = mapa.servicos;
      this.servicos.forEach(s => {
        this.markers.push(this.carregarMaker(s.laboratorioDTO));
      });
    }

    if (mapa.cidades) {
      this.cidades = [];
      this.cidades = mapa.cidades;
      this.cidades.forEach(c => {
        c.laboratorios.forEach(lab => {

          this.markers.push(this.carregarMaker(lab));
        });
      });
    }
  }

  public selecionarLaboratorio(laboratorio: LaboratorioSelecionado) {
    // console.log("Laboratorio Selecionado",laboratorio);

    // this.laboratorioSelecionado = new LaboratorioSelecionado();

    // this.openWin = false;
    console.log(laboratorio);

    this.laboratorioSelecionado = laboratorio;

    this.markers.push(this.carregarMakerIsOpen(laboratorio));

    this.zoom = 14;

    this.openWin = true;

  }

  public mostrarInformacao(lab: LaboratorioSelecionado) {
    this.laboratorioSelecionado = lab;
    console.log(this.laboratorioSelecionado);

  }

  private carregarMakerIsOpen(lab): Marker {
    const marker: Marker = {
      nome: lab.nome,
      sigla: lab.sigla,
      descricao: lab.descricao,
      logradouro: lab.logradouro,
      cidade: lab.cidadeNome,
      estado: lab.estadoNome,
      telefones: lab.telefones,
      website: lab.website,
      emails: this.carregarEmaisLaboratorio(lab.emails),
      bairro: lab.bairro,
      instituicaoNome: lab.instituicaoNome,
      nomePesquisador: lab.nomePesquisador,
      emailPesquisador: lab.emailPesquisador,
      lat: Number(lab.latitude),
      lng: Number(lab.longitude),
      servicos: lab.servicos,
      draggable: true,
      isOpen: true
    };

    return marker;

  }

  private carregarMaker(lab): Marker {
    const marker: Marker = {
      nome: lab.nome,
      sigla: lab.sigla,
      descricao: lab.descricao,
      logradouro: lab.logradouro,
      cidade: lab.cidadeNome,
      estado: lab.estadoNome,
      telefones: lab.telefones,
      emails: this.carregarEmaisLaboratorio(lab.emails),
      website: lab.website,
      bairro: lab.bairro,
      instituicaoNome: lab.instituicaoNome,
      nomePesquisador: lab.nomePesquisador,
      emailPesquisador: lab.emailPesquisador,
      lat: Number(lab.latitude),
      lng: Number(lab.longitude),
      servicos: lab.servicos,
      draggable: true,
      isOpen: false
    };

    return marker;

  }

  private carregarMakerIcconets(lab): Marker {
    const marker: Marker = {
      nome: lab.nome,
      sigla: lab.sigla,
      descricao: lab.descricao,
      logradouro: lab.endereco.rua,
      cidade: lab.endereco.cidade,
      estado: lab.endereco.estado,
      telefones: [{ numero: lab.telefone }],
      emails: this.carregarEmaisLaboratorio(lab.endereco.email),
      website: lab.website,
      bairro: lab.endereco.bairro,
      instituicaoNome: lab.instituicaoNome,
      nomePesquisador: lab.nomePesquisador,
      emailPesquisador: lab.emailPesquisador,
      lat: Number(lab.latitude),
      lng: Number(lab.longitude),
      servicos: lab.servicos,
      draggable: true,
      isOpen: false
    };

    return marker;

  }

  private carregarEmaisLaboratorio(emails: any[]): any[] {
    const mails = [];

    if (!!emails) {
      emails.forEach(email => {
        mails.push(email.endereco);
      });
    }
    return mails;
  }

  get totalLaboratorios(): number {
    return this.laboratorios.length + this.laboratorios_nome.length + this.laboratorios_sigla.length + this.laboratorios_descricao.length;
  }

  get totalLaboratoriosPesquisados(): number {
    return this.laboratorios_nome.length + this.laboratorios_sigla.length + this.laboratorios_descricao.length;
  }
  

}

// Marker Type
interface Marker {
  nome?: string;
  sigla: string;
  logradouro: string;
  cidade: string;
  website: string;
  lat: number;
  lng: number;
  draggable: boolean;
  isOpen: boolean;
  estado: string;
  telefones: any[];
  bairro: string;
  descricao: string;
  emails: any[];
  instituicaoNome: string;
  nomePesquisador: string;
  emailPesquisador: string;
  servicos: Servico[];
}
