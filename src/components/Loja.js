import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {Container, Content, Icon, Input, Item, List, ListItem} from 'native-base';
import { connect } from 'react-redux';

import Menu from '../config/Menu';
import Produtos from './Loja/Produtos';

class Loja extends React.Component{

  render() {
    return(
      <Container style={{backgroundColor:'#ffffff'}}>
          <ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../imgs/background-t2.jpg')} >
                <Menu tipo="voltar" nome={this.props.nome} pts={this.props.pts}/>
                <Content>
                    <List padder>
                        <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                            <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-basket' android='md-basket' />
                            <Text style={{fontSize:15,color:'#338fb5'}}> Loja</Text>
                        </ListItem>
                    </List>
                      {/*<View style={{padding:10}}>
                        <Text style={{fontSize:60}}>Loja</Text>*/}
                        {/* <Item>
                          <Icon name="search" />
                          <Input placeholder="Procure por algum produto" />
                          <Icon name="cube" />
                        </Item> */}
                      {/*</View>*/}
                      <View style={{padding:10}}>
                            <Produtos />
                      </View>
                </Content>
          </ImageBackground>
      </Container>
    )
  }
}

const mapStateToProps = state =>({
    nome:state.AppFilhoReducer.nomeFilho,
    pts:state.AppFilhoReducer.pts
})

export default connect(mapStateToProps,{})(Loja);