import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Card, CardItem, Text, Content, Body, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Loader from './loader';
import Menu from '../config/Menu';
import {
    modificaEstaCorreto, // # MXTera --
    buscaTotalQuestoes,
    buscaQuestoesRespondidas,
    buscaPergunta,
    buscaPerguntaErrada,
    cadastraResposta,
    getPtsFilho,
    updatePtsFilho
} from '../actions/AppFilhoActions';

import { URL_ADMIN_FUTURONERD } from '../config/Constants'

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

class Jogo extends React.Component {

    constructor(props) {
        cont = null;
        super(props);
        this.state = {
            loading: true,
            tempoTotal: 120,
            aleatorio: null,
            carregou: false,
            tempo_loading: 0

        }
        this.props.buscaTotalQuestoes(this.props.id_materia, this.props.id_serie);
        this.props.buscaQuestoesRespondidas(this.props.id_filho, this.props.id_materia, this.props.id_serie);
        this._puxaPergunta();
        // this.desativar_tempo_loadding();
    }

    ativarLoader = (ativar) => {
        if (!ativar) {
            setTimeout(() => {
                this.setState({ loading: ativar });
            }, 1000);
        } else {
            this.setState({ loading: ativar });
        }
    }

    desativar_tempo_loadding() {
        cont = setTimeout(() => {
            if (this.state.tempo_loading >= 5) {
                this.setState({ loading: false });
                this.desativar_tempo_loadding();
            } else {
                this.setState({ tempo_loading: this.state.tempo_loading + 1 });
                this.desativar_tempo_loadding();
            }
        }, 1000)
    }

    getLoader = () => {
        return this.state.loading;
    }

    UNSAFE_componentWillMount() {
        this.setState({ aleatorio: Math.floor(Math.random() * (4 - 1 + 1)) + 1 });
    }

    componentDidMount() {
        // this.contador();
    }

    componentWillUnmount() {
        // clearTimeout(cont);
    }

    contador() {
        cont = setTimeout(() => {
            if (this.state.tempoTotal != 0) {
                this.setState({ tempoTotal: this.state.tempoTotal - 1, loading: false });
                this.contador();
            } else {
                //this.ativarLoader(true);
                console.log('### SET STATE LOAD TRUE contador ###');
                if (this.props.id_questao != null) {
                    this._cadastraResposta(0, 'nao informada'); //{correto:0,resposta:'nao informada'
                }
            }
        }, 1000)
    }


    _puxaPergunta() {
        const { id_filho, id_materia, id_serie } = this.props;
        this.props.buscaPergunta({
            id_filho,
            id_materia,
            id_serie
        }, () => {
            this.ativarLoader(false);
        });
    }

    _puxaPerguntaErrada(callback) {
        const { id_filho, id_materia, id_serie } = this.props;
        this.props.buscaPerguntaErrada({
            id_filho,
            id_materia,
            id_serie
        }, () => {
            this.ativarLoader(false);
        });

    }

    _cadastraResposta(correto, resposta) {
        this.ativarLoader(true);
        console.log('### SET STATE LOAD TRUE _cadastraResposta ###');
        const { id_filho, id_materia, id_serie, id_questao } = this.props;
        console.log({
            id_filho,
            id_serie,
            id_materia,
            id_questao,
            correto,
            resposta
        })
        this.props.cadastraResposta({
            id_filho,
            id_serie,
            id_materia,
            id_questao,
            correto,
            resposta
        }, () => {
            if (correto.correto == 1) {
                this.props.modificaEstaCorreto(1);
                this.props.updatePtsFilho(parseInt(this.props.pts) + 10);
            } else {
                this.props.modificaEstaCorreto(2);
            }
            // if (this.props.id_questao == null && this.props.questoesRespondidas < this.props.totalQuestoes) {
            this._puxaPerguntaErrada(() => {
                //this.ativarLoader(false);
            });
            //this.ativarLoader(false);
        });
        // clearTimeout(cont);
        // console.log(cont);
    }

    btnsRespostas() {
        if (this.state.aleatorio == 1) {
            return (
                <View>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 1 }, { resposta: 'correta' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.correta}</Text>
                    </Button>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 0 }, { resposta: 'errada' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.errada1}</Text>
                    </Button>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 0 }, { resposta: 'errada1' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.errada2}</Text>
                    </Button>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 0 }, { resposta: 'errada2' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.errada3}</Text>
                    </Button>
                </View>
            );
        } else if (this.state.aleatorio == 2) {
            return (
                <View>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 0 }, { resposta: 'errada' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.errada1}</Text>
                    </Button>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 1 }, { resposta: 'correta' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.correta}</Text>
                    </Button>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 0 }, { resposta: 'errada1' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.errada2}</Text>
                    </Button>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 0 }, { resposta: 'errada2' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.errada3}</Text>
                    </Button>
                </View>
            );
        } else if (this.state.aleatorio == 3) {
            return (
                <View>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 0 }, { resposta: 'errada' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.errada1}</Text>
                    </Button>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 0 }, { resposta: 'errada1' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.errada2}</Text>
                    </Button>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 0 }, { resposta: 'errada2' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.errada3}</Text>
                    </Button>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 1 }, { resposta: 'correta' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.correta}</Text>
                    </Button>
                </View>
            );
        } else {
            return (
                <View>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 0 }, { resposta: 'errada' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.errada1}</Text>
                    </Button>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 0 }, { resposta: 'errada1' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.errada2}</Text>
                    </Button>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 1 }, { resposta: 'correta' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.correta}</Text>
                    </Button>
                    <Button block large onPress={() => this._cadastraResposta({ correto: 0 }, { resposta: 'errada2' })}
                        style={styles.btnResposta}>
                        <Text style={styles.txtBoxes}>{this.props.errada3}</Text>
                    </Button>
                </View>
            );
        }
    }

    render() {
        console.log("---- PASSOU NO RENDER() ----");
        console.log(this.props.estaCorreto);
        if (this.props.estaCorreto != null) {
            if (this.props.estaCorreto == 1) {
                return (
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#76d275' }}>
                        <Icon name="checkmark-circle" style={{ color: '#fff', fontSize: 140 }} />
                        <Text style={{ fontSize: 30, color: 'white' }}>Você Acertou!</Text>
                        <Text style={{ color: 'white' }}>Foi adicionado mais 10 pontos.</Text>
                        <Button block large style={{ backgroundColor: "#4a934a", margin: 10 }} onPress={() => { this.props.modificaEstaCorreto(null) }}>
                            <Text>Continuar</Text>
                        </Button>
                    </View>
                );
            } else {
                return (
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#e53935' }}>
                        <Icon name="close-circle" style={{ color: '#fff', fontSize: 140 }} />
                        <Text style={{ fontSize: 30, color: 'white' }}>Você Errou!</Text>
                        <Text style={{ color: 'white' }}>Esta questão aparecerá aleatoriamente.</Text>
                        <Button block large warning style={{ backgroundColor: "#8d1818", margin: 10 }} onPress={() => { this.props.modificaEstaCorreto(null) }}>
                            <Text>Continuar</Text>
                        </Button>
                    </View>
                );
            }
        } else {
            if (this.props.id_questao == null && this.props.questoesRespondidas <= this.props.totalQuestoes && !this.state.loading) {
                return (
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#FFD31D' }}>
                        <Icon name="alert" style={{ color: '#fff', fontSize: 140 }} />
                        <Text style={{ color: 'white', textAlign: 'center' }}>Não existem Perguntas a serem Respondidas!</Text>
                        <Button block large style={styles.btnST1} onPress={() => Actions.pop()}>
                            <Text style={{ color: "#338fb5" }}>Voltar</Text>
                        </Button>
                    </View>
                );
            } else {
                return (
                    // <Container>
                    //     <Loader loading={this.state.loading}/>
                    //     <Menu tipo="jogo" materia={this.props.nome_materia}/>
                    //     <Content padder>
                    //         <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 2}}>
                    //             <View style={styles.boxesTopo}>
                    //                 <Text
                    //                     style={{color: "#000"}}>{this.props.questoesRespondidas}/{this.props.totalQuestoes}</Text>
                    //             </View>
                    //             <View style={styles.boxesTopo}>
                    //                 <Text style={{color: "#e53935"}}>
                    //                     {this.state.tempoTotal}
                    //                 </Text>
                    //             </View>
                    //         </View>

                    //         <Card>
                    //             <CardItem header style={{backgroundColor: "#13a7df"}}>
                    //                 <Text style={{color: "#ffffff"}}>{this.props.titulo}</Text>
                    //             </CardItem>

                    //             {
                    //                 (this.props.imagem != '0' ? (
                    //                     <CardItem>
                    //                         <Body>
                    // <View style={{alignItems: 'center'}}>
                    //     <Image
                    //         style={{width: 300, height: imageHeight, resizeMode: 'stretch', marginBottom: 20}}
                    //         source={{uri: URL_ADMIN_FUTURONERD + `/uploads/${this.props.imagem}`}}
                    //     />
                    // </View>
                    //                         </Body>
                    //                     </CardItem>
                    //                 ) : null)
                    //             }
                    //             {/*<Text style={styles.topBox}>
                    //             {this.props.pergunta}
                    //             </Text>*/}
                    //         </Card>
                    //         {this.btnsRespostas()}
                    //     </Content>
                    // </Container>

                    <View style={styles.container}>
                        <View style={styles.bannerContainer} >

                            <View style={{ marginTop: 10, paddingVertical: 5, paddingHorizontal: 55, backgroundColor: '#EBAB6C', borderRadius: 50 }} >
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 24, color: '#fff'
                                }}>
                                    {this.props.nome_materia}
                                </Text>
                            </View>

                            <TouchableOpacity onPress={() => Actions.pop()} style={{ display: 'flex', flexDirection: 'row', position: 'absolute', left: 20, top: 30 }} >
                                <Image style={styles.headerAward}
                                    source={require('../imgs/home3.png')} />
                            </TouchableOpacity>

                            <View style={{
                                marginTop: 10, paddingVertical: 5, paddingHorizontal: 5, borderWidth: 2, borderRadius: 200,
                                position: 'absolute', right: 20, top: 30
                            }} >
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 24, color: '#000'
                                }}>
                                    {this.state.tempoTotal}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.pergContainer}>
                            <ScrollView showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ display: 'flex', alignItems: 'center' }}>
                                <View style={{ alignItems: 'center', marginTop: 0, borderRadius: 0, width: '90%', height: 400 }}>
                                    <Image
                                        style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 0, borderWidth: 2 }}
                                        source={{ uri: URL_ADMIN_FUTURONERD + `/uploads/${this.props.imagem}` }}
                                    />
                                </View>

                                <View style={{ alignItems: 'center', marginTop: 20, width: '90%' }}>
                                    <Text style={{ color: "#000", textAlign: 'justify' }}>{this.props.titulo}</Text>
                                </View>

                            </ScrollView>

                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ display: 'flex', alignItems: 'center', marginTop: 5, marginBottom: 10 }}>
                            {this.btnsRespostas()}

                        </ScrollView>
                    </View>
                )
            }
        }
    }
}

const mapStateToProps = state => ({
    estaCorreto: state.AppFilhoReducer.estaCorreto, // # MXTera --
    id_serie: state.AppFilhoReducer.serieFilho,
    id_filho: state.AppFilhoReducer.idFilho,
    id_questao: state.AppFilhoReducer.idQuestao,
    totalQuestoes: state.AppFilhoReducer.total_questoes,
    questoesRespondidas: state.AppFilhoReducer.questoes_respondidas,
    titulo: state.AppFilhoReducer.tituloQuestaoAtual,
    pergunta: state.AppFilhoReducer.perguntaQuestaoAtual,
    imagem: state.AppFilhoReducer.imagemQuestaoAtual,
    correta: state.AppFilhoReducer.respostaCorreta,
    errada1: state.AppFilhoReducer.respostaErrada,
    errada2: state.AppFilhoReducer.respostaErrada1,
    errada3: state.AppFilhoReducer.respostaErrada2,
    pts: state.AppFilhoReducer.pts,
    tempo: state.AppFilhoReducer.tempo
});

export default connect(mapStateToProps, {
    modificaEstaCorreto, // # MXTera --
    buscaTotalQuestoes,
    buscaQuestoesRespondidas,
    buscaPergunta,
    buscaPerguntaErrada,
    cadastraResposta,
    getPtsFilho,
    updatePtsFilho
})(Jogo);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 0,
        backgroundColor: '#F9D74B',
        display: 'flex',
        alignItems: 'center',
    },
    bannerContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'black',
        height: '15%'
    },
    headerAward: {
        width: 70,
        height: 70
    },
    pergContainer: {
        width: '80%',
        backgroundColor: '#f5e59f',
        // height: '80%',
        borderRadius: 20,
        elevation: 5,
        paddingVertical: 20
    },




    txtBoxes: {
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: 'center'
    },
    btnResposta: {
        backgroundColor: "#BE81C4",
        marginVertical: 2,
        height: "auto",
        width: 320,
        borderRadius: 20
    },
    txtBotao: {
        color: '#ffffff',
        fontSize: 16
    },
    btnST1: {
        backgroundColor: "#b7eaff",
        color: "#338fb5",
        margin: 15,
        marginTop: 10
    }
});
