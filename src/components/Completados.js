import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity, StyleSheet} from 'react-native';
import {Container, Content, Card, Body, CardItem, ListItem, Icon, List, Right, Row, Col, Grid} from 'native-base';
import { connect } from 'react-redux';

import { relatorioQuestoesCompletadas } from '../actions/AppFilhoActions';
import Menu from '../config/Menu';
import {Actions} from "react-native-router-flux";

class Completados extends React.Component{

  componentWillMount(){
    this.props.relatorioQuestoesCompletadas(this.props.id_serie,this.props.id_filho);
  }

  constructor(props) {
      super(props);
  }


  render(){
    return(
      <Container style={{backgroundColor:'#ffffff'}}>
          <ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../imgs/background-t2.jpg')} >
              <Menu tipo="voltar" nome={this.props.nome} pts={this.props.pts}/>
              <Content>
                <List padder>
                  <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                    <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-checkmark-circle-outline' android='md-checkmark-circle-outline' />
                    <Text style={{fontSize:15,color:'#338fb5'}}> Questōes Completadas</Text>
                  </ListItem>
                </List>
                {/*<List>
                {this.props.relatorio_questoes_completadas.map((relatorio, index) => {
                    return (
                      <ListItem  style={{marginLeft:0,paddingLeft:10,backgroundColor:"#ffffff"}} key={relatorio.id_materia}>
                          <Body>
                              <Text style={{fontSize:15,color:"#000000"}}>{relatorio.materia} ({relatorio.qtd_respondidas}/{relatorio.qtd_questoes})</Text>
                          </Body>
                      </ListItem>
                    )
                })}
                </List>*/}
                  <Grid style={styles.grid}>
                      <Row>
                          <Col style={styles.gridCol}>
                              <Text style={styles.gridHeader1}>Matéria</Text>
                          </Col>
                          <Col style={styles.gridCol}>
                              <Text style={styles.gridHeader2}>Respondidas</Text>
                          </Col>
                          <Col style={styles.gridCol}>
                              <Text style={styles.gridHeader2}>Perguntas</Text>
                          </Col>
                      </Row>
                      {this.props.relatorio_questoes_completadas.map((relatorio, index) => {
                          return (
                              <Row key={relatorio.id_materia}>
                                  <Col style={styles.gridCol}>
                                      <Text style={styles.gridText1}>{relatorio.materia}</Text>
                                  </Col>
                                  <Col style={styles.gridCol}>
                                      <Text style={styles.gridText2}>{relatorio.qtd_respondidas}</Text>
                                  </Col>
                                  <Col style={styles.gridCol}>
                                      <Text style={styles.gridText2}>{relatorio.qtd_questoes}</Text>
                                  </Col>
                              </Row>
                          )
                      })}
                  </Grid>
              </Content>
          </ImageBackground>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  nome:state.AppFilhoReducer.nomeFilho,
  pts:state.AppFilhoReducer.pts, 
  id_filho:state.AppFilhoReducer.idFilho,
  id_serie:state.AppFilhoReducer.serieFilho,
  relatorio_questoes_completadas:state.AppFilhoReducer.relatorio_questoes_completadas

});
export default connect(mapStateToProps,{relatorioQuestoesCompletadas})(Completados);

const styles = StyleSheet.create({
    grid: {
       backgroundColor:"#ffffff"
    },
    gridCol: {
        padding:8,
        borderBottomWidth:1,
        borderBottomColor:"#e7e7e7"
    },
    gridHeader1: {
        fontWeight:"bold",
        color:"#000",
        textAlign:"left"
    },
    gridHeader2: {
        fontWeight:"bold",
        color:"#000",
        textAlign:"center"
    },
    gridText1:{

    },
    gridText2:{
        textAlign:"center"
    }
});