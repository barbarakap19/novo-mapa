export class MapaFiltro {
    parametro: string;
    idSetorEconomia: string;
    idAreaConhecimento: string;
    idSubAreaConhecimento: string;
}

export interface Mapa {
    laboratorios: any[];
    laboratorios_nome: any[];
    laboratorios_sigla: any[];
    laboratorios_descricao: any[];
    servicos: Servico[];
    instituicaos: any[];
    pesquisadores: any[];
    cidades: any[];
    cadeiasProdutivas: any[];
}

export class LaboratorioSelecionado {
    nome: string;
    sigla: string;
    cidadeNome: string;
    estadoNome: string;
    telefones: any[];
    emails: any[];
    website: string;
    logradouro: string;
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

export class Laboratorio {
    nome: string;
    sigla: string;
    cidadeNome: string;
    estadoNome: string;
    telefones: any[];
    emails: any[];
    website: string;
    logradouro: string;
    bairro: string;
    descricao: string;
    latitude: number;
    longitude: number;
    instituicaoNome: string;
    nomePesquisador: string;
    emailPesquisador: string;
    constructor() {
    }
}

export class Servico {
    nome: string;
    descricao: string;
    laboratorioDTO: Laboratorio;
    laboratorioId: number;
    constructor() {

    }
}

export class CidadeMapa {
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

export class Contato {
    laboratorio: string;
    nome: string;
    email: string;
    assunto: string;
    emailCoordenador: string;
    menssagem: string;
    emails: any[];

    constructor() {
    }
}

export class CadeiaProdutiva {
    id: number;
    nome: string;
    descricao: string;
    img: string;
    laboratorios: Laboratorio[] = [];
    constructor() {
    }
}

export class SetorEconomia {
    id: number;
    codCNAE: string;
    nome: string;
    constructor() {
    }
}

export class AreaConhecimento {
    id: number;
    nome: string;
    constructor() {
    }
}

