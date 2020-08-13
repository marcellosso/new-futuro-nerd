import {
    MODIFICA_ESTA_CORRETO,  // # MXTera --
    SALVA_DADOS_FILHO,
    FILHO_ATUALIZA_DADOS_EM_ANDAMENTO,
    MODIFICA_APELIDO,
    FILHO_ATUALIZA_DADOS_OK,
    SALVA_TOTAL_QUESTOES,
    SALVA_QUESTOES_RESPONDIDAS,
    PEGA_QUESTAO_ATUAL,
    MODIFICA_TELA_CADASTRO,
    RECOMECA_TELA,
    SALVA_PRODUTOS_PUXADOS,
    SALVA_PRODUTO_UNICO,
    LIMPAR_PRODUTO_UNICO,
    LISTA_DADOS_AJUDA_PAI,
    RELATORIO_QUESTOES_COMPLETADAS,
    ATIVAR_CONTADOR_FILHO,
    ATUALIZA_PTS_FILHO
    // UPDATE_CONTADOR_FILHO
} from '../actions/Types';

const INITIAL_STATE = {
    produtos: [],
    ajudas: [],

    // Relatorio
    relatorio_questoes_completadas: [],
    contator_ativo: true,

    nomeFilho: null,
    emailFilho: null,
    senhaFilho: null,
    idFilho: null,
    serieFilho: null,
    pts: null,

    // jogo
    estaCorreto: null, // # MXTera --

    total_questoes: null,
    questoes_respondidas: null,

    idQuestao: null,
    tituloQuestaoAtual: null,
    perguntaQuestaoAtual: null,
    imagemQuestaoAtual: null,
    respostaCorreta: null,
    respostaErrada: null,
    respostaErrada1: null,
    respostaErrada2: null,

    // loja
    nomeProdutoAtual: null,
    descricaoProdutoAtual: null,
    fotoProdutoAtual: null,
    idProdutoAtual: null,
    precoProdutoAtual: null,

    loading_atualiza: false,
    loading_cadastra: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SALVA_PRODUTO_UNICO:
            return {
                ...state,
                nomeProdutoAtual: action.payload.nome_produto,
                descricaoProdutoAtual: action.payload.descricao,
                fotoProdutoAtual: action.payload.foto,
                idProdutoAtual: action.payload.id,
                precoProdutoAtual: action.payload.preco
            }
        case LIMPAR_PRODUTO_UNICO:
            return {
                ...state,
                nomeProdutoAtual: '',
                descricaoProdutoAtual: '',
                fotoProdutoAtual: '',
                idProdutoAtual: '',
                precoProdutoAtual: ''
            }
        case SALVA_PRODUTOS_PUXADOS:
            return {
                ...state,
                produtos: action.payload
            }
        case PEGA_QUESTAO_ATUAL:
            return {
                ...state,
                idQuestao: action.payload.id,
                tituloQuestaoAtual: action.payload.titulo,
                perguntaQuestaoAtual: action.payload.questao,
                imagemQuestaoAtual: action.payload.imagem,
                respostaCorreta: action.payload.resposta_correta,
                respostaErrada: action.payload.resposta_errada,
                respostaErrada1: action.payload.resposta_errada1,
                respostaErrada2: action.payload.resposta_errada2,
            }
        case SALVA_QUESTOES_RESPONDIDAS:
            return {
                ...state,
                questoes_respondidas: action.payload
            }
        case SALVA_TOTAL_QUESTOES:
            return {
                ...state,
                total_questoes: action.payload
            }
        case SALVA_DADOS_FILHO:
            return {
                ...state,
                nomeFilho: action.payload.nome,
                emailFilho: action.payload.email,
                senhaFilho: action.payload.senha,
                idFilho: action.payload.id,
                serieFilho: action.payload.id_serie,
                pts: action.payload.pts
            }
        case MODIFICA_ESTA_CORRETO:
            return {...state, estaCorreto: action.payload } // # MXTera --
        case FILHO_ATUALIZA_DADOS_EM_ANDAMENTO:
            return {...state, loading_atualiza: true}
        case FILHO_ATUALIZA_DADOS_OK:
            return {...state, loading_atualiza: false}
        case MODIFICA_APELIDO:
            return {...state, nomeFilho: action.payload}
        case LISTA_DADOS_AJUDA_PAI:
            return {...state, ajudas: action.payload}
        case RELATORIO_QUESTOES_COMPLETADAS:
            return {...state, relatorio_questoes_completadas: action.payload}
        case ATIVAR_CONTADOR_FILHO:
            return {...state, contator_ativo: action.payload}
        case ATUALIZA_PTS_FILHO:
            return {...state, pts: action.payload}
        default:
            return state;
    }
}
