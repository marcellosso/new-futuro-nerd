import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

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
} from './Types';

import {URL_API_FUTURONERD, URL_CONSULTA_CEP} from '../config/Constants';
import qs from 'qs';

// Actions TELA 1

// Lista filhos do PAI
export const listaDadosFilhos = (id_pai) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + `/pais/filhos/${id_pai}`)
            .then(filhos => {
                console.log('Dados filhos recuperados com sucesso! Id Pai ' + id_pai);
                console.log(filhos.data);
                dispatchListaDadosFilhos(dispatch, filhos.data);
            })
            .catch(() => {
                console.log('Erro ao recuperar os dados dos filhos');
            });
    }
}

const dispatchListaDadosFilhos = (dispatch, data) => {
    dispatch({type: PAI_PRODUTO_LISTA_DADOS_FILHOS, payload: data});
}

// Atualiza ID do filho selecionado
export const atualizarIDFilhoSelecionado = (id_filho) => {
    return dispatch => {
        dispatchAtualizarIDFilhoSelecionado(dispatch, id_filho);
    }
}

const dispatchAtualizarIDFilhoSelecionado = (dispatch, data) => {
    dispatch({type: PAI_PRODUTO_ATUALIZA_ID_FILHO_SELECIONADO, payload: data});
}


// TELA 2

// PAI_PRODUTO_LISTA_PRODUTOS_SOLICITADOS_FILHO
export const produtosSolicitadosFilho = (id_filho) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + '/produtos/solicitados/' + id_filho)
            .then(produtos => {
                console.log('Dados dos produtos solicitados pelo filho! Id filho ' + id_filho);
                console.log(produtos.data);
                dispatchProdutosSolicitadosFilho(dispatch, produtos.data)
            })
            .catch(() => {
                console.log('Erro ao recuperar os dados ds produtos solicitados pelo filho id: ' + id_filho);
            });
    }
}

const dispatchProdutosSolicitadosFilho = (dispatch, data) => {
    dispatch({type: PAI_PRODUTO_LISTA_PRODUTOS_SOLICITADOS_FILHO, payload: data});
}


// Atualiza ID do produto selecionado
export const atualizarIDProdutoSelecionado = (id_produto) => {
    return dispatch => {
        dispatchAtualizarIDProdutoSelecionado(dispatch, id_produto);
    }
}

const dispatchAtualizarIDProdutoSelecionado = (dispatch, data) => {
    dispatch({type: PAI_PRODUTO_ATUALIZA_ID_PRODUTO_SELECIONADO, payload: data});
}

// TELA 3
// PAI_PRODUTO_LISTA_PRODUTOS_SOLICITADOS_FILHO
export const consultaEndereco = (cep) => {
    return dispatch => {
        axios.get(URL_CONSULTA_CEP + cep + '/json/unicode/')
            .then(endereco => {
                console.log('Consulta endereço com sucesso! CEP: ' + cep);
                console.log(endereco.data);
                dispatchconsultaEndereco(dispatch, endereco.data)
            })
            .catch(() => {
                console.log('Erro ao consulta endereço CEP: ' + cep);
            });
    }
}

const dispatchconsultaEndereco = (dispatch, data) => {
    dispatch({type: PAI_PRODUTO_CONSULTA_ENDERECO, payload: data});
}

// PAI_PRODUTO_CONSULTA_FRETE
export const consultaFrete = (objCalculo) => {
    return dispatch => {
        axios.post(URL_API_FUTURONERD + '/frete', objCalculo)
            .then(frete => {
                console.log('Consulta frete com sucesso! Frete: ' + objCalculo);
                console.log(frete.data);
                dispatchConsultaFrete(dispatch, frete.data)
            })
            .catch(() => {
                console.log('Erro ao consulta frete: ' + cep);
            });
    }
}

const dispatchConsultaFrete = (dispatch, data) => {
    dispatch({type: PAI_PRODUTO_CONSULTA_FRETE, payload: data});
}

export const limpaConsultaFrete = () => {
    return dispatch => {
        dispatchConsultaFrete(dispatch, [])
    }
}

export const limpaDadosFinalizaPagamento = () => {
    return dispatch => {
        dispatchConsultaFrete(dispatch, [])
        dispatchAtualizarEnderecoFreteSelecionado(dispatch, null);
        dispatchGetCreditCardToken(dispatch, false);
        dispatchGetPaymentSession(dispatch, false);
        dispatchSetCreditCardData(dispatch, null);
        dispatchGetCreditCardBrand(dispatch, '');
        dispatchAtualizarCodeFreteSelecionado(dispatch, null);
    }
}


// Atualiza CODE do frete selecionado
export const atualizarCodeFreteSelecionado = (code) => {
    return dispatch => {
        dispatchAtualizarCodeFreteSelecionado(dispatch, code);
    }
}

const dispatchAtualizarCodeFreteSelecionado = (dispatch, data) => {
    dispatch({type: PAI_PRODUTO_CODE_FRETE_SELECIONADO, payload: data});
}


// Atualiza ENDERECO do frete selecionado
export const atualizarEnderecoFreteSelecionado = (endereco) => {
    return dispatch => {
        dispatchAtualizarEnderecoFreteSelecionado(dispatch, endereco);
    }
}

const dispatchAtualizarEnderecoFreteSelecionado = (dispatch, data) => {
    dispatch({type: PAI_PRODUTO_ENDERECO_FRETE, payload: data});
}

// Finalizar Compra
export const finalizarCompra = (obj) => {
    return dispatch => {
        axios.post(URL_API_FUTURONERD + '/finalizarcompra', obj)
            .then(objCompra => {
                console.log('Compra realizada com sucesso! Compra: ' + objCompra);
                console.log(objCompra.data);
                dispatchFinalizarCompra(dispatch, obj);
            })
            .catch(() => {
                console.log('Erro ao realizar compra: ' + obj);
            });
    }
}

const dispatchFinalizarCompra = (dispatch, data) => {
    dispatch({type: PAI_PRODUTO_FINALIZAR_COMPRA, payload: data});
}


// GERAR TOKEN CARTAO DE CREDITO
export const getCreditCardToken = (obj, callback) => {
    return dispatch => {
        let axiosConfig = {
            headers: {
                'Accept': 'application/x-www-form-urlencoded,application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Host': 'df.uol.com.br'
            }
        };
        console.log(qs.stringify(obj));

        axios.post('https://df.uol.com.br//v2/cards/', qs.stringify(obj), axiosConfig)
            .then(objToken => {
                console.log('getCreditCardToken Sucesso! Token: ' + objToken.data.token);
                console.log(objToken.data);
                dispatchGetCreditCardToken(dispatch, objToken.data.token);
                callback();
            })
            .catch((objToken) => {
                console.log('Erro ao realizar compra: ' + obj + ' return: ' + objToken);
            });
    }
}

const dispatchGetCreditCardToken = (dispatch, data) => {
    dispatch({type: PAI_PRODUTO_GET_CREDIT_CARD_TOKEN, payload: data});
}


// GET PAYMENNT SESSION
export const getPaymentSession = (callback) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + '/payment/session')
            .then(objSession => {
                console.log('Paymanet Session! Compra: ' + objSession.data[0]);
                dispatchGetPaymentSession(dispatch, objSession.data[0]);
                callback();
            })
            .catch((objSession) => {
                console.log('Erro ao gerar Sessão de Pagamento. return: ' + objSession);
            });
    }
}

const dispatchGetPaymentSession = (dispatch, data) => {
    dispatch({type: PAI_PRODUTO_GET_PAYMENT_SESSION, payload: data});
}


// SET CREDIT CARD DATA
export const setCreditCardData = (obj) => {
    return dispatch => {
        dispatchSetCreditCardData(dispatch, obj);
    }
}

const dispatchSetCreditCardData = (dispatch, data) => {
    dispatch({type: PAI_PRODUTO_CREDIT_CARD_DATA, payload: data});
}

// GET BRAND CARTAO DE CREDITO
export const getCreditCardBrand = (token, creditcard_number, callback) => {
    return dispatch => {
        let axiosConfig = {
            headers: {
                'Accept': 'application/x-www-form-urlencoded,application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "*",
            }
        };
        console.log('https://df.uol.com.br//df-fe/mvc/creditcard/v1/getBin?tk=' + token + '&creditCard=' + creditcard_number);
        axios.get('https://df.uol.com.br//df-fe/mvc/creditcard/v1/getBin?tk=' + token + '&creditCard=' + creditcard_number, axiosConfig)
            .then(objBrand => {
                console.log('getCreditCardBrand Sucesso! Token: ?tk=' + token + '&creditCard=' + creditcard_number + ' ' + objBrand);
                console.log(objBrand.data.bin.brand.name);
                dispatchGetCreditCardBrand(dispatch, objBrand.data.bin.brand.name);
                callback();
            })
            .catch((objBrand) => {
                console.log('Erro ao consulta credit card brand: tk:' + token + ' cc:' + creditcard_number + ' return: ' + objBrand);
            });
    }
}

const dispatchGetCreditCardBrand = (dispatch, data) => {
    dispatch({type: PAI_PRODUTO_GET_CREDIT_CARD_BRAND, payload: data});
}
