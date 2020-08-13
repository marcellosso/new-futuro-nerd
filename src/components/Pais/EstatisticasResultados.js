import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image, ActivityIndicator, ImageBackground} from 'react-native';
import {
    Container,
    Content,
    Header,
    Left,
    Right,
    Body,
    Button,
    Icon,
    Grid,
    Row,
    Col,
    Card,
    CardItem,
    ListItem, List
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import axios from 'axios';

import { 
    buscaDadosFilho,
    consultaQuestoesErradasMateriaFilho
} from '../../actions/AppActions';
import Rodape from './Rodape';
import {URL_API_FUTURONERD} from '../../config/Constants';
import Menu from "../../config/Menu";

class EstatisticasResultados extends React.Component{

    constructor(props){
      super(props)

      this.state = {
          totalQuestoes: null,
          questoesRespondidas: null,
          questoesErradas: null,
          tempoTotalAtivo: null
      }
    }

    componentWillMount(){
        this.buscaTotalQuestoes(this.props.id_materia,this.props.id_serie);
        this.buscaQuestoesRespondidas(this.props.id_filho,this.props.id_materia,this.props.id_serie);
        this.buscaQuestoesErradas(this.props.id_filho,this.props.id_materia,this.props.id_serie);
        this.buscaTempoTotalAtivo(this.props.id_filho);
        this.props.consultaQuestoesErradasMateriaFilho(this.props.id_filho, this.props.id_materia, this.props.id_serie);
    }

    buscaQuestoesErradas(id_filho,id_materia,id_serie){
        axios.get(URL_API_FUTURONERD + `/filho/questoes/erradas/${id_filho}/${id_materia}/${id_serie}`)
        .then(res => {
            this.setState({questoesErradas:res.data.total});
            //console.log("aaa:");
            //console.log(res.data);
            //console.log(URL_API_FUTURONERD + `/filho/questoes/erradas/${id_filho}/${id_materia}/${id_serie}`);
        })
        .catch(erro => {
            alert(erro);
        })
    }

    buscaQuestoesRespondidas(id_filho,id_materia,id_serie){
        axios.get(URL_API_FUTURONERD + `/filho/questoes/respondidas/${id_filho}/${id_materia}/${id_serie}`)
        .then(res => {
            this.setState({questoesRespondidas:res.data.total});
            //console.log("bbb:");
            //console.log(res.data);
            //console.log(URL_API_FUTURONERD + `/filho/questoes/respondidas/${id_filho}/${id_materia}/${id_serie}`);
        })
        .catch(erro => {
            alert(erro);
        })
    }


    buscaTotalQuestoes(materia,serie){
        axios.get(URL_API_FUTURONERD + `/filho/questoes/${materia}/${serie}`)
        .then(res => {
            this.setState({totalQuestoes:res.data.total});
        })
        .catch(erro => {
            alert(erro);
        })
    }

    // # MXTera --
    buscaTempoTotalAtivo(id_filho){
        axios.get(URL_API_FUTURONERD + `/filho/tempoativototal/${id_filho}`)
            .then(res => {
                this.setState({tempoTotalAtivo:res.data}); console.log(res);
            })
            .catch(erro => {
                alert(erro);
            })
    }

    acompanheAsQuestoesErradas(){
        if(this.props.lista_questoes_erradas_materia_filho.length > 0){
            return(
                <View>
                    <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#000',marginTop:20, marginBottom:20}}>Acompanhe as{'\n'}<Text style={{fontWeight: 'bold'}}>Questões Erradas</Text> do Filho</Text>
                    <View style={{padding:10}}>
                        {this.props.lista_questoes_erradas_materia_filho.map((questao, index) => {
                            return (
                                <View key={index} style={{padding:5}}>
                                    <View style={{backgroundColor:"#ffffff",borderWidth:1.5,borderLeftWidth:0,borderRightWidth:0,borderBottomWidth:4,borderColor:"#000000",flexDirection:'row',overflow:'hidden',marginVertical:0}}>
                                        <View style={{width:'100%',padding:10}}>
                                            {/*<Text style={{textAlign:'center',fontSize:15,marginVertical:10,color:'#000000',marginTop:0, marginBottom:0, fontWeight:'bold'}}>- Questão {index + 1} -</Text>*/}
                                            <Text><Text style={{fontWeight: 'bold'}}>Pergunta:</Text> {questao.titulo}</Text>
                                            {/*<Text style={{color:"#cc3300"}}><Text style={{fontWeight: 'bold'}}>Selecionada:</Text> {eval('questao.resposta_'+questao.resposta)}</Text>*/}
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            )
        }
    }
    // # --

  render(){
    return(
    <Container style={{backgroundColor:'#ffffff'}}>
        <ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../../imgs/background-t3.jpg')} >
            <Menu tipo="paiVoltar" />
            {/*<Header style={{marginTop:24}}>
              <Left>
                <Button transparent onPress={() => Actions.pop()}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Text>Resultado</Text>
              </Body>
              <Right/>
            </Header>*/}
            <Content>
                <List padder>
                    <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                        <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-analytics' android='md-analytics' />
                        <Text style={{fontSize:15,color:'#338fb5'}}> Resultado</Text>
                    </ListItem>
                </List>
                <Text style={{textAlign:'center',fontSize:20,marginTop:15,marginBottom:0}}>{this.props.nome_materia}</Text>
                <Grid style={{padding:15}}>
                    <Row>
                      <Col>
                          <Card>
                            <CardItem style={{backgroundColor:'#0fa087'}}>
                              <Body style={{padding:10,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:28,fontWeight:'bold',marginBottom:3,color:'white'}}>{this.state.totalQuestoes}</Text>
                                <Text style={{textAlign:'center',color:'white'}}>{('Total de questões').toUpperCase()}</Text>
                              </Body>
                            </CardItem>
                          </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                          <Card>
                            {/*<CardItem style={{backgroundColor:'#43a047'}}>*/}
                            <CardItem style={{backgroundColor:'#0fa087'}}>
                              <Body style={{padding:10,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:28,fontWeight:'bold',marginBottom:3,color:'white'}}>{this.state.questoesRespondidas}</Text>
                                <Text style={{textAlign:'center',color:'white'}}>{('questões corretas').toUpperCase()}</Text>
                              </Body>
                            </CardItem>
                          </Card>
                      </Col>
                      <Col>
                          <Card>
                            {/*<CardItem style={{backgroundColor:'#e53935'}}>*/}
                            <CardItem style={{backgroundColor:'#e55060'}}>
                                <Body style={{padding:10,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontSize:28,fontWeight:'bold',marginBottom:3,color:'white'}}>{this.state.questoesErradas}</Text>
                                    <Text style={{textAlign:'center',color:'white'}}>{('questões erradas').toUpperCase()}</Text>
                                </Body>
                            </CardItem>
                          </Card>
                      </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <CardItem style={{backgroundColor:'#1297e2'}}>
                                    <Body style={{padding:10,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:20,fontWeight:'bold',marginBottom:3,color:'white'}}>Tempo de Uso</Text>
                                        <Text style={{textAlign:'center',color:'white'}}>{this.state.tempoTotalAtivo==''?'00:00':this.state.tempoTotalAtivo}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
                {this.acompanheAsQuestoesErradas()}
            </Content>
        </ImageBackground>
        {/*<Rodape atual="estatisticas" />*/}
    </Container>
    )
  }
}

const mapStateToProps = state => ({
  id_pai:state.AppReducer.idPaiAtual,
  lista_questoes_erradas_materia_filho:state.AppReducer.lista_questoes_erradas_materia_filho
  //id_pai:state.AppReducer.idPaiAtual, id_filho,id_materia,id_serie this.props.id_filho,this.props.id_materia,this.props.id_serie
  //id_pai:state.AppReducer.idPaiAtual,
  //id_pai:state.AppReducer.idPaiAtual
});

export default connect(
  mapStateToProps,{
    buscaDadosFilho,
    consultaQuestoesErradasMateriaFilho
  })(EstatisticasResultados);

const styles = StyleSheet.create({
  headerText: {
    fontSize:20
  },
  header:{
    backgroundColor:'#f5f5f5',
    padding:10
  },
  content: {
    padding:10
  }
});