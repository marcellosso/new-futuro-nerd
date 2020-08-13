import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
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
    LOGIN_PAI_ERRO,
    LOGIN_PAI_SUCESSO,
    SALVA_ID_PAI,
    MODIFICA_EMAIL_FILHO_LOGIN,
    MODIFICA_SENHA_FILHO_LOGIN,
    LOGIN_FILHO_EM_ANDAMENTO,
    LOGIN_FILHO_SUCESSO,
    SALVA_DADOS_FILHO,
    LOGIN_FILHO_ERRO,
    RECUPERAR_SENHA, PAI_PRODUTO_LISTA_PRODUTOS_SOLICITADOS_FILHO
} from './Types';
import {URL_API_FUTURONERD} from '../config/Constants';

const salvaDadosFilhoEntra = (dispatch, data) => {
    dispatch({type: SALVA_DADOS_FILHO, payload: data});
    loginFilhoSucesso(dispatch);
}

const loginFilhoSucesso = (dispatch) => {
    dispatch({type: LOGIN_FILHO_SUCESSO});
    Actions.principal();
}

const loginFilhoErro = (dispatch) => {
    dispatch({type: LOGIN_FILHO_ERRO});
    alert('Dados incorretos, tente novamente!');
}

export const autenticaFilho = ({email, senha}) => {
    console.log('entrou autentica filho ' + email + '-' + senha);
    return dispatch => {
        dispatch({type: LOGIN_FILHO_EM_ANDAMENTO});
        
        axios.post(URL_API_FUTURONERD + '/filho/login', {
            email: email,
            senha: senha,
        })
            .then(function (res) {
                console.log('.then ' + email + '-' + senha + ' - ' + res.data.email + ' - ' + res.data.senha);
                if (res.data.email == email && res.data != false) {
                    salvaDadosFilhoEntra(dispatch, res.data);
                    //console.log('oi'+res.data);
                } else {
                    loginFilhoErro(dispatch);
                }
            })
            .catch(function (erro) {
                Alert.alert(
                    'Atenção!',
                    'Erro ao conectar com o servidor, favor verifique sua conexão com a Internet ou tente novamente mais tarde! \n\nDados tecnicos do erro! \n' + erro + '\nAPI URL: ' + URL_API_FUTURONERD,
                    [
                        {text: 'OK', onPress: () => { dispatch({type: LOGIN_FILHO_ERRO}); } },
                    ],
                    {cancelable: false}
                )
                
            });
    }
}

export const modificaSenhaFilho = (texto) => {
    return {
        type: MODIFICA_SENHA_FILHO_LOGIN,
        payload: texto
    }
}

export const modificaEmailFilho = (texto) => {
    return {
        type: MODIFICA_EMAIL_FILHO_LOGIN,
        payload: texto
    }
}

const loginPaiSucesso = (dispatch, id_pai) => {
    dispatch({type: LOGIN_PAI_SUCESSO});
    Actions.principalpai({id_pai: id_pai});
}

const loginPaiErro = (dispatch) => {
    dispatch({type: LOGIN_PAI_ERRO});
    alert('Dados incorretos, tente novamente!');
}

const salvaIdPai = (dispatch, id) => {
    dispatch({type: SALVA_ID_PAI, payload: id});
    loginPaiSucesso(dispatch, id);
}

export const autenticaPai = ({email, senha}) => {
    return dispatch => {
        dispatch({type: LOGIN_PAI_EM_ANDAMENTO});
        console.log(URL_API_FUTURONERD + '/pais/login')
        axios.post(URL_API_FUTURONERD + '/pais/login', {
            email: email,
            senha: senha,
        })
            .then(function (res) {
                if (res.data.email == email && res.data != false) {
                    salvaIdPai(dispatch, res.data.id);
                } else {
                    loginPaiErro(dispatch);
                }

            })
            .catch(function (erro) {
                console.log(erro);
                Alert.alert(
                    'Atenção!',
                    'Erro ao conectar com o servidor, favor verifique sua conexão com a Internet ou tente novamente mais tarde! \n\nDados tecnicos do erro! \n' + erro + '\nAPI URL: ' + URL_API_FUTURONERD,
                    [
                        {text: 'OK', onPress: () => { dispatch({type: LOGIN_PAI_ERRO}); } },
                    ],
                    {cancelable: false}
                )
            });
    }
}

const cadastroPaiSucesso = (dispatch) => {
    dispatch({type: CADASTRO_PAI_SUCESSO});
    Alert.alert(
        'Feito!',
        'O seu cadastro foi efetuado com sucesso!',
        [
            {text: 'OK', onPress: () => Actions.loginpai()},
        ],
        {cancelable: false}
    )
}

export const cadastrarPai = ({nome, email, senha, celular, cpf}) => {
    return dispatch => {
        dispatch({type: CADASTRO_PAI_EM_ANDAMENTO});
        axios.post(URL_API_FUTURONERD + '/pais', {
            nome: nome,
            email: email,
            senha: senha,
            celular: celular,
            cpf: cpf,
            plano: 0
        })
            .then(function (res) {
                if(res.data[0] != undefined && res.data[0]=='login-existente'){
                    Alert.alert('Atenção!', 'Não foi possível realizar o cadastro um Login/E-mail já existente!', [{text: 'OK', onPress: () => null},], { cancelable: false });
                    dispatch({type: CADASTRO_PAI_ERRO});
                }else {
                    cadastroPaiSucesso(dispatch);
                }
            })
            .catch(function (erro) {
                alert(erro);
            });
    }
}

export const modificaCPFPai = (texto) => {
    return {
        type: MODIFICA_CPF_PAI,
        payload: texto
    }
}

export const modificaCelularPai = (texto) => {
    return {
        type: MODIFICA_CELULAR_PAI,
        payload: texto
    }
}

export const modificaNomePai = (texto) => {
    return {
        type: MODIFICA_NOME_PAI,
        payload: texto
    }
}

export const modificaEmailPai = (texto) => {
    return {
        type: MODIFICA_EMAIL_PAI,
        payload: texto
    }
}

export const modificaSenhaPai = (texto) => {
    return {
        type: MODIFICA_SENHA_PAI,
        payload: texto
    }
}

export const recuperaSenhaFilho = (login, callback) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + '/recuperarsenha/filho/' + login)
            .then(res => {
                console.log('Dados recupera senha filho! filho ' + login);
                console.log(res.data);
                callback(res.data);
            })
            .catch(() => {
                console.log('Erro ao recupera senha: ' + login);
                callback([false])
            });
    }
}

export const recuperaSenhaPai = (login, callback) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + '/recuperarsenha/pai/' + login)
            .then(res => {
                console.log('Dados recupera senha pai! login ' + login);
                console.log(res.data);
                callback(res.data);
            })
            .catch(() => {
                console.log('Erro ao recuperar senha: ' + login);
                callback([false])
            });
    }
}
