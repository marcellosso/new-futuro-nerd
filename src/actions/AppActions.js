import axios from 'axios';
import { Alert } from 'react-native';
import {
    LISTA_DADOS_PAI,
    ATUALIZA_DADOS_PAI_ANDAMENTO,
    ATUALIZA_DADOS_PAI_ERRO,
    ATUALIZA_DADOS_PAI_SUCESSO,
    MODIFICA_NOME_PAI_SISTEMA,
    MODIFICA_CELULAR_PAI_SISTEMA,
    MODIFICA_EMAIL_PAI_SISTEMA,
    MODIFICA_SENHA_PAI_SISTEMA,
    MODIFICA_PLANO_PAI_SISTEMA_ANDAMENTO,
    MODIFICA_PLANO_PAI_SISTEMA_SUCESSO,

    MODIFICA_CEP_PAI_SISTEMA,
    MODIFICA_UF_PAI_SISTEMA,
    MODIFICA_CIDADE_PAI_SISTEMA,
    MODIFICA_BAIRRO_PAI_SISTEMA,
    MODIFICA_LOGRADOURO_PAI_SISTEMA,
    MODIFICA_NUMERO_PAI_SISTEMA,
    MODIFICA_CPF_PAI,

    LISTA_DADOS_SERIES,
    MODIFICA_NOME_FILHO,
    MODIFICA_SENHA_FILHO,
    MODIFICA_EMAIL_FILHO,
    CADASTRO_FILHO_EM_ANDAMENTO,
    CADASTRO_FILHO_SUCESSO,
    CADASTRO_FILHO_ERRO,
    LISTA_DADOS_FILHOS,
    LISTA_DADOS_FILHO,
    LIMPA_REGISTRO_FILHO,
    MODIFICA_NOME_FILHO_EDITANDO,
    MODIFICA_SENHA_FILHO_EDITANDO,
    MODIFICA_EMAIL_FILHO_EDITANDO,
    MODIFICA_SERIE_FILHO_EDITANDO,
    ATUALIZA_DADOS_FILHO_ANDAMENTO,
    ATUALIZA_DADOS_FILHO_SUCESSO,
    ATUALIZA_DADOS_FILHO_ERRO,
    LISTA_DADOS_AJUDA,
    LISTA_DADOS_PLANO,
    CONSULTA_PRODUTOS_SOLICITADOS_FILHO,
    CONSULTA_QUESTOES_ERRADAS_MATERIA_FILHO, CADASTRO_PAI_ERRO
} from './Types';

import { URL_API_FUTURONERD } from '../config/Constants';

export const atualizaSistemaDadosFilho = ({ nome, email, senha, id_serie, id }) => {
    return dispatch => {
        dispatch({ type: ATUALIZA_DADOS_FILHO_ANDAMENTO });
        axios.put(URL_API_FUTURONERD + `/filho/modifica/${id}`, {
            nome: nome,
            email: email,
            senha: senha,
            id_serie: id_serie,
        })
            .then(res => {
                if (res.data.status == true) {
                    atualizaSistemaDadosFilhoSucesso(dispatch);
                } else {
                    Alert.alert(
                        'Erro',
                        'Parece que houve um erro interno em nosso sistema, tente novamente mais tarde',
                        [
                            { text: 'OK', onPress: () => null },
                        ],
                        { cancelable: false }
                    )
                }
            })
            .catch(function (erro) {
                alert(erro);
                atualizaSistemaDadosFilhoErro(dispatch);
            });
    }
}

const atualizaSistemaDadosFilhoSucesso = (dispatch) => {
    dispatch({ type: ATUALIZA_DADOS_FILHO_SUCESSO });

    Alert.alert(
        'Dados atualizados!',
        'Os seus dados foram atualizados corretamente.',
        [
            { text: 'OK', onPress: () => null },
        ],
        { cancelable: false }
    )
}

const atualizaSistemaDadosFilhoErro = (dispatch) => {
    dispatch({ type: ATUALIZA_DADOS_FILHO_ERRO });

    Alert.alert(
        'Erro',
        'Parece que houve um erro interno em nosso sistema, tente novamente mais tarde',
        [
            { text: 'OK', onPress: () => null },
        ],
        { cancelable: false }
    )
}

export const modificaSerieFilhoEditando = (texto) => {
    return {
        type: MODIFICA_SERIE_FILHO_EDITANDO,
        payload: texto
    }
}

export const modificaEmailFilhoEditando = (texto) => {
    return {
        type: MODIFICA_EMAIL_FILHO_EDITANDO,
        payload: texto
    }
}

export const modificaSenhaFilhoEditando = (texto) => {
    return {
        type: MODIFICA_SENHA_FILHO_EDITANDO,
        payload: texto
    }
}

export const modificaNomeFilhoEditando = (texto) => {
    return {
        type: MODIFICA_NOME_FILHO_EDITANDO,
        payload: texto
    }
}

export const limpaRegistroFilho = () => {
    return {
        type: LIMPA_REGISTRO_FILHO,
    }
}

const atualizaDadosFilho = (dispatch, data) => {
    dispatch({ type: LISTA_DADOS_FILHO, payload: data });
}

export const buscaDadosFilho = (id_filho) => {
    return dispatch => {
        axios.post(URL_API_FUTURONERD + '/filho', {
            id_filho: id_filho
        })
            .then(filhos => {
                //atualizaDadosFilho(dispatch, filhos.data);
                atualizaDadosFilho(dispatch, filhos.data);
            })
            .catch(() => {
                console.log('erro ao recuperar os dados do filho');
            });
    }
}

const atualizaDadosFilhos = (dispatch, data) => {
    dispatch({ type: LISTA_DADOS_FILHOS, payload: data });
}

export const listaDadosFilhos = (id_pai) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + `/pais/filhos/${id_pai}`)
            .then(filhos => {
                atualizaDadosFilhos(dispatch, filhos.data);
                //console.log(filhos);
            })
            .catch(() => {
                console.log('erro ao recuperar os dados dos filhos');
            });
    }
}

const cadastroFilhoSucesso = (dispatch) => {
    dispatch({ type: CADASTRO_FILHO_SUCESSO });

    Alert.alert(
        'Filho cadastrado',
        'o seu filho foi cadastrado com sucesso!',
        [
            { text: 'OK', onPress: () => null },
        ],
        { cancelable: false }
    )
}

export const cadastraFilho = ({ nomeFilho, emailFilho, senhaFilho, selected, id_pai }, callback) => {
    return dispatch => {

        dispatch({ type: CADASTRO_FILHO_EM_ANDAMENTO });

        console.log(nomeFilho)
        console.log(emailFilho)
        console.log(senhaFilho)
        console.log(selected)
        console.log(id_pai)

        axios.post(URL_API_FUTURONERD + '/pais/cadastra/filho', {
            nome: nomeFilho,
            email: emailFilho,
            senha: senhaFilho,
            id_serie: selected,
            id_pai: id_pai,
            pts: 0
        })
            .then(function (res) {
                console.log(res);
                if (res.data[0] != undefined && res.data[0] == 'login-existente') {
                    Alert.alert('Atenção!', 'Não foi possível realizar o cadastro um Login/E-mail já existente!', [{ text: 'OK', onPress: () => null },], { cancelable: false });
                    dispatch({ type: CADASTRO_FILHO_ERRO });
                } else {
                    cadastroFilhoSucesso(dispatch);
                    callback();
                }
            })
            .catch(function (erro) {
                alert(erro);
                callback();
            });
    }
}

export const modificaSenhaFilho = (texto) => {
    return {
        type: MODIFICA_SENHA_FILHO,
        payload: texto
    }
}

export const modificaEmailFilho = (texto) => {
    return {
        type: MODIFICA_EMAIL_FILHO,
        payload: texto
    }
}

export const modificaNomeFilho = (texto) => {
    return {
        type: MODIFICA_NOME_FILHO,
        payload: texto
    }
}

export const listaDadosSeries = () => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + '/serie')
            .then(series => {
                atualizaDadosSeries(dispatch, series.data)
            })
            .catch(() => {
                console.log('erro ao recuperar os dados estacionamentos');
            });
    }
}

const atualizaDadosSeries = (dispatch, data) => {
    dispatch({ type: LISTA_DADOS_SERIES, payload: data });
}

const modificaPlanoPaiSucesso = (dispatch) => {
    dispatch({ type: MODIFICA_PLANO_PAI_SISTEMA_SUCESSO });

    Alert.alert(
        'Plano Atualizado',
        'O seu plano selecionado já está ativo!',
        [
            { text: 'OK', onPress: () => null },
        ],
        { cancelable: false }
    )
}

export const modificaPlanoPai = (plano, id) => {
    return dispatch => {
        dispatch({ type: MODIFICA_PLANO_PAI_SISTEMA_ANDAMENTO });
        axios.put(URL_API_FUTURONERD + '/pais/modifica/plano', {
            id: id,
            plano: plano
        })
            .then(res => {
                if (res.data.status == true) {
                    modificaPlanoPaiSucesso(dispatch);
                }
            })
            .catch(function (erro) {
                alert(erro);
            });
    }
}

export const modificaEmailPai = (texto) => {
    return {
        type: MODIFICA_EMAIL_PAI_SISTEMA,
        payload: texto
    }
}

export const modificaCelularPai = (texto) => {
    return {
        type: MODIFICA_CELULAR_PAI_SISTEMA,
        payload: texto
    }
}

export const modificaNomePai = (texto) => {
    return {
        type: MODIFICA_NOME_PAI_SISTEMA,
        payload: texto
    }
}

export const modificaSenhaPai = (texto) => {
    return {
        type: MODIFICA_SENHA_PAI_SISTEMA,
        payload: texto
    }
}



export const modificaCepPai = (texto) => {
    return {
        type: MODIFICA_CEP_PAI_SISTEMA,
        payload: texto
    }
}

export const modificaUfPai = (texto) => {
    return {
        type: MODIFICA_UF_PAI_SISTEMA,
        payload: texto
    }
}

export const modificaCidadePai = (texto) => {
    return {
        type: MODIFICA_CIDADE_PAI_SISTEMA,
        payload: texto
    }
}

export const modificaBairroPai = (texto) => {
    return {
        type: MODIFICA_BAIRRO_PAI_SISTEMA,
        payload: texto
    }
}

export const modificaLogradouroPai = (texto) => {
    return {
        type: MODIFICA_LOGRADOURO_PAI_SISTEMA,
        payload: texto
    }
}

export const modificaNumeroPai = (texto) => {
    return {
        type: MODIFICA_NUMERO_PAI_SISTEMA,
        payload: texto
    }
}

export const modificaCPFPai = (texto) => {
    return {
        type: MODIFICA_CPF_PAI,
        payload: texto
    }
}


export const atualizaSistemaDadosPai = ({ nome, email, senha, celular, id, cep, uf, cidade, bairro, logradouro, numero }) => {
    return dispatch => {
        dispatch({ type: ATUALIZA_DADOS_PAI_ANDAMENTO });
        console.log(` ### Envio de dados para o Serviço : /pais/modifica/${id}`)
        console.log({
            nome: nome,
            email: email,
            senha: senha,
            celular: celular,
            cep: cep,
            uf,
            cidade,
            bairro,
            logradouro,
            numero
        })
        axios.put(URL_API_FUTURONERD + `/pais/modifica/${id}`, {
            nome: nome,
            email: email,
            senha: senha,
            celular: celular,
            cep: cep,
            uf,
            cidade,
            bairro,
            logradouro,
            numero
        })
            .then(res => {
                if (res.data.status == true) {
                    atualizaSistemaDadosPaiSucesso(dispatch);
                } else {
                    Alert.alert(
                        'Erro',
                        'Parece que houve um erro interno em nosso sistema, tente novamente mais tarde',
                        [
                            { text: 'OK', onPress: () => null },
                        ],
                        { cancelable: false }
                    )
                }
            })
            .catch(function (erro) {
                alert(erro);
                atualizaSistemaDadosPaiErro(dispatch);
            });
    }
}

const atualizaSistemaDadosPaiSucesso = (dispatch) => {
    dispatch({ type: ATUALIZA_DADOS_PAI_SUCESSO });

    Alert.alert(
        'Dados atualizados!',
        'Os seus dados foram atualizados corretamente.',
        [
            { text: 'OK', onPress: () => null },
        ],
        { cancelable: false }
    )
}

const atualizaSistemaDadosPaiErro = (dispatch) => {
    dispatch({ type: ATUALIZA_DADOS_PAI_ERRO });

    Alert.alert(
        'Erro',
        'Parece que houve um erro interno em nosso sistema, tente novamente mais tarde',
        [
            { text: 'OK', onPress: () => null },
        ],
        { cancelable: false }
    )
}

export const buscaDadosPai = (id_pai) => {
    return dispatch => {
        axios.post(URL_API_FUTURONERD + '/pais/consulta', {
            id: id_pai,
        })
            .then(pai => {
                atualizaDadosPai(dispatch, pai.data)
            })
            .catch(() => {
                console.log('erro ao recuperar os dados user');
            });
    }
}

const atualizaDadosPai = (dispatch, data) => {
    dispatch({ type: LISTA_DADOS_PAI, payload: data });
}


export const listaDadosAjuda = () => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + '/ajuda')
            .then(ajudas => {
                console.log(ajudas);
                atualizaDadosAjuda(dispatch, ajudas.data)
            })
            .catch(() => {
                console.log('erro ao recuperar os dados de ajuda');
            });
    }
}

const atualizaDadosAjuda = (dispatch, data) => {
    dispatch({ type: LISTA_DADOS_AJUDA, payload: data });
}


export const listaDadosPlano = () => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + '/plano')
            .then(planos => {
                console.log(planos);
                atualizaDadosPlano(dispatch, planos.data)
            })
            .catch(() => {
                console.log('erro ao recuperar os dados de plano');
            });
    }
}

const atualizaDadosPlano = (dispatch, data) => {
    dispatch({ type: LISTA_DADOS_PLANO, payload: data });
}


// CONSULTA_PRODUTOS_SOLICITADOS_FILHO
export const produtosSolicitadosFilho = (id_filho) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + '/produtos/solicitados/' + id_filho)
            .then(produtos => {
                console.log(produtos);
                dispatchProdutosSolicitadosFilho(dispatch, produtos.data)
            })
            .catch(() => {
                console.log('erro ao recuperar os dados de plano');
            });
    }
}

const dispatchProdutosSolicitadosFilho = (dispatch, data) => {
    dispatch({ type: CONSULTA_PRODUTOS_SOLICITADOS_FILHO, payload: data });
}


// CONSULTA_QUESTOES_ERRADAS_MATERIA_FILHO
export const consultaQuestoesErradasMateriaFilho = (id_filho, id_materia, id_serie) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + `/filho/questoes/erradas/pergrespsel/${id_filho}/${id_materia}/${id_serie}`)
            .then(produtos => {
                console.log(produtos);
                dispatchConsultaQuestoesErradasMateriaFilho(dispatch, produtos.data)
            })
            .catch(() => {
                console.log('erro ao recuperar os dados de plano');
            });
    }
}

const dispatchConsultaQuestoesErradasMateriaFilho = (dispatch, data) => {
    dispatch({ type: CONSULTA_QUESTOES_ERRADAS_MATERIA_FILHO, payload: data });
}
