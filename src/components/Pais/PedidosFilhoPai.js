import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Button, Icon, Form, Item, Input, Card, CardItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import { Alert } from 'react-native';
import { Divider } from 'react-native-elements';

import { produtosSolicitadosFilho
} from '../../actions/AppActions';
import Rodape from './Rodape';
import {URL_ADMIN_FUTURONERD, URL_CONSULTA_CEP} from '../../config/Constants';

class PedidosFilhoPai extends React.Component{
  componentWillMount(){
    this.props.produtosSolicitadosFilho(13);
  }


  render(){
    return(
	<Container style={{backgroundColor:'#fff'}}>
        <Header style={{marginTop:24}}>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text>Produtos</Text>
          </Body>
          <Right/>
        </Header>	
        <Content padder>
            <View>
              <View style={{padding:10,flex:1}}>
                <Text style={{fontWeight:'bold',fontSize:20, textAlign:'center'}}>
                  <Icon name="ios-alarm" />
                  <Text> Lista de Produtos </Text>
                  <Text> Solicitados pelos filhos</Text>
                </Text>
              </View>
              <View style={{padding:10,flex:1}}>
                <Text style={{fontWeight:'bold',fontSize:15, textAlign:'left'}}>
                  <Text>Produto</Text>
                </Text>
              </View>
            </View>
            <View>
              {this.props.lista_produtos_solicitados_filho.map((produto, index) => {
              return ( 
                      <TouchableOpacity key={index} onPress={() => Actions.lojapai({pp_id:produto.pp_id})} >
                        <View style={{borderWidth:1.5,flexDirection:'row',borderRadius:10,borderColor:'#ccc',overflow:'hidden',marginVertical:10}}>
                          <Image style={{width:100,height:110}} source={{uri: URL_ADMIN_FUTURONERD + `/uploads/${produto.p_foto}`}} />
                          <View style={{padding:10,flex:1}}>
                            <Text style={{fontWeight:'bold',fontSize:17}}>{produto.p_nome_produto}</Text>
                            <Text>{produto.p_descricao}</Text>
                            <Text style={{fontWeight:'bold',fontSize:15}}>
                              <Icon name="trophy" />
                              <Text>{produto.p_preco}</Text>
                            </Text>
                          </View>
                        </View>
                        <View style={{padding:10,flex:1}}>
                            <Text>Solicitado por: {produto.cf_nome}</Text>
                            {/* <Text style={{fontWeight:'bold',fontSize:17}}>{produto.p_nome_produto}</Text> */}
                        </View>
                        <Divider style={{ backgroundColor: '#000' }} ></Divider>
                      </TouchableOpacity>
                      
                      )
                })}
              </View>
        </Content>
        <Rodape atual="pedidos_filho_pai" />
    </Container>
    )
  }

}

const mapStateToProps = state => ({
  lista_produtos_solicitados_filho: state.AppReducer.lista_produtos_solicitados_filho
});

export default connect(mapStateToProps,{produtosSolicitadosFilho})(PedidosFilhoPai);

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