import { Component, OnInit } from '@angular/core';
import { MapaService } from './mapa.service';

import { LaboratorioSelecionado, Mapa, MapaFiltro, LabsIconnects, Servico, Laboratorio } from './model';

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

  markers: marker[] = [];

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

  openWin: boolean;

  constructor(
    private mapaService: MapaService
  ) { }

  ngOnInit() {
    this.carregarLabs();
    this.mapaFiltro = new MapaFiltro();

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

    } else { return null; }

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

    if (this.labsIconnects) {
      // this.labsIconnects = mapa.labsIconnects.lines;
      this.labsIconnects.lines.forEach(lab => {

        this.markers.push(this.carregarMaker(lab));
        // maker = null;
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

    this.zoom = 6;

    this.openWin = true;

  }

  public mostrarInformacao(lab: LaboratorioSelecionado) {
    this.laboratorioSelecionado = lab;
    console.log(this.laboratorioSelecionado);

  }

  private carregarMakerIsOpen(lab): marker {
    const maker: marker = {
      nome: lab.nome,
      sigla: lab.sigla,
      descricao: lab.descricao,
      logradouro: lab.logradouro,
      cidade: lab.cidadeNome,
      estado: lab.estadoNome,
      telefones: lab.telefones,
      website: lab.website,
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

    return maker;

  }

  private carregarMaker(lab): marker {
    const maker: marker = {
      nome: lab.nome,
      sigla: lab.sigla,
      descricao: lab.descricao,
      logradouro: lab.logradouro,
      cidade: lab.cidadeNome,
      estado: lab.estadoNome,
      telefones: lab.telefones,
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

    return maker;

  }

  get totalLaboratorios(): number {
    return this.laboratorios.length + this.laboratorios_nome.length + this.laboratorios_sigla.length + this.laboratorios_descricao.length;
  }

  get totalLaboratoriosPesquisados(): number {
    return this.laboratorios_nome.length + this.laboratorios_sigla.length + this.laboratorios_descricao.length;
  }

}

// Marker Type
interface marker {
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
  instituicaoNome: string;
  nomePesquisador: string;
  emailPesquisador: string;
  servicos: Servico[];
}
