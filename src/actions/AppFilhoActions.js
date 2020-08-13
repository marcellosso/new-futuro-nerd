import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {
    MODIFICA_ESTA_CORRETO, // # MXTera --
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
    ATIVAR_CONTADOR_FILHO, ATUALIZA_PTS_FILHO
} from '../actions/Types';
import {URL_API_FUTURONERD} from '../config/Constants';



const buscaProdutoUnicoSucesso = (dispatch, produto) => {
    dispatch({
        type: SALVA_PRODUTO_UNICO,
        payload:produto
    })
}

export const buscaProduto = (id) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + `/produtos/${id}`)
        .then(res => {
            buscaProdutoUnicoSucesso(dispatch,res.data);
            //console.log(res.data);
        })
        .catch(err => {
            alert(err);
        })
    }
}


const limparBuscaProdutoUnicoSucesso = (dispatch) => {
    dispatch({
        type: LIMPAR_PRODUTO_UNICO,
        payload:[]
    })
}

export const limparBuscaProduto = () => {
    return dispatch => { limparBuscaProdutoUnicoSucesso(dispatch); }
}

const buscaProdutosSucesso = (dispatch, produtos) => {
    dispatch({
        type: SALVA_PRODUTOS_PUXADOS,
        payload:produtos
    })
}

export const buscaProdutos = () => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + '/produtos')
        .then(res => {
            buscaProdutosSucesso(dispatch,res.data);
            //console.log(res.data);
        })
        .catch(err => {
            alert(err);
        })
    }
}

export const cadastraResposta = ({id_questao,id_filho,id_serie,id_materia,correto,resposta}, callback) => {
    return dispatch => {
        axios.post(URL_API_FUTURONERD + '/cadastra/jogada',{
            id_filho: id_filho,
            id_questao: id_questao,
            id_serie: id_serie,
            id_materia: id_materia,
            correto: correto.correto,
            resposta: resposta.resposta
        })
        .then(res => {
            if(isNaN(res.data)){

                if(correto.correto == 1){

                    axios.put(URL_API_FUTURONERD + `/cadastra/pts/${id_filho}`)
                    .then(res => {
                        if(res.data.status == true) {
                            /*Alert.alert(
                                'Acertou!',
                                'Foi adicionado mais 10 pontos a você.',
                                [
                                  {text: 'OK', onPress: () => {
                                      console.log('Erro ao recuperar os dados do filho');
                                      Actions.refresh({key: Math.random()});
                                      callback();
                                    }
                                  },
                                ],
                                { cancelable: false }
                            )*/
                            Actions.refresh({key: Math.random()}); callback();
                        } else {
                            Alert.alert(
                                'Erro',
                                'Parece que houve um erro interno em nosso sistema, tente novamente mais tarde.',
                                [
                                  {text: 'OK', onPress: () => {callback();}},
                                ],
                                { cancelable: false }
                            )
                        }
                    })
                    .catch(function(erro){
                        Alert.alert(
                            'Erro',
                            'Parece que houve um erro interno em nosso sistema, tente novamente mais tarde.',
                            [
                              {text: 'OK', onPress: () => {callback();}},
                            ],
                            { cancelable: false }
                        )
                    });

                } else {
                    /*Alert.alert(
                        'Você errou',
                        'Esta questão aparecerá para você aleatoriamente.',
                        [
                          {text: 'OK', onPress: () => { Actions.refresh({key: Math.random()}); callback(); } },
                        ],
                        { cancelable: false }
                    )*/
                    Actions.refresh({key: Math.random()}); callback();
                }
            } else {
                alert('Houve um erro, tente novamente mais tarde.');
                callback();
            }
        })
        .catch(() => {
            console.log('Erro ao recuperar os dados do filho');
            callback();
        });
    }
}

const buscaPerguntaSucesso = (dispatch, data) => {
    dispatch({
        type: PEGA_QUESTAO_ATUAL,
        payload: data
    })
}

export const buscaPerguntaErrada = ({id_filho,id_materia,id_serie}, callback) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + `/questao-errada/${id_filho}/${id_materia}/${id_serie}`)
        .then(res => {
            buscaPerguntaSucesso(dispatch,res.data);
            callback();
        })
        .catch(err => {
            alert(err);
        })
    }
}

export const buscaPergunta = ({id_filho,id_materia,id_serie}, callback) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + `/questao/${id_filho}/${id_materia}/${id_serie}`)
        .then(res => {
            buscaPerguntaSucesso(dispatch,res.data);
            callback();
        })
        .catch(err => {
            alert(err);
        })
    }
}

const salvaQuestoesRespondidas = (dispatch,total) => {
    dispatch({
        type: SALVA_QUESTOES_RESPONDIDAS,
        payload: total
    })
}

export const buscaQuestoesRespondidas = (id_filho,id_materia,id_serie) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + `/filho/questoes/respondidas/${id_filho}/${id_materia}/${id_serie}`)
            .then(res => {
                salvaQuestoesRespondidas(dispatch,res.data.total);
            })
            .catch(erro => {
                alert(erro);
            })
    }
}

const salvaTotalQuestoes = (dispatch,total) => {
    dispatch({
        type: SALVA_TOTAL_QUESTOES,
        payload: total
    })
}



export const relatorioQuestoesCompletadas = (id_serie,id_filho) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + `/filho/questoes/relatorio/completadas/${id_serie}/${id_filho}`)
            .then(res => {
                salvaRelatorioQuestoesCompletadas(dispatch,res.data);
            })
            .catch(erro => {
                alert(erro);
            })
    }
}

const salvaRelatorioQuestoesCompletadas = (dispatch,obj) => {
    dispatch({
        type: RELATORIO_QUESTOES_COMPLETADAS,
        payload: obj
    })
}




export const buscaTotalQuestoes = (materia,serie) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + `/filho/questoes/${materia}/${serie}`)
            .then(res => {
                salvaTotalQuestoes(dispatch,res.data.total);
            })
            .catch(erro => {
                alert(erro);
            })
    }
}

export const modificaApelido = (texto) => {
    return {
        type: MODIFICA_APELIDO,
        payload: texto
    }
}

export const modificaEstaCorreto = (texto) => {     // # MXTera --
    return {
        type: MODIFICA_ESTA_CORRETO,
        payload: texto
    }
}

const filhoAtualizaDadosSucesso = (dispatch) => {
    dispatch({type:FILHO_ATUALIZA_DADOS_OK});
    Alert.alert(
        'Dados atualizados!',
        'Você atualizou o seu apelido com sucesso!',
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
      )
}

const filhoAtualizaDadosErro = (dispatch) => {
    dispatch({type:FILHO_ATUALIZA_DADOS_OK});
    Alert.alert(
        'Erro',
        'Parece que ocorreu um erro interno, tente novamente mais tarde.',
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
      )
}

export const filhoAtualizaDados = ({nome, id}) => {
    return dispatch => {
        dispatch({type: FILHO_ATUALIZA_DADOS_EM_ANDAMENTO});
        axios.put(URL_API_FUTURONERD + `/filho/modifica/${id}`,{
            nome: nome,
        })
        .then(res => {
            if(res.data.status == true) {
                filhoAtualizaDadosSucesso(dispatch);
            } else {
                Alert.alert(
                    'Erro',
                    'Parece que houve um erro interno em nosso sistema, tente novamente mais tarde',
                    [
                      {text: 'OK', onPress: () => null},
                    ],
                    { cancelable: false }
                  )
            }
        })
        .catch(function(erro){
            filhoAtualizaDadosErro(dispatch);
        });
    }
}

export const listaDadosAjudaPai = () => {
    return dispatch => {
     axios.get(URL_API_FUTURONERD + '/ajuda')
         .then(ajudas => {
            // console.log('#### TESTE COM NETTO ####',ajudas);
            atualizaDadosAjudaPai(dispatch, ajudas.data)
         })
         .catch(() => {
             console.log('erro ao recuperar os dados de ajuda');
         });
     }
}

const atualizaDadosAjudaPai = (dispatch, data) => {
    dispatch ({type: LISTA_DADOS_AJUDA_PAI, payload:data});
}

export const ativarContadorFilho = (ativar) => {
    return dispatch => {
        dispatchAtivarContadorFilho(dispatch, ativar)
        }
}

const dispatchAtivarContadorFilho = (dispatch, data) => {
    dispatch ({type: ATIVAR_CONTADOR_FILHO, payload:data});
}

export const updateActiveTime = (id) => {
    console.log('Íd:'+id);
    return dispatch => {
     axios.put(URL_API_FUTURONERD + `/filho/tempoativo/${id}`)
         .then(res => {
            console.log('Registrando tempo ativo do Filho!',res);
         })
         .catch(() => {
             console.log('Erro ao registrar tempo ativo do filho!');
         });
        }
}


export const getPtsFilho = (id_filho) => {
    return dispatch => {
        axios.get(URL_API_FUTURONERD + `/filhos/getPts/${id_filho}`)
            .then(res => {
                console.log(res.data.pts);
                dispatchGetPtsFilho(dispatch,res.data.pts);
            })
            .catch(erro => {
                alert(erro);
            })
    }
}

export const updatePtsFilho = (pontos) => {
    return dispatch => {
        dispatchGetPtsFilho(dispatch,pontos);
    }
}

const dispatchGetPtsFilho = (dispatch,obj) => {
    dispatch({
        type: ATUALIZA_PTS_FILHO,
        payload: obj
    })
}
