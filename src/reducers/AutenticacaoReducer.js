import {
    MODIFICA_EMAIL_PAI,
    MODIFICA_SENHA_PAI,
    MODIFICA_NOME_PAI,
    MODIFICA_CELULAR_PAI,
    MODIFICA_CPF_PAI,
    CADASTRO_PAI_EM_ANDAMENTO,
    CADASTRO_PAI_SUCESSO,
    CADASTRO_PAI_ERRO,
    LOGIN_PAI_EM_ANDAMENTO,
    LOGIN_PAI_SUCESSO,
    LOGIN_PAI_ERRO,
    SALVA_ID_PAI,
    MODIFICA_EMAIL_FILHO_LOGIN,
    MODIFICA_SENHA_FILHO_LOGIN,
    LOGIN_FILHO_EM_ANDAMENTO,
    LOGIN_FILHO_SUCESSO,
    LOGIN_FILHO_ERRO
} from '../actions/Types';

/**
 *
 emailPai:'rasmangabeira@hotmail.com',
 senhaPai:'wsxqaz12',
 emailFilho: 'jdmangabeira@gmail.com',
 senhaFilho: 'wsxqaz12',
 */
const INITIAL_STATE = {
    emailPai: '',
    senhaPai: '',
    nomePai: '',
    celularPai: '',
    cpfPai: '',
    idPai: '',

    emailFilho: '',
    senhaFilho: '',

    loading_cadastro: false,
    loading_login: false
}

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case LOGIN_FILHO_ERRO:
            return {...state, loading_login: false}
        case LOGIN_FILHO_SUCESSO:
            return {...state, loading_login: false}
        case MODIFICA_SENHA_FILHO_LOGIN:
            return {...state, senhaFilho: action.payload}
        case MODIFICA_EMAIL_FILHO_LOGIN:
            return {...state, emailFilho: action.payload}
        case MODIFICA_EMAIL_PAI:
            return {...state, emailPai: action.payload}
        case MODIFICA_SENHA_PAI:
            return {...state, senhaPai: action.payload}
        case MODIFICA_NOME_PAI:
            return {...state, nomePai: action.payload}
        case MODIFICA_CELULAR_PAI:
            return {...state, celularPai: action.payload}
        case MODIFICA_CPF_PAI:
            return {...state, cpfPai: action.payload}
        case CADASTRO_PAI_EM_ANDAMENTO:
            return {...state, loading_cadastro: true}
        case CADASTRO_PAI_SUCESSO:
            return {...state, loading_cadastro: false, senhaPai: null, nomePai: null, celularPai: null, cpfPai: null, emailFilho: null}
        case CADASTRO_PAI_ERRO:
            return {...state, loading_cadastro: false}
        case LOGIN_PAI_EM_ANDAMENTO:
            return {...state, loading_login: true}
        case LOGIN_PAI_SUCESSO:
            return {...state, loading_login: false}
        case LOGIN_PAI_ERRO:
            return {...state, loading_login: false}
        case SALVA_ID_PAI:
            return {...state, idPai: action.payload}
        case LOGIN_FILHO_EM_ANDAMENTO:
            return {...state, loading_login: true}
        default:
            return state;
    }
}
