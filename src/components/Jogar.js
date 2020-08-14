import React from 'react';
import {AppState, ImageBackground, StyleSheet, View} from 'react-native';
import { Container, Text, Content, Left, List, ListItem, Icon, Item, Input, Body, Form, Right, Switch } from 'native-base';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { connect } from 'react-redux';

import Menu from '../config/Menu';
import {URL_API_FUTURONERD} from '../config/Constants';

class Jogar extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      materias: [],
    }
  }

  UNSAFE_componentWillMount(){
    this.buscaSeries();
  }

  buscaSeries(){
    axios.get(URL_API_FUTURONERD + '/materia_by_serie/' + this.props.serieFilho)
      .then(materias => {
        this.setState({materias: materias.data})
      })
      .catch(() => {
          console.log('Erro ao recuperar os dados de materias');
      });
    }

	render(){
		return(
			<Container style={{backgroundColor:'#ffffff'}}>
                <ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../imgs/background-t2.jpg')} >
                    <Menu tipo="voltar" nome={this.props.nome} pts={this.props.pts}/>
                    <Content>
                        <List padder>
                            <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                                <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-play' android='md-play' />
                                <Text style={{fontSize:15,color:'#338fb5'}}> Jogo das Matérias</Text>
                            </ListItem>
                        </List>
                        <List>
                            {
                              this.state.materias.map((materia, index) => {
                                return(
                                    <ListItem style={{marginLeft:0,paddingLeft:10,backgroundColor:"#ffffff"}} key={index} icon onPress={() => Actions.jogo({id_materia:materia.id,nome_materia:materia.materia})}>
                                          <Body>
                                            <Text style={{fontSize:15,color:"#000000"}}>{materia.materia}</Text>
                                          </Body>
                                          <Right>
                                            <Icon style={{color:"#000000"}} name="arrow-forward" />
                                          </Right>
                                    </ListItem>
                                )})
                            }
                        </List>
                    </Content>
                </ImageBackground>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
    nome:state.AppFilhoReducer.nomeFilho,
    pts:state.AppFilhoReducer.pts,
    serieFilho:state.AppFilhoReducer.serieFilho
});

export default connect(mapStateToProps,{})(Jogar);

