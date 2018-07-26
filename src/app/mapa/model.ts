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
    cidade:string;
    telefones:string;
    website:string;
    logradouro:string;
    latitude: number;
    longitude: number;
    constructor() {
        
    }
}

export class cidadeMapa {
    nome: string;
    laboratorios: any[];

    constructor() {
        
    }
}