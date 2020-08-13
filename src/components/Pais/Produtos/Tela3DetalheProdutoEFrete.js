/**
 * Deve lista os detalhes da solicitação como Detalhes do produto,
 * Detalhes do filho solicitante, Informações sobre o status da solicitação.
 * DE acordo com o Status deverá ser exibida mesagem de acomanhamento ou campos para realizar calculo do frete.
 * Por padrão a tela deve vir carregada com os dados de endereço do pai, sendo possível informar um novo cep e
 * atualizar o endereço de envio.
 * Ao selecionar o frete o deverá ser exibido botão para  direcionar até a tela de finalização do pagamento, Tela 4
 */


import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    RadioButton,
    ImageBackground,
    Dimensions, ActivityIndicator
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
import {
    Alert,
    UIManager,
    findNodeHandle
} from 'react-native';

import {
    consultaEndereco,
    consultaFrete,
    atualizarCodeFreteSelecionado,
    atualizarEnderecoFreteSelecionado,
    limpaConsultaFrete,
    finalizarCompra,
    setCreditCardData,
    getPaymentSession,
    getCreditCardToken,
    getCreditCardBrand,
    limpaDadosFinalizaPagamento
} from '../../../actions/AppPaiProdutoActions';
import Rodape from '../Rodape';

import {URL_ADMIN_FUTURONERD, URL_CONSULTA_CEP} from '../../../config/Constants';
import Menu from "../../../config/Menu";


class Tela3DetalheProdutoEFrete extends React.Component {

    // Filter
    produtoSelecionado = produtos => produtos.p_id === this.props.id_produto_selecionado && produtos.pp_id_filho === this.props.id_filho_selecionado;
    freteSelecionado = frete => frete.code === this.props.code_frete_selecionado;
    filtroPac = fretes => fretes.name === 'PAC'
    filtroSedex = fretes => fretes.name === 'Sedex'

    constructor(props) {
        super(props);
        this.state = {
            produto_cep: this.props.endereco_envio_produto_cep,
            produto_uf: this.props.endereco_envio_produto_uf,
            produto_cidade: this.props.endereco_envio_produto_cidade,
            produto_bairro: this.props.endereco_envio_produto_bairro,
            produto_logradouro: this.props.endereco_envio_produto_logradouro,
            produto_numero: this.props.endereco_envio_produto_numero,
            consulta_cep: this.props.cepPaiAtual,
            produto_complemento: '',
            produto_editar_endereco: true,

            numero_cartao: '4716573889435049',
            nome_no_cartao: 'João de Deus',
            mes_validade: '04',
            ano_validade: '2021',
            codigo_seguranca: '632',
            payment_session: this.props.payment_session,
            credit_card_token: '',
            credit_card_brand: '',

            screenHeight: Dimensions.get('window').height,
            screenWidth: Dimensions.get('window').width,

            loading_view_Bt_CalcularFrete: false,
            loading_view_Bt_SelecaoFrete_1: false,
            loading_view_Bt_SelecaoFrete_2: false
        }

        this.props.limpaDadosFinalizaPagamento()
    }

    componentWillMount() {
        this.setState({
            produto_cep: this.props.cepPaiAtual,
            produto_uf: this.props.ufPaiAtual,
            produto_cidade: this.props.cidadePaiAtual,
            produto_bairro: this.props.bairroPaiAtual,
            produto_logradouro: this.props.logradouroPaiAtual,
            produto_numero: this.props.numeroPaiAtual,
            consulta_cep: this.props.cepPaiAtual
        })
        //this._validarInicioPagamento();
        this._getPaymentSession();
    }

    // componentWillReceiveProps(){
    //     this.setState({
    //         produto_cep: this.props.cepPaiAtual,
    //         produto_uf: this.props.ufPaiAtual,
    //         produto_cidade: this.props.cidadePaiAtual,
    //         produto_bairro: this.props.bairroPaiAtual,
    //         produto_logradouro: this.props.logradouroPaiAtual,
    //         produto_numero: this.props.numeroPaiAtual,
    //         consulta_cep: this.props.cepPaiAtual
    //     })
    // }

    componentWillReceiveProps() {
        //this._validarInicioPagamento();
    }

    _getPaymentSession() {
        console.log('_getPaymentSession');
        if (!this.props.payment_session) {
            this.props.getPaymentSession(() => {
                this.setState({payment_session: this.props.payment_session});
            });
        } else {
            this.setState({payment_session: this.props.payment_session});
        }
    }

    _getCreditCardToken(callback) {
        if (!this.props.credit_card_token && this.props.payment_session) {
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
            console.log(credit_card);
            this.props.getCreditCardToken(credit_card, () => {
                this.setState({credit_card_token: this.props.credit_card_token});
                // alert(this.state.credit_card_token);
                callback();
            });
        } else {
            callback();
        }
    }

    _getCreditCardBrand() {
        if (this.state.numero_cartao.length >= 6 && this.props.credit_card_brand == '') {
            this.props.getCreditCardBrand(this.props.payment_session, this.state.numero_cartao.substr(0, 6),
                () => {
                    this.setState({credit_card_brand: this.props.credit_card_brand});
                })
        } else {
            this.setState({credit_card_brand: this.props.credit_card_brand});
        }
    }

    _atualizaDadosEnderecoNaTela(res) {
        this.setState({
            produto_cep: res.cep,
            produto_uf: res.uf,
            produto_cidade: res.localidade,
            produto_bairro: res.bairro,
            produto_logradouro: res.logradouro,
            produto_numero: '',
            produto_complemento: ''
        })
    }

    calcularFrete() {
        this.setState({loading_view_Bt_CalcularFrete:true});
        console.log('calcularFrete');
        this.setState({produto_editar_endereco: false});
        this._getPaymentSession();
        let produto = this.props.lista_produtos_solicitados_filho.filter(this.produtoSelecionado)[0];
        let objFrete = {
            cep_origem: `09750-220`,
            cep_destino: this.state.produto_cep,
            largura: produto.p_largura,
            altura: produto.p_altura,
            comprimento: produto.p_comprimento,
            peso: produto.p_peso,
            quantidade: 1
        };
        let objEndereco = {
            nome: this.props.nome_pai,
            cep: this.state.produto_cep,
            logradouro: this.state.produto_logradouro,
            numero: this.state.produto_numero,
            bairro: this.state.produto_bairro,
            cidade: this.state.produto_cidade,
            uf: this.state.produto_uf,
            complemento: this.state.produto_complemento
        };
        this.props.atualizarEnderecoFreteSelecionado(objEndereco);
        // console.log(objFrete);
        this.props.consultaFrete(objFrete);

        setTimeout(() => { this.scrollToEnd(); this.setState({loading_view_Bt_CalcularFrete:false}); }, 3000)

    }

    _onPressButtonSelecaoFrete(code) {
        this.props.atualizarCodeFreteSelecionado(code);
        setTimeout(() => { this.scrollToEnd(); this.setState({loading_view_Bt_SelecaoFrete_1:false}); this.setState({loading_view_Bt_SelecaoFrete_2:false}); }, 3000);
    }

    scrollToEnd = () => {
        //scrollYPos = this.state.screenHeight * 2;
        console.log('scrollToC1');
        this.scroller.scrollToEnd();
        //this.scroller.scrollTo({x: 10000, y: 10000, animated: true});
        console.log('scrollToC2');
    };

    selecaoFrete() {
        if (this.props.lista_frete.length > 0) {
            // pac = this.props.lista_frete.filter(this.filtroPac)[0]
            // sedex = this.props.lista_frete.filter(this.filtroSedex)[0]
            // console.log(sedex)
            return (
                <ScrollView>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 18,
                        marginVertical: 10,
                        color: '#000000',
                        marginTop: 20,
                        marginBottom: 20,
                        fontWeight: 'bold'
                    }}>- Selecione o Frete -</Text>
                    <View
                        style={{padding: 10, flex: 1}}
                        onLayout={event => {
                            const layout = event.nativeEvent.layout;
                            console.log('height:', layout.height);
                            console.log('width:', layout.width);
                            console.log('x:', layout.x);
                            console.log('y:', layout.y);
                        }}
                        ref={(ref) => {
                            this.ListView_Ref = ref;
                        }}
                    >
                        {this.props.lista_frete.map((frete, index) => {
                            if (Object.keys(frete.error).length > 0) {
                                return (
                                    <View key={index}>
                                        <Text>Serviço: {frete.name}</Text>
                                        <Text>Code: {frete.error.code}</Text>
                                        <Text>Mensagem: {frete.error.message}</Text>
                                    </View>
                                )
                            } else {
                                if (frete.code == this.props.code_frete_selecionado) {
                                    console.log('Selecionado' + frete.code + ' # ' + this.props.code_frete_selecionado);
                                    return (
                                        <TouchableOpacity onPress={() => { this._onPressButtonSelecaoFrete(frete.code); this.setState({loading_view_Bt_SelecaoFrete_1:true}); this.setState({loading_view_Bt_SelecaoFrete_2:true}); }}
                                                          key={index}>
                                            <CardItem style={{
                                                margin: 10,
                                                borderRadius: 4,
                                                backgroundColor: '#cc3300',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>

                                                {(() => { // # MXTera --- Fix
                                                    console.log("###111"+this.state.loading_view_Bt_SelecaoFrete_1);
                                                    console.log("###222"+this.state.loading_view_Bt_SelecaoFrete_2);
                                                        if(this.state.loading_view_Bt_SelecaoFrete_1 || this.state.loading_view_Bt_SelecaoFrete_2){
                                                            return (
                                                                <ActivityIndicator color="#ffffff" size='small' />
                                                            )
                                                        }else {
                                                            return (
                                                                <Text style={{
                                                                    color: '#fff',
                                                                    fontWeight: 'bold'
                                                                }}>{frete.name} Valor:
                                                                R$ {frete.price.toString().replace('.', ',')} Prazo: {frete.deadline} dias
                                                                úteis</Text>
                                                            )
                                                        }
                                                })()}

                                            </CardItem>
                                        </TouchableOpacity>
                                    )
                                } else {
                                    console.log('Não Selecionado' + frete.code + ' # ' + this.props.code_frete_selecionado);
                                    return (
                                        <TouchableOpacity onPress={() => { this._onPressButtonSelecaoFrete(frete.code); this.setState({loading_view_Bt_SelecaoFrete_1:true}); this.setState({loading_view_Bt_SelecaoFrete_2:true}); }}
                                                          key={index}>
                                            <CardItem style={{
                                                margin: 10,
                                                borderRadius: 4,
                                                backgroundColor: '#fff',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Text style={{
                                                    color: '#000',
                                                    fontWeight: 'bold'
                                                }}>{frete.name} Valor:
                                                    R$ {frete.price.toString().replace('.', ',')} Prazo: {frete.deadline} dias
                                                    úteis</Text>
                                            </CardItem>
                                        </TouchableOpacity>
                                    )
                                }
                            }
                        })}
                    </View>
                </ScrollView>
            )
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


    detalhesProduto() {
        let produto = this.props.lista_produtos_solicitados_filho.filter(this.produtoSelecionado)[0]
        console.log(produto);
        console.log('Passou');
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
                }}>- Detalhes do Produto -</Text>
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
                    {/*<Image style={{width:100,height:110}} source={{uri: URL_ADMIN_FUTURONERD + '/uploads/' + produto.p_foto}} />*/}
                    {this.validaImagem(produto.p_foto)}
                    <View style={{padding: 10, flex: 1}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>{produto.p_nome_produto}</Text>
                        <Text>{produto.p_descricao}</Text>
                        <Text></Text>
                        <Text><Text style={{fontWeight: 'bold'}}>Categoria:</Text> {produto.cp_categoria}</Text>
                        <Text><Text style={{fontWeight: 'bold'}}>Altura:</Text> {produto.p_altura}</Text>
                        <Text><Text style={{fontWeight: 'bold'}}>Largura:</Text> {produto.p_largura}</Text>
                        <Text><Text style={{fontWeight: 'bold'}}>Comprimento:</Text> {produto.p_comprimento}</Text>
                        <Text></Text>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: "#13a7df"}}><Icon name="trophy"
                                                                                                 style={{color: "#13a7df"}}/> {produto.p_preco}
                        </Text>
                    </View>
                </View>
            </View>

        )
    }

    consultaEndereco() {
        this.props.consultaEndereco(this.state.produto_cep);
        return fetch(URL_CONSULTA_CEP + this.state.produto_cep + '/json/unicode/')
            .then((res_endereco) => res_endereco.json())
            .then((res_endereco) => {
                if (res_endereco.erro) {
                    Alert.alert(
                        'Consulta endereço',
                        'Endereço não encontrado para o CEP ' + this.state.cep + '.',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                    );
                } else {
                    Alert.alert(
                        'Consulta endereço',
                        'Endereço encontrado! \n Cep: ' + res_endereco.cep +
                        ' \n Logradouro: ' + res_endereco.logradouro +
                        //' \n Complemento: ' + res_endereco.complemento +
                        ' \n Bairro: ' + res_endereco.bairro +
                        ' \n Localidade: ' + res_endereco.localidade +
                        ' \n UF: ' + res_endereco.uf
                        ,
                        [
                            {
                                text: 'Utilizar endereço', onPress: () => {
                                    this.setState({produto_editar_endereco: true});
                                    this._atualizaDadosEnderecoNaTela(res_endereco);
                                    this.props.limpaConsultaFrete();
                                    this._onPressButtonSelecaoFrete(null)
                                }
                            },
                            {text: 'Não utilizar endereço', onPress: () => console.log('Não utilizar endereco!')},
                        ],
                        {cancelable: false},
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    renderDadosCartaoDeCredito() {
        if (this.props.code_frete_selecionado) {
            return (
                <ScrollView>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 18,
                        marginVertical: 10,
                        color: '#000000',
                        marginTop: 20,
                        marginBottom: 20,
                        fontWeight: 'bold'
                    }}>- Pagamento - Cartão de Crédito -</Text>
                    <View style={{alignItems: 'center'}}><Image
                        source={require('../../../imgs/tPagamentosPagS_t2.png')}/></View>
                    <View style={{marginTop: 15, paddingLeft: 15, paddingRight: 15}}>
                        <Item last style={styles.FormItem3}>
                            <Input
                                placeholder='Número do Cartão de Crédito'
                                style={{textAlign: 'center'}}
                                value={this.state.numero_cartao}
                                onChangeText={(numero_cartao) => {
                                    this.setState({numero_cartao});
                                    this._getCreditCardBrand()
                                }}
                            />
                        </Item>
                        <Item last style={styles.FormItem3}>
                            <Input
                                placeholder='Nome no Cartão'
                                style={{textAlign: 'center'}}
                                value={this.state.nome_no_cartao}
                                onChangeText={(nome_no_cartao) => this.setState({nome_no_cartao})}
                            />
                        </Item>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Item last style={[styles.FormItem3, {width: '48%'}]}>
                                <Input
                                    placeholder='Mês'
                                    style={{textAlign: 'center'}}
                                    value={this.state.mes_validade}
                                    onChangeText={(mes_validade) => this.setState({mes_validade})}
                                />
                            </Item>
                            <Item last style={[styles.FormItem3, {width: '48%', marginLeft: '4%'}]}>
                                <Input
                                    placeholder='Ano'
                                    style={{textAlign: 'center'}}
                                    value={this.state.ano_validade}
                                    onChangeText={(ano_validade) => this.setState({ano_validade})}
                                />
                            </Item>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Item last style={[styles.FormItem3, {width: '50%'}]}>
                                <Input
                                    placeholder='CVC'
                                    style={{textAlign: 'center'}}
                                    value={this.state.codigo_seguranca}
                                    onChangeText={(codigo_seguranca) => this.setState({codigo_seguranca})}
                                />
                            </Item>
                        </View>
                    </View>
                    <Button block style={styles.btnST1}
                            onPress={() => this._finalizarCompra()}><Text style={styles.txtBotao2}>Finalizar
                        Compra</Text></Button>
                </ScrollView>
            )
        }
    }

    _finalizarCompra() {
        this._getCreditCardToken(() => {
            this._finalizaPagamento();
        });
    }

    _finalizaPagamento() {
        console.log('_finalizaPagamento');
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
                complement: this.state.produto_complemento,
                district: this.props.endereco_frete.bairro,
                city: this.props.endereco_frete.cidade,
                state: this.props.endereco_frete.uf,
                country: 'BRA',
                postalCode: this.props.endereco_frete.cep
            },
            billing: {
                street: this.props.endereco_frete.logradouro,
                number: this.props.endereco_frete.numero,
                complement: this.state.produto_complemento,
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

        this.props.limpaDadosFinalizaPagamento()

        Alert.alert(
            'Atenção!',
            'Compra finalizada com sucesso.',
            [
                {text: 'OK', onPress: () => Actions.pop()},
            ],
            {cancelable: false},
        );
    }

    view_bt_CalcularFrete(){
        if(this.state.loading_view_Bt_CalcularFrete){
            return (
                <Button block style={styles.btnST4} onPress={() => this.calcularFrete()}>
                    <ActivityIndicator color="#ffffff" size='small' />
                </Button>
            );
        } else {
            return (
                <Button block style={styles.btnST2} onPress={() => this.calcularFrete()}>
                    <Text
                        style={styles.txtBotao2}>Calcular Frete</Text>
                </Button>
            )
        }
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: '#ffffff'}} ref={(scroller) => {this.scroller = scroller}} >
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
                                <Icon style={{fontSize: 18, color: '#338fb5'}} ios='ios-trophy' android='md-trophy'/>
                                <Text style={{fontSize: 15, color: '#338fb5'}}> Produto Solicitado</Text>
                            </ListItem>
                        </List>
                        {this.detalhesProduto()}
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 18,
                            marginVertical: 10,
                            color: '#000000',
                            marginTop: 15,
                            marginBottom: 20,
                            fontWeight: 'bold'
                        }}>- Dados de Endereço de Envio -</Text>
                        <View style={{marginTop: 15, paddingLeft: 15, paddingRight: 15}}>
                            <Item last style={styles.FormItem}>
                                <Icon active style={styles.FormIcon} name="create"/>
                                <Input
                                    placeholder='Cep'
                                    value={this.state.produto_cep}
                                    onChangeText={texto => this.setState({produto_cep: texto})}
                                />
                                <Button block style={styles.btnST3} onPress={() => this.consultaEndereco()}>
                                    <Icon active style={styles.FormIcon2} name="search"/>
                                </Button>
                            </Item>
                            <Item last style={styles.FormItem}>
                                <Icon active style={styles.FormIcon} name="create"/>
                                <Input
                                    placeholder='Logradouro'
                                    value={this.state.produto_logradouro}
                                    onChangeText={texto => this.setState({produto_logradouro: texto})}
                                    editable={this.state.produto_editar_endereco}
                                />
                            </Item>
                            <Item last style={styles.FormItem}>
                                <Icon active style={styles.FormIcon} name="create"/>
                                <Input
                                    placeholder='Número'
                                    value={this.state.produto_numero}
                                    onChangeText={texto => this.setState({produto_numero: texto})}
                                    editable={this.state.produto_editar_endereco}
                                />
                            </Item>
                            <Item last style={styles.FormItem}>
                                <Icon active style={styles.FormIcon} name="create"/>
                                <Input
                                    placeholder='Complemento'
                                    value={this.state.produto_complemento}
                                    onChangeText={texto => this.setState({produto_complemento: texto})}
                                    editable={this.state.produto_editar_endereco}
                                />
                            </Item>
                            <Item last style={styles.FormItem}>
                                <Icon active style={styles.FormIcon} name="create"/>
                                <Input
                                    placeholder='Bairro'
                                    value={this.state.produto_bairro}
                                    onChangeText={texto => this.setState({produto_bairro: texto})}
                                    editable={this.state.produto_editar_endereco}
                                />
                            </Item>
                            <Item last style={styles.FormItem}>
                                <Icon active style={styles.FormIcon} name="create"/>
                                <Input
                                    placeholder='Cidade'
                                    value={this.state.produto_cidade}
                                    onChangeText={texto => this.setState({produto_cidade: texto})}
                                    editable={this.state.produto_editar_endereco}
                                />
                            </Item>
                            <Item last style={styles.FormItem}>
                                <Icon active style={styles.FormIcon} name="create"/>
                                <Input
                                    placeholder='UF'
                                    value={this.state.produto_uf}
                                    onChangeText={texto => this.setState({produto_uf: texto})}
                                    editable={this.state.produto_editar_endereco}
                                />
                            </Item>
                        </View>
                        <View onLayout={({nativeEvent}) => {
                            this.setState({buttonTestePos: nativeEvent.layout})
                        }}>
                            {this.view_bt_CalcularFrete()}

                        </View>
                        <ScrollView>
                            {this.selecaoFrete()}
                            {this.renderDadosCartaoDeCredito()}
                        </ScrollView>
                    </Content>
                    {/*<Rodape atual="estatisticas" />*/}
                </ImageBackground>
            </ScrollView>
        )
    }


    _validarInicioPagamento() {
        validate = true;
        validate = this.props.nome_pai == ''
        validate = this.props.email_pai == ''
        validate = this.props.telefone_pai == ''
        validate = this.props.cpf_pai == ''
        validate = this.props.cepPaiAtual == ''
        validate = this.props.ufPaiAtual == ''
        validate = this.props.cidadePaiAtual == ''
        validate = this.props.bairroPaiAtual == ''
        validate = this.props.logradouroPaiAtual == ''
        validate = this.props.numeroPaiAtual == ''

        if (!validate) {
            Alert.alert(
                'Atenção!',
                'Para realizar o processo de compra, favor completar seu cadastro. Obrigado!',
                [
                    {
                        text: 'OK', onPress: () => {
                            //Actions.pop();
                            Actions.configuracoespai();
                        }
                    },
                ],
                {cancelable: false},
            );
        }
        // return validate
    }
}

const mapStateToProps = state => ({
    id_pai: state.AppReducer.idPaiAtual,
    nome_pai: state.AppReducer.nomePaiAtual,
    filhos: state.AppReducer.filhos,
    cepPaiAtual: state.AppReducer.cepPaiAtual,
    ufPaiAtual: state.AppReducer.ufPaiAtual,
    cidadePaiAtual: state.AppReducer.cidadePaiAtual,
    bairroPaiAtual: state.AppReducer.bairroPaiAtual,
    logradouroPaiAtual: state.AppReducer.logradouroPaiAtual,
    numeroPaiAtual: state.AppReducer.numeroPaiAtual,

    endereco_envio_produto_cep: state.AppReducer.endereco_envio_produto_cep,
    endereco_envio_produto_uf: state.AppReducer.endereco_envio_produto_uf,
    endereco_envio_produto_cidade: state.AppReducer.endereco_envio_produto_cidade,
    endereco_envio_produto_bairro: state.AppReducer.endereco_envio_produto_bairro,
    endereco_envio_produto_logradouro: state.AppReducer.endereco_envio_produto_logradouro,
    endereco_envio_produto_numero: state.AppReducer.endereco_envio_produto_numero,

    id_filho_selecionado: state.AppPaiProdutoReducer.id_filho_selecionado,
    lista_produtos_solicitados_filho: state.AppPaiProdutoReducer.lista_produtos_solicitados_filho,
    id_produto_selecionado: state.AppPaiProdutoReducer.id_produto_selecionado,
    lista_frete: state.AppPaiProdutoReducer.lista_frete,
    code_frete_selecionado: state.AppPaiProdutoReducer.code_frete_selecionado,

    payment_session: state.AppPaiProdutoReducer.payment_session,
    credit_card_token: state.AppPaiProdutoReducer.credit_card_token,
    credit_card_brand: state.AppPaiProdutoReducer.credit_card_brand,
    credit_card_data: state.AppPaiProdutoReducer.credit_card_data,

    email_pai: state.AppReducer.emailPaiAtual,
    telefone_pai: state.AppReducer.telefonePaiAtual,
    cpf_pai: state.AppReducer.cpfPaiAtual,
    endereco_frete: state.AppPaiProdutoReducer.endereco_frete
});

export default connect(mapStateToProps, {
    consultaEndereco,
    consultaFrete,
    atualizarCodeFreteSelecionado,
    atualizarEnderecoFreteSelecionado,
    limpaConsultaFrete,
    finalizarCompra,
    setCreditCardData,
    getPaymentSession,
    getCreditCardToken,
    getCreditCardBrand,
    limpaDadosFinalizaPagamento
})(Tela3DetalheProdutoEFrete);

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
    FormItem3: {
        backgroundColor: "#ffffff",
        padding: 0,
        margin: 0,
        marginBottom: 10
    },
    FormIcon: {
        marginLeft: 15,
        color: "#000000"
    },
    FormIcon2: {
        marginLeft: 15,
        color: "#eeeeee"
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
    btnST4: {
        backgroundColor: "#13a7df",
        margin: 15,
        marginTop: 10,
        color:"#ffffff"
    },
    btnST3: {
        backgroundColor: "#000000",
        margin: 0,
        marginTop: 0
    },
    txtBotao2: {
        color: '#ffffff',
        fontSize: 18
    }
});
