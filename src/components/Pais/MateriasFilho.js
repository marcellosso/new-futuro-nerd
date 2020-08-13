import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image, ActivityIndicator, ImageBackground} from 'react-native';
import { Container, Content, Header, Left, Right, Body, Button, Icon, List, ListItem, Input, Card, CardItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import axios from 'axios';

import Rodape from './Rodape';
import {URL_API_FUTURONERD} from '../../config/Constants';
import Menu from "../../config/Menu";

class MateriasFilho extends React.Component{

    constructor(props){
        super(props);

        this.state = {
          materias: [],
        }
    }

    componentWillMount(){
        this.buscaMaterias();
    }

    buscaMaterias(){
    axios.get(URL_API_FUTURONERD + '/materia_by_serie/' + this.props.serie)
        .then(materias => {
        this.setState({materias: materias.data})
        })
        .catch(() => {
            console.log('erro ao recuperar os dados de materias');
        });
    }

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
                    <Text>Matérias</Text>
                  </Body>
                  <Right/>
                </Header>*/}
                <Content>
                    <List padder>
                        <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                            <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-analytics' android='md-analytics' />
                            <Text style={{fontSize:15,color:'#338fb5'}}> Matérias</Text>
                        </ListItem>
                    </List>
                    <List style={{backgroundColor:"#fff"}}>
                        {
                          this.state.materias.map((materia, index) => {
                            return(
                              <ListItem key={index} icon onPress={() => Actions.estatisticasresultados({id_materia:materia.id,id_filho:this.props.id,id_serie:this.props.serie,nome_materia:materia.materia})}>
                              <Body>
                                <Text>{materia.materia}</Text>
                              </Body>
                              <Right>
                                <Icon style={{color:"#000"}} name="arrow-forward" />
                              </Right>
                            </ListItem>
                            )})
                        }
                    </List>
                    <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#000',marginTop:30,marginBottom:30 }}>Selecione uma <Text style={{fontWeight: 'bold'}}>Matéria!</Text></Text>
                </Content>
            </ImageBackground>
            {/*<Rodape atual="estatisticas" />*/}
        </Container>
    )
  }
}

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,{
  })(MateriasFilho);

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
