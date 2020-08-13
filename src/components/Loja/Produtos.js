import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { buscaProdutos } from '../../actions/AppFilhoActions';
import {URL_ADMIN_FUTURONERD} from '../../config/Constants';

class Produtos extends React.Component{

  componentWillMount(){
    this.props.buscaProdutos();
  }

  validaImagem(F){
      if(F != 'sem foto' && F != '0'){
          return(
              <Image style={{width:100,height:110}} source={{uri: URL_ADMIN_FUTURONERD + `/uploads/${F}`}} />
          )
      }else {
          return(
              <Image style={{width:100,height:110}} source={{uri: URL_ADMIN_FUTURONERD + `/images/semfoto2.jpg`}} />
          )
      }
  }

  render(){
    return(
      <View>
      {this.props.produtos.map((produto, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => Actions.produto({idProduto:produto.id})} >
            <View style={{backgroundColor:"#ffffff",borderWidth:1.5,borderLeftWidth:4,borderRightWidth:4,borderColor:"#000000",flexDirection:'row',overflow:'hidden',marginVertical:10}}>
              {this.validaImagem(produto.foto)}
              <View style={{padding:10,flex:1}}>
                <Text style={{fontWeight:'bold',fontSize:18}}>{produto.nome_produto}</Text>
                <Text>{produto.descricao}</Text>
                <Text style={{fontWeight:'bold',fontSize:15,color:"#13a7df"}}><Icon name="trophy" style={{color:"#13a7df"}} /> {produto.preco}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
    )
  }
}

const mapStateToProps = state => ({
  produtos:state.AppFilhoReducer.produtos
});

export default connect(mapStateToProps,{buscaProdutos})(Produtos);