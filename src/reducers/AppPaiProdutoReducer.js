import {
    PAI_PRODUTO_LISTA_DADOS_FILHOS,
    PAI_PRODUTO_ATUALIZA_ID_FILHO_SELECIONADO,
    PAI_PRODUTO_LISTA_PRODUTOS_SOLICITADOS_FILHO,
    PAI_PRODUTO_ATUALIZA_ID_PRODUTO_SELECIONADO,
    PAI_PRODUTO_CONSULTA_ENDERECO,
    PAI_PRODUTO_CONSULTA_FRETE,
    PAI_PRODUTO_CODE_FRETE_SELECIONADO,
    PAI_PRODUTO_ENDERECO_FRETE,
    PAI_PRODUTO_FINALIZAR_COMPRA,
    PAI_PRODUTO_GET_PAYMENT_SESSION,
    PAI_PRODUTO_GET_CREDIT_CARD_TOKEN,
    PAI_PRODUTO_CREDIT_CARD_DATA,
    PAI_PRODUTO_GET_CREDIT_CARD_BRAND
} from '../actions/Types';

const INITIAL_STATE = {
    lista_filhos: [],
    id_filho_selecionado: null,
    lista_produtos_solicitados_filho: [],
    id_produto_selecionado: null,
    consulta_endereco: [],
    lista_frete: [],
    code_frete_selecionado: null,
    endereco_frete: [],
    finalizar_compra: false,
    payment_session: false,
    credit_card_token: false,
    credit_card_brand: '',
    credit_card_data: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PAI_PRODUTO_LISTA_DADOS_FILHOS:
            return {...state, lista_filhos: action.payload}
        case PAI_PRODUTO_ATUALIZA_ID_FILHO_SELECIONADO:
            return {...state, id_filho_selecionado: action.payload}
        case PAI_PRODUTO_LISTA_PRODUTOS_SOLICITADOS_FILHO:
            return {...state, lista_produtos_solicitados_filho: action.payload}
        case PAI_PRODUTO_ATUALIZA_ID_PRODUTO_SELECIONADO:
            return {...state, id_produto_selecionado: action.payload}
        case PAI_PRODUTO_CONSULTA_ENDERECO:
            return {...state, consulta_endereco: action.payload}
        case PAI_PRODUTO_CONSULTA_FRETE:
            return {...state, lista_frete: action.payload}
        case PAI_PRODUTO_CODE_FRETE_SELECIONADO:
            return {...state, code_frete_selecionado: action.payload}
        case PAI_PRODUTO_ENDERECO_FRETE:
            return {...state, endereco_frete: action.payload}
        case PAI_PRODUTO_FINALIZAR_COMPRA:
            return {...state, finalizar_compra: action.payload}
        case PAI_PRODUTO_GET_PAYMENT_SESSION:
            return {...state, payment_session: action.payload}
        case PAI_PRODUTO_GET_CREDIT_CARD_TOKEN:
            return {...state, credit_card_token: action.payload}
        case PAI_PRODUTO_CREDIT_CARD_DATA:
            return {...state, credit_card_data: action.payload}
        case PAI_PRODUTO_GET_CREDIT_CARD_BRAND:
            return {...state, credit_card_brand: action.payload}
        default:
            return state;
    }
}