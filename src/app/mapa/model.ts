export class MapaFiltro {
    parametro: string;
}

export interface Mapa {
    laboratorios: any[],
    laboratorios_nome: any[],
    laboratorios_sigla: any[],
    laboratorios_descricao: any[],
    servicos: any[],
    instituicaos: any[],
    pesquisadores: any[],
    cidades: any[];
}

export class LaboratorioSelecionado {
    nome: string;
    sigla: string;
    cidadeNome:string;
    estadoNome: string;
    telefones:any[];
    website:string;
    logradouro:string;
    bairro: string;
    descricao: string;
    latitude: number;
    longitude: number;
    instituicaoNome: string;
    nomePesquisador: string;
    emailPesquisador: string;
    servicos: Servico[];
    constructor() {
        
    }
}

export class Servico {
    nome: string;
    descricao: string;

    constructor() {

    }
}

export class cidadeMapa {
    nome: string;
    laboratorios: any[];

    constructor() {
        
    }
}

export class LabsIconnects {
    ultima_atualizacao: Date;
    lines: any[] = [];

    constructor() {

    }
}