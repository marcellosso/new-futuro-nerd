/**
 * Com os dados de envio e valores de frete esta tela deve possuir os campo para que o usuário informe os dados de
 * cartão de crédito e realize a finalização da compra.
 */

import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    RadioButton,
    Picker,
    ImageBackground
} from 'react-native';
import {
    Container,
    Content,
    Header,
    Left,
    Right,
    Body,
    Button,
    Icon,
    Form,
    Item,
    Input,
    Card,
    CardItem,
    ListItem, List
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {TextInputMask} from 'react-native-masked-text';
import {Alert} from 'react-native';

import {
    finalizarCompra, setCreditCardData, getPaymentSession, getCreditCardToken, getCreditCardBrand
} from '../../../actions/AppPaiProdutoActions';
import Rodape from '../Rodape';

import {URL_ADMIN_FUTURONERD} from '../../../config/Constants';
import Menu from "../../../config/Menu";

class Tela4ConclusaoCompraPagamento extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numero_cartao: '4716573889435049',
            nome_no_cartao: 'João de Deus',
            mes_validade: '04',
            ano_validade: '2021',
            codigo_seguranca: '632',
            payment_session: this.props.payment_session,
            credit_card_token: ''
        }
    }

    _getPaymentSession(){
        if(!this.props.payment_session){
            this.props.getPaymentSession();
            this.setState({...this.state, payment_session: this.props.payment_session});
        }else{
            alert(this.state.payment_session);
            this.setState({...this.state, payment_session: this.props.payment_session});
        }
    }

    _getCreditCardToken(){
        if(!this.props.credit_card_token && this.props.payment_session){
            let frete = this.props.lista_frete.filter(this.freteSelecionado)[0]
            let credit_card = {
                sessionId: this.props.payment_session,
                amount: frete.price,
                cardNumber: this.state.numero_cartao,
                cardBrand: this.props.credit_card_brand,
                cardCvv: this.state.codigo_seguranca,
                cardExpirationMonth: this.state.mes_validade,
                cardExpirationYear: this.state.ano_validade
            }

            // let credit_card_array = Object.keys(credit_card).map(function(key) {
            //     return [(key), credit_card[key]];
            // });


            console.log(credit_card);
            this.props.getCreditCardToken(credit_card);
        }
    }

    _getCreditCardBrand(){
        this.props.getCreditCardBrand(this.props.payment_session, this.state.numero_cartao.substr(0,6));
    }

    produtoSelecionado = produtos => produtos.p_id === this.props.id_produto_selecionado && produtos.pp_id_filho === this.props.id_filho_selecionado;
    produto;

    _render_produto() {
        this.produto = this.props.lista_produtos_solicitados_filho.filter(this.produtoSelecionado)[0]
        return (
            <View>
                <Text>Produto</Text>
                <View style={{
                    borderWidth: 1.5,
                    flexDirection: 'row',
                    borderRadius: 10,
                    borderColor: '#ccc',
                    overflow: 'hidden',
                    marginVertical: 10
                }}>
                    <Image style={{width: 100, height: 125, alignItems: "center"}}
                           source={{uri: URL_ADMIN_FUTURONERD + '/uploads/' + produto.p_foto}}/>
                    <View style={{padding: 10, flex: 1}}>
                        <Text style={{fontWeight: 'bold', fontSize: 17}}>Produto: {produto.p_nome_produto}</Text>
                        <Text>Desctição: {produto.p_descricao}</Text>
                        <Text>Categoria: {produto.cp_categoria}</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>
                            <Icon name="trophy"/>
                            <Text>{produto.p_preco}</Text>
                        </Text>
                        <Text>Solicitado por: {produto.cf_nome}</Text>
                    </View>
                </View>
            </View>
        )
    }

    freteSelecionado = frete => frete.code === this.props.code_frete_selecionado;

    _render_frete() {
        let frete = this.props.lista_frete.filter(this.freteSelecionado)[0]
        return (
            <View>
                <Text>Frete</Text>
                <View style={{
                    borderWidth: 1.5,
                    flexDirection: 'row',
                    borderRadius: 10,
                    borderColor: '#ccc',
                    overflow: 'hidden',
                    marginVertical: 10
                }}>
                    <View>
                        <Text>Código: {frete.code}</Text>
                        <Text>Serviço: {frete.name}</Text>
                        <Text>Valor: R$ {frete.price.toFixed(2).replace('.', ',')}</Text>
                        <Text>Tempo: {frete.deadline} dias</Text>
                    </View>
                </View>
            </View>
        )
    }

    _render_endereco_entrega() {
        return (
            <View>
                <Text>Endereço de Entrega</Text>
                <View style={{
                    borderWidth: 1.5,
                    flexDirection: 'row',
                    borderRadius: 10,
                    borderColor: '#ccc',
                    overflow: 'hidden',
                    marginVertical: 10
                }}>
                    <View>
                        <Text>Nome:{this.props.endereco_frete.nome}</Text>
                        <Text>Cep:{this.props.endereco_frete.cep}</Text>
                        <Text>Logradouro:{this.props.endereco_frete.logradouro}</Text>
                        <Text>Número:{this.props.endereco_frete.numero}</Text>
                        <Text>Bairro:{this.props.endereco_frete.bairro}</Text>
                        <Text>Cidade:{this.props.endereco_frete.cidade}</Text>
                        <Text>UF:{this.props.endereco_frete.uf}</Text>
                    </View>
                </View>
            </View>
        )
    }

    _render_pagamento() {

        return (
            <View style={{padding: 15}}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 18,
                    marginVertical: 10,
                    color: '#000000',
                    marginTop: 20,
                    marginBottom: 20,
                    fontWeight: 'bold'
                }}>- Pagamento via Cartão de Crédito -</Text>
                <View style={{
                    backgroundColor: "#ffffff",
                    borderWidth: 1.5,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomWidth: 4,
                    borderColor: "#000000",
                    flexDirection: 'row',
                    overflow: 'hidden',
                    marginVertical: 10
                }}>
                    <View>
                        {/* <Text>Número do Cartão de Crédito *</Text> */}
                        <TextInput placeholder='Número do Cartão de Crédito' value={this.state.numero_cartao}
                                   onChangeText={(numero_cartao) => this.setState({numero_cartao})}/>
                        {/* <Text>Nome no Cartão *</Text> */}
                        <TextInput placeholder='Nome no Cartão' value={this.state.nome_no_cartao}
                                   onChangeText={(nome_no_cartao) => this.setState({nome_no_cartao})}/>
                        {/* <Text>Data de Validade *</Text> */}
                        <TextInput placeholder='Mês de Validade' value={this.state.mes_validade}
                                   onChangeText={(mes_validade) => this.setState({mes_validade})}/>
                        <TextInput placeholder='Ano de Validade' value={this.state.ano_validade}
                                   onChangeText={(ano_validade) => this.setState({ano_validade})}/>
                        {/* <Text>Código de Verificação do Cartão *</Text> */}
                        <TextInput placeholder='Código de Verificação do Cartão' value={this.state.codigo_seguranca}
                                   onChangeText={(codigo_seguranca) => this.setState({codigo_seguranca})}/>
                    </View>
                </View>
                <View>
                    <Text>Session ID: {this.props.payment_session}</Text>
                </View>
                <Button block style={styles.btnST1} onPress={() => this._getPaymentSession()}>
                    <Text style={styles.txtBotao2}>Get Payment Session</Text>
                </Button>

                <View>
                    <Text>Credit Card Brand: {this.props.credit_card_brand}</Text>
                </View>
                <Button block style={styles.btnST1} onPress={() => this._getCreditCardBrand()}>
                    <Text style={styles.txtBotao2}>Get Credit Card Brand</Text>
                </Button>

                <View>
                    <Text>Credit Card Token: {this.props.credit_card_token}</Text>
                </View>
                <Button block style={styles.btnST1} onPress={() => this._getCreditCardToken()}>
                    <Text style={styles.txtBotao2}>Get Credit Card Token</Text>
                </Button>
            </View>
        )
    }

    render() {
        return (
            <Container style={{backgroundColor: '#ffffff'}}>
                <ImageBackground style={{flex: 1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}}
                                 source={require('../../../imgs/background-t3.jpg')}>
                    <Menu tipo="paiVoltar"/>
                    {/*<Header style={{marginTop:24}}>
                      <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                          <Icon name='arrow-back' />
                        </Button>
                      </Left>
                      <Body>
                        <Text>Finalizar Compra</Text>
                      </Body>
                      <Right/>
                    </Header>*/}
                    <Content>
                        <List padder>
                            <ListItem itemDivider style={{
                                backgroundColor: "#b7eaff",
                                justifyContent: "center",
                                paddingTop: 2,
                                paddingBottom: 6
                            }}>
                                <Icon style={{fontSize: 18, color: '#338fb5'}} ios='ios-trophy' android='md-trophy'/>
                                <Text style={{fontSize: 15, color: '#338fb5'}}> Finalizar Compra</Text>
                            </ListItem>
                        </List>
                        <View>
                            {this._render_pagamento()}
                            <Button block style={styles.btnST1} onPress={() => this._finalizaPagamento()}><Text
                                style={styles.txtBotao2}>Finalizar Compra</Text></Button>
                            {this._render_produto()}
                            {this._render_endereco_entrega()}
                            {this._render_frete()}
                        </View>
                    </Content>
                    {/*<Rodape atual="estatisticas"/>*/}
                </ImageBackground>
            </Container>
        )
    }

    _finalizaPagamento() {

        let produto = this.props.lista_produtos_solicitados_filho.filter(this.produtoSelecionado)[0]
        let frete = this.props.lista_frete.filter(this.freteSelecionado)[0]
        /**<Text>Nome:{this.props.endereco_frete.nome}</Text>
         <Text>Cep:{this.props.endereco_frete.cep}</Text>
         <Text>Logradouro:{this.props.endereco_frete.logradouro}</Text>
         <Text>Bairro:{this.props.endereco_frete.bairro}</Text>
         <Text>Cidade:{this.props.endereco_frete.cidade}</Text>
         <Text>UF:{this.props.endereco_frete.uf}</Text> */

        let creditCard = {
            numero_cartao: this.state.numero_cartao,
            nome_no_cartao: this.state.nome_no_cartao,
            mes_validade: this.state.mes_validade,
            ano_validade: this.state.ano_validade,
            codigo_seguranca: this.state.codigo_seguranca,
            brand: this.props.credit_card_brand,
            token: this.props.credit_card_token
        }
        let objPagamento = {
            session: this.props.payment_session,
            sender: {
                name: this.props.nome_pai,
                email: 'c47502983625116346369@sandbox.pagseguro.com.br', //this.props.email_pai,
                phone: {
                    areaCode: this.props.telefone_pai.substring(1, 3),
                    number: this.props.telefone_pai.substring(5, this.props.telefone_pai.length).replace("-", ""),
                },
                document: {
                    type: 'CPF',
                    value: this.props.cpf_pai.replace(/\./g, "").replace("-", "")
                },
            },
            shipping: {
                type: 3,
                cost: frete.price,
                street: this.props.endereco_frete.logradouro,
                number: this.props.endereco_frete.numero,
                complement: '',
                district: this.props.endereco_frete.bairro,
                city: this.props.endereco_frete.cidade,
                state: this.props.endereco_frete.uf,
                country: 'BRA',
                postalCode: this.props.endereco_frete.cep
            },
            billing: {
                street: this.props.endereco_frete.logradouro,
                number: this.props.endereco_frete.numero,
                complement: '',
                district: this.props.endereco_frete.bairro,
                city: this.props.endereco_frete.cidade,
                state: this.props.endereco_frete.uf,
                country: 'BRA',
                postalCode: this.props.endereco_frete.cep
            },
            items: [
                {
                    id: 1,
                    description: produto.p_descricao,
                    quantity: 1,
                    amount: 0
                }

            ],

            creditCard: {
                maxInstallmentNoInterest: 0 // parcelas com desconto
            },
            extraAmount: 0.00,
            reference: this.props.id_produto_selecionado
        };

        let objFinalizaCompra = {
            pagamento: objPagamento,
            produto,
            frete,
            creditCard,
            id_pai: produto.cf_id_pai,
            id_filho: produto.cf_id
        }
        this.props.finalizarCompra(objFinalizaCompra);
        console.log(objFinalizaCompra);
        Alert.alert('Compra finalizada com sucesso!')
    }
}

const mapStateToProps = state => ({
    id_filho_selecionado: state.AppPaiProdutoReducer.id_filho_selecionado,
    lista_produtos_solicitados_filho: state.AppPaiProdutoReducer.lista_produtos_solicitados_filho,
    id_produto_selecionado: state.AppPaiProdutoReducer.id_produto_selecionado,
    lista_frete: state.AppPaiProdutoReducer.lista_frete,
    code_frete_selecionado: state.AppPaiProdutoReducer.code_frete_selecionado,
    endereco_frete: state.AppPaiProdutoReducer.endereco_frete,

    payment_session: state.AppPaiProdutoReducer.payment_session,
    credit_card_token: state.AppPaiProdutoReducer.credit_card_token,
    credit_card_brand: state.AppPaiProdutoReducer.credit_card_brand,
    credit_card_data: state.AppPaiProdutoReducer.credit_card_data,

    id_pai: state.AppReducer.idPaiAtual,
    nome_pai: state.AppReducer.nomePaiAtual,
    email_pai: state.AppReducer.emailPaiAtual,
    telefone_pai: state.AppReducer.telefonePaiAtual,
    cpf_pai: state.AppReducer.cpfPaiAtual
});


export default connect(mapStateToProps, {
    finalizarCompra,
    setCreditCardData,
    getPaymentSession,
    getCreditCardToken,
    getCreditCardBrand
})(Tela4ConclusaoCompraPagamento);

const styles = StyleSheet.create({
    FormItem: {
        backgroundColor: "#ffffff",
        padding: 0,
        margin: 0,
        borderColor: "#000000",
        borderLeftWidth: 4,
        borderBottomWidth: 0,
        marginTop: 0,
        marginBottom: 10
    },
    FormItem2: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 0,
        margin: 0,
        borderColor: "#000000",
        borderLeftWidth: 4,
        borderBottomWidth: 0,
        marginTop: 0,
        marginBottom: 10
    },
    FormIcon: {
        marginLeft: 15,
        color: "#000000"
    },
    btnST1: {
        backgroundColor: "#000000",
        margin: 15,
        marginTop: 10
    },
    btnST2: {
        backgroundColor: "#13a7df",
        margin: 15,
        marginTop: 10
    },
    txtBotao2: {
        color: '#ffffff',
        fontSize: 18
    }
});
