import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, AsyncStorage } from 'react-native';
import { Container, Content, Card, Body, CardItem, ListItem, Icon, List, Right, Row, Col, Grid } from 'native-base';
import { connect } from 'react-redux';

import { relatorioQuestoesCompletadas } from '../actions/AppFilhoActions';
import Menu from '../config/Menu';
import { Actions } from "react-native-router-flux";

class Completados extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            gender: '',
            ciencias: 0,
            matematica: 0,
            portugues: 0,
            geografia: 0,
            historia: 0
        }
    }

    async UNSAFE_componentWillMount() {
        await this.props.relatorioQuestoesCompletadas(this.props.id_serie, this.props.id_filho);
        this.chooseGender();
        this.getRespondidas();
    }

    // componentDidMount() {
    //     this.getRespondidas();
    // }

    getRespondidas() {
        this.setState({ ciencias: this.props.relatorio_questoes_completadas[5].qtd_respondidas })
        this.setState({ portugues: this.props.relatorio_questoes_completadas[0].qtd_respondidas })
        this.setState({ matematica: this.props.relatorio_questoes_completadas[1].qtd_respondidas })
        this.setState({ geografia: this.props.relatorio_questoes_completadas[3].qtd_respondidas })
        this.setState({ historia: this.props.relatorio_questoes_completadas[2].qtd_respondidas })
    }

    async chooseGender() {
        let gender = '';

        gender = await AsyncStorage.getItem('@FuturoNerd/GenderIcon');

        if (gender == "Menino") {
            this.setState({ gender: "Menino" })
        } else {
            this.setState({ gender: "Menina " })
        }
    }


    render() {
        return (
            //   <Container style={{backgroundColor:'#ffffff'}}>
            //       <ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../imgs/background-t2.jpg')} >
            //           <Menu tipo="voltar" nome={this.props.nome} pts={this.props.pts}/>
            //           <Content>
            //             <List padder>
            //               <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
            //                 <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-checkmark-circle-outline' android='md-checkmark-circle-outline' />
            //                 <Text style={{fontSize:15,color:'#338fb5'}}> Questōes Completadas</Text>
            //               </ListItem>
            //             </List>
            //             {/*<List>
            //             {this.props.relatorio_questoes_completadas.map((relatorio, index) => {
            //                 return (
            //                   <ListItem  style={{marginLeft:0,paddingLeft:10,backgroundColor:"#ffffff"}} key={relatorio.id_materia}>
            //                       <Body>
            //                           <Text style={{fontSize:15,color:"#000000"}}>{relatorio.materia} ({relatorio.qtd_respondidas}/{relatorio.qtd_questoes})</Text>
            //                       </Body>
            //                   </ListItem>
            //                 )
            //             })}
            //             </List>*/}
            //               <Grid style={styles.grid}>
            //                   <Row>
            //                       <Col style={styles.gridCol}>
            //                           <Text style={styles.gridHeader1}>Matéria</Text>
            //                       </Col>
            //                       <Col style={styles.gridCol}>
            //                           <Text style={styles.gridHeader2}>Respondidas</Text>
            //                       </Col>
            //                       <Col style={styles.gridCol}>
            //                           <Text style={styles.gridHeader2}>Perguntas</Text>
            //                       </Col>
            //                   </Row>
            //                   {this.props.relatorio_questoes_completadas.map((relatorio, index) => {
            //                       return (
            //                           <Row key={relatorio.id_materia}>
            //                               <Col style={styles.gridCol}>
            //                                   <Text style={styles.gridText1}>{relatorio.materia}</Text>
            //                               </Col>
            //                               <Col style={styles.gridCol}>
            //                                   <Text style={styles.gridText2}>{relatorio.qtd_respondidas}</Text>
            //                               </Col>
            //                               <Col style={styles.gridCol}>
            //                                   <Text style={styles.gridText2}>{relatorio.qtd_questoes}</Text>
            //                               </Col>
            //                           </Row>
            //                       )
            //                   })}
            //               </Grid>
            //           </Content>
            //       </ImageBackground>
            //   </Container>

            <ImageBackground style={styles.container} imageStyle={{ resizeMode: 'cover' }} source={require('../imgs/bgProfile.jpg')} >
                <View style={styles.bannerContainer} >
                    <View style={{
                        borderRadius: 80,
                        backgroundColor: '#fff',
                        borderWidth: 2,
                        width: 170,
                        height: 170,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {this.state.gender == "Menino" ?
                            <Image style={styles.profileImg}
                                source={require('../imgs/smile.png')} />
                            :
                            <Image style={styles.profileImg}
                                source={require('../imgs/child.png')} />
                        }
                    </View>

                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.mainText}>PERGUNTAS</Text>
                    <View style={styles.row}>
                        <View style={styles.leftCol}>
                            <View style={[styles.topBar, { backgroundColor: '#DF81AB' }]}>
                                <Text style={styles.respText}>{this.state.ciencias}</Text>
                            </View>
                            <View style={[styles.bottomBar, { backgroundColor: '#E68DD0' }]}>
                                <Image style={styles.materiaImg}
                                    source={require('../imgs/cienciasBoneco.png')} />
                            </View>
                        </View>
                        <View style={styles.rightCol}>
                            <View style={[styles.topBar, { backgroundColor: '#EFE159' }]}>
                                <Text style={styles.respText}>{this.state.portugues}</Text>
                            </View>
                            <View style={[styles.bottomBar, { backgroundColor: '#EBE5AC' }]}>
                                <Image style={styles.materiaImg}
                                    source={require('../imgs/cienciasBoneco.png')} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.leftCol}>
                            <View style={[styles.topBar, { backgroundColor: '#B988E3' }]}>
                                <Text style={styles.respText}>{this.state.historia}</Text>
                            </View>
                            <View style={[styles.bottomBar, { backgroundColor: '#D5A8F9' }]}>
                                <Image style={styles.materiaImg}
                                    source={require('../imgs/cienciasBoneco.png')} />
                            </View>
                        </View>
                        <View style={styles.rightCol}>
                            <View style={[styles.topBar, { backgroundColor: '#AFF190' }]}>
                                <Text style={styles.respText}>{this.state.geografia}</Text>
                            </View>
                            <View style={[styles.bottomBar, { backgroundColor: '#D3F5C3' }]}>
                                <Image style={styles.materiaImg}
                                    source={require('../imgs/cienciasBoneco.png')} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.lastRow}>
                        <Image style={styles.lastMatImg}
                            source={require('../imgs/cienciasBoneco.png')} />
                        <Text style={styles.respText}>{this.state.matematica}</Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => ({
    nome: state.AppFilhoReducer.nomeFilho,
    pts: state.AppFilhoReducer.pts,
    id_filho: state.AppFilhoReducer.idFilho,
    id_serie: state.AppFilhoReducer.serieFilho,
    relatorio_questoes_completadas: state.AppFilhoReducer.relatorio_questoes_completadas

});
export default connect(mapStateToProps, { relatorioQuestoesCompletadas })(Completados);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 0
    },
    bannerContainer: {
        width: '100%',
        height: '40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        width: '100%',
        height: '100%',
    },
    mainText: {
        color: '#000',
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 10
    },
    row: {
        height: '22%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        margin: 0,
        padding: 0,
    },
    topBar: {
        height: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomBar: {
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftCol: {
        width: '50%',
    },
    rightCol: {
        width: '50%',
    },
    lastRow: {
        height: '10.5%',
        width: '100%',
        backgroundColor: '#DFB381',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    profileImg: {
        height: 150,
        width: 150,
    },
    materiaImg: {
        height: 100,
        width: 100
    },
    respText: {
        fontWeight: 'bold',
        fontSize: 24
    },
    lastMatImg: {
        width: 60,
        height: 60,
        marginRight: 20
    }
});