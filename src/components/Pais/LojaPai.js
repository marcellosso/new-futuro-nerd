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
    Form,
    Item,
    Input,
    Card,
    CardItem,
    ListItem, List
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';

import { 
    listaDadosFilhos
} from '../../actions/AppActions';
import Rodape from './Rodape';
import Menu from "../../config/Menu";

class LojaPai extends React.Component{

    constructor(props) {
        super(props);
        this.props.listaDadosFilhos(this.props.id_pai);
    }

    renderFilhos(){
        if(this.props.filhos.length == 0){
            return (
                <Text style={{textAlign:'center'}}>Você precisa ter um filho cadastrado para ver os produtos solicitados.</Text>
            );
        } else {
            return (
                <View>
                    {/*<Text style={{fontSize:20,textAlign:'center'}}>Selecione um filho para ver os produtos solicitados</Text>*/}
                    <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#000',marginTop:30,marginBottom:30 }}>Selecione um <Text style={{fontWeight: 'bold'}}>Filho</Text>{'\n'}para ver os produtos solicitados!</Text>
                    {this.props.filhos.map((filhos, index) => {
                        return (
                            <TouchableOpacity onPress={() => Actions.produtospai()} key={index}>
                                <CardItem style={{backgroundColor:'#13a7df',margin:15}}>
                                <Left>
                                <Icon active style={{color:'white',fontSize:40}} name="person" />
                                <Text style={{color:'#fff',fontSize:20,marginHorizontal:10}}>{filhos.nome}</Text>
                                </Left>
                                <Right>
                                    <Icon style={{color:"#ffffff"}} name="arrow-forward" />
                                </Right>
                                </CardItem>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
        }
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
                <Text>Loja</Text>
              </Body>
              <Right/>
            </Header>*/}
            <Content>
                <List padder>
                    <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                        <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-cart' android='md-cart' />
                        <Text style={{fontSize:15,color:'#338fb5'}}> Produtos</Text>
                    </ListItem>
                </List>
                <View>
                    {this.renderFilhos()}
                </View>
            </Content>
        </ImageBackground>
        <Rodape atual="estatisticas" />
    </Container>
    )
  }
}

const mapStateToProps = state => ({
  id_pai:state.AppReducer.idPaiAtual,
  filhos:state.AppReducer.filhos
});

export default connect(
  mapStateToProps,{
    listaDadosFilhos
  })(LojaPai);

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