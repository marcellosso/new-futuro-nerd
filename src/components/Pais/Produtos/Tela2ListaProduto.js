/**
 * Deve lista os produtos solicitados pelo filho.
 * Deve ser exibido o status da solicitação do produto.
 * Ao clicar sob o produto devera ser direcionado para a tela 3 com os detalhes da solicitação
 */

import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {Container, Content, Header, Left, Right, Body, Button, Icon, ListItem, List} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {
    produtosSolicitadosFilho,
    atualizarIDProdutoSelecionado
} from '../../../actions/AppPaiProdutoActions';
import Rodape from '../Rodape';

import {URL_ADMIN_FUTURONERD} from '../../../config/Constants';
import Menu from "../../../config/Menu";


class Tela2ListaProduto extends React.Component {

    filhoSelecionado = filhos => filhos.id === this.props.id_filho_selecionado;

    arr_list_status_pedido = [
        'Iniciado',
        'Aguardando pagamento',
        'Pago',
        'Processando pedido',
        'Enviado',
        'Concluido',
        'Cancelado'
    ];

    arr_list_status_pagamento = [
        'Iniciado',
        'Aguardando Pagamento',
        'Em analise',
        'Pago',
        'Disponível',
        'Em Disputa',
        'Devolvido',
        'Cancelado',
        'Carga de vendedor',
        'Contestado'
    ];

    componentWillMount() {
        console.log('Id filho selecionado: ' + this.props.id_filho_selecionado);
        this.props.produtosSolicitadosFilho(this.props.id_filho_selecionado);
    }

    abrirTela3(id_produto) {
        this.props.atualizarIDProdutoSelecionado(id_produto);
        Actions.tela3detalheprodutoefrete()
    }

    statusSolicitacao(id) {
        console.log(id);
        switch (id) {
            case '1':
                return 'Solicitado pelo filho';
                break;
            default:
                return 'Status não identificado';
                break;
        }
    }

    validaImagem(F) {
        if (F != 'sem foto' && F != '0') {
            return (
                <Image style={{width: 100, height: 110}} source={{uri: URL_ADMIN_FUTURONERD + `/uploads/${F}`}}/>
            )
        } else {
            return (
                <Image style={{width: 100, height: 110}} source={{uri: URL_ADMIN_FUTURONERD + `/images/semfoto2.jpg`}}/>
            )
        }
    }

    render() {
        if (this.props.lista_produtos_solicitados_filho.length > 0) {
            return (
                <Container style={{backgroundColor: '#ffffff'}}>
                    <ImageBackground style={{flex: 1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}}
                                     source={require('../../../imgs/background-t3.jpg')}>
                        <Menu tipo="paiVoltar"/>
                        <Content>
                            <List padder>
                                <ListItem itemDivider style={{
                                    backgroundColor: "#b7eaff",
                                    justifyContent: "center",
                                    paddingTop: 2,
                                    paddingBottom: 6
                                }}>
                                    <Icon style={{fontSize: 18, color: '#338fb5'}} ios='ios-cart' android='md-cart'/>
                                    <Text style={{fontSize: 15, color: '#338fb5'}}> Lista de Produtos</Text>
                                </ListItem>
                            </List>
                            <View style={{padding: 10}}>
                                {this.props.lista_produtos_solicitados_filho.map((produto, index) => {
                                    if (!produto.status_pagamento) {
                                        return (
                                            <TouchableOpacity key={index} onPress={() => this.abrirTela3(produto.p_id)}>
                                                <View style={{
                                                    backgroundColor: "#ffffff",
                                                    borderWidth: 1.5,
                                                    borderLeftWidth: 4,
                                                    borderRightWidth: 4,
                                                    borderColor: "#000000",
                                                    flexDirection: 'row',
                                                    overflow: 'hidden',
                                                    marginVertical: 10
                                                }}>
                                                    {this.validaImagem(produto.p_foto)}
                                                    <View style={{padding: 10, flex: 1}}>
                                                        <Text style={{
                                                            fontWeight: 'bold',
                                                            fontSize: 18
                                                        }}>{produto.p_nome_produto}</Text>
                                                        <Text>{produto.p_descricao}</Text>
                                                        <Text style={{
                                                            fontWeight: 'bold',
                                                            fontSize: 15,
                                                            color: "#13a7df"
                                                        }}><Icon name="trophy"
                                                                 style={{color: "#13a7df"}}/> {produto.p_preco}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    } else {
                                        return (
                                            <View key={index.toString()} style={{
                                                backgroundColor: "#ffffff",
                                                borderWidth: 1.5,
                                                borderLeftWidth: 4,
                                                borderRightWidth: 4,
                                                borderColor: "#000000",
                                                flexDirection: 'row',
                                                overflow: 'hidden',
                                                marginVertical: 10
                                            }}>
                                                {this.validaImagem(produto.p_foto)}
                                                <View style={{padding: 10, flex: 1}}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 18
                                                    }}>{produto.p_nome_produto}</Text>
                                                    <Text>{produto.p_descricao}</Text>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 15,
                                                        color: "#13a7df"
                                                    }}><Icon name="trophy"
                                                             style={{color: "#13a7df"}}/> {produto.p_preco}</Text>

                                                    <Text>{'\n'}<Text style={{fontWeight:'bold'}}>Status Pedido:</Text>{'\n'}{this.arr_list_status_pedido[produto.pp_status_pedido]}{'\n'}</Text>
                                                    <Text><Text style={{fontWeight:'bold'}}>Status Pagamento:</Text>{'\n'}{this.arr_list_status_pagamento[produto.status_pagamento]}{'\n'}</Text>
                                                </View>
                                            </View>
                                        )
                                    }
                                })}
                            </View>
                        </Content>
                        {/*<Rodape atual="pedidos_filho_pai" />*/}
                    </ImageBackground>
                </Container>
            )
        } else {
            return (
                <Container style={{backgroundColor: '#ffffff'}}>
                    <ImageBackground style={{flex: 1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}}
                                     source={require('../../../imgs/background-t3.jpg')}>

                        <Menu tipo="paiVoltar"/>
                        <Content>
                            <List padder>
                                <ListItem itemDivider style={{
                                    backgroundColor: "#b7eaff",
                                    justifyContent: "center",
                                    paddingTop: 2,
                                    paddingBottom: 6
                                }}>
                                    <Icon style={{fontSize: 18, color: '#338fb5'}} ios='ios-cart' android='md-cart'/>
                                    <Text style={{fontSize: 15, color: '#338fb5'}}> Lista de Produtos</Text>
                                </ListItem>
                            </List>
                            <View style={{padding: 10}}>
                                {/*<View style={{padding:10,flex:1}}>
                                    <Text style={{fontWeight:'bold',fontSize:20, textAlign:'center'}}>
                                        <Icon name="ios-alarm" />
                                        <Text> Lista de Produtos </Text>
                                    </Text>
                                    <Text style={{fontSize:15, textAlign:'center'}}> Solicitados por: {this.props.lista_filhos.filter(this.filhoSelecionado)[0].nome}</Text>
                                </View>
                                <View style={{padding:10,flex:1}}>
                                    <Text style={{fontWeight:'bold',fontSize:15, textAlign:'left'}}>
                                        <Text>Não foram encontrados produtos solicitados para o filhos selecionado.</Text>
                                    </Text>
                                </View>*/}
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 18,
                                    marginVertical: 10,
                                    color: '#000000',
                                    marginTop: 20,
                                    marginBottom: 20
                                }}>Não foram encontrados <Text style={{fontWeight: 'bold'}}>Produtos
                                    Solicitados</Text> pelo <Text style={{fontWeight: 'bold'}}>Filho</Text> selecionado!</Text>
                            </View>
                        </Content>
                        <Rodape atual="pedidos_filho_pai"/>
                    </ImageBackground>
                </Container>
            )
        }
    }
}


const mapStateToProps = state => ({
    id_filho_selecionado: state.AppPaiProdutoReducer.id_filho_selecionado,
    lista_filhos: state.AppPaiProdutoReducer.lista_filhos,
    lista_produtos_solicitados_filho: state.AppPaiProdutoReducer.lista_produtos_solicitados_filho
});

export default connect(mapStateToProps, {produtosSolicitadosFilho, atualizarIDProdutoSelecionado})(Tela2ListaProduto);

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20
    },
    header: {
        backgroundColor: '#f5f5f5',
        padding: 10
    },
    content: {
        padding: 10
    }
});
