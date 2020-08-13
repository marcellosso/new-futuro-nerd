import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {Icon, Button, Container, Content} from 'native-base';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';

import { buscaProduto, getPtsFilho, limparBuscaProduto } from '../../actions/AppFilhoActions';
import {URL_API_FUTURONERD,URL_ADMIN_FUTURONERD} from '../../config/Constants';
import Menu from '../../config/Menu';
import * as Animatable from "react-native-animatable";

class Produto extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      status:null
    }
  }

  componentWillMount(){
    this.props.limparBuscaProduto();
    this.props.buscaProduto(this.props.idProduto);
    this.verificarStatus(this.props.id,this.props.idProduto);
  }

  verificarStatus(filho,produto){
    axios.get(URL_API_FUTURONERD + `/loja/produto-verifica/${filho}/${produto}`)
    .then(status => {
        if(status.data.status_pedido == 1){
          this.setState({status:1});
        } else {
          this.setState({status:0});
        }
    })
    .catch(() => {
      console.log('Erro ao recuperar os dados de verificacao');
    });
  }

  solicitarProduto(filho,produto){
    axios.post(URL_API_FUTURONERD + '/loja/produto',{
      id_filho:filho,
      id_produto:produto,
      status_pedido:1
    })
    .then(status => {
      if(isNaN(status.id)){
        this.setState({status:1});
        alert('Produto Solicitado!');
      } else {
        alert('Houve um erro, tente novamente mais tarde');
      }
      this.props.getPtsFilho(filho);
    })
    .catch(erro => {
      console.log(erro);
    });
  }

  renderBtnSolicita(pts_produtos){
    if(this.state.status == 1){
      return(
          <Button full large style={styles.btnJaSolicitado} onPress={() => null}>
              <Text style={styles.txtBotao}><Icon ios='ios-checkmark' android='md-checkmark' style={{fontSize:20,color:"#ffffff"}}/> Produto Solicitado!</Text>
          </Button>
      );
    }else if(this.state.status == 0){
        if(parseInt(this.props.pts) > parseInt(pts_produtos)){
            return(
                <Button full large style={styles.btnAtualizar} onPress={() => this.solicitarProduto(this.props.id,this.props.idProduto)}>
                    <Text style={styles.txtBotao}>Solicitar Produto!</Text>
                </Button>
            );
        }else{
            return(
                <Button full large style={styles.btnAtualizarNot}>
                    <Text style={styles.txtBotao}>Você não tem Pontos Suficientes! </Text>
                </Button>
            );
        }

    }
  }

    validaImagem(F){
        if(F != 'sem foto' && F != '0'){
            return(
                {uri: URL_ADMIN_FUTURONERD + `/uploads/${F}`}
            )
        }else {
            return(
                {uri: URL_ADMIN_FUTURONERD + `/images/semfoto2.jpg`}
            )
        }
    }

  render(){
    return(
        <Container>
            <ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../../imgs/background-t2.jpg')}>
                <Menu tipo="voltar" nome={this.props.nome} pts={this.props.pts}/>
                <HeaderImageScrollView
                          maxHeight={300}
                          minHeight={80}
                          headerImage={this.validaImagem(this.props.foto)}
                          scrollViewBackgroundColor="transparent"
                          /*renderFixedForeground={() => (
                                <View style={{padding:20,marginTop:10}}>
                                      <TouchableOpacity onPress={() => Actions.pop()}>
                                            <View style={{elevation:1,flexDirection:'row',backgroundColor:'#338fb5',width:80, alignItems:'center',justifyContent:'center',padding:5}}>
                                                  <Icon style={{color:'#ffffff',fontSize:16}} name="arrow-back"/>
                                                  <Text style={{color:'#ffffff',marginLeft:5,fontSize:16}}>
                                                    Voltar
                                                  </Text>
                                            </View>
                                      </TouchableOpacity>
                                </View>
                          )}*/
                >
                    <View style={{ flex:1 }}>
                          <TriggeringView style={{padding:20,justifyContent:"center"}} onHide={() => console.log('text hidden')} >
                                <Text style={{backgroundColor:"#ffffff",fontWeight:"bold",paddingLeft:10,paddingRight:10,paddingTop:10,textAlign:"center"}}>{this.props.nomeProduto}</Text>
                                <Text style={{borderStyle:"dotted",borderBottomWidth:2,borderColor:'#ccc',backgroundColor:"#ffffff",paddingLeft:10,paddingRight:10,paddingBottom:10,textAlign:"center"}}>{this.props.descricao}</Text>
                                {/*<View style={{borderBottomWidth:2,borderColor:'#ccc',marginVertical:10}}/>*/}
                                <View style={{borderBottomWidth:5,borderColor:'#000',backgroundColor:"#ffffff",flexDirection:'row',justifyContent:"center",alignItems: 'center',padding:10}}>
                                      <Text style={{fontSize:18}}>Custo: </Text>
                                      <Icon name="trophy" style={{fontSize:38,color:"#13a7df"}}/>
                                      <Text style={{fontSize:18,marginLeft:5,color:"#13a7df"}}>{this.props.preco}</Text>
                                </View>
                                {/*<View style={{borderBottomWidth:2,borderColor:'#ccc',marginVertical:10}}/>*/}
                          </TriggeringView>
                    </View>
                </HeaderImageScrollView>
                <Animatable.View animation="slideInUp" iterationCount={1}>
                    {this.renderBtnSolicita(this.props.preco)}
                </Animatable.View>
            </ImageBackground>
        </Container>
    )
  }
}

const mapStateToProps = state => ({
  id:state.AppFilhoReducer.idFilho,
  nomeProduto:state.AppFilhoReducer.nomeProdutoAtual,
  descricao:state.AppFilhoReducer.descricaoProdutoAtual,
  preco:state.AppFilhoReducer.precoProdutoAtual,
  foto:state.AppFilhoReducer.fotoProdutoAtual,
  nome:state.AppFilhoReducer.nomeFilho,
  pts:state.AppFilhoReducer.pts
});

export default connect(mapStateToProps,{buscaProduto, getPtsFilho, limparBuscaProduto})(Produto);

const styles = StyleSheet.create({
  btnAtualizar:{
    backgroundColor:"#000000",
    margin:15,
    marginTop:30
  },
  btnAtualizarNot:{
    backgroundColor:"#cc3300",
    margin:15,
    marginTop:30
  },
  btnJaSolicitado:{
    //backgroundColor:"#e89d21",
    backgroundColor:"#0fa087",
    margin:15,
    marginTop:30
  },
  txtBotao: {
    color:'#ffffff',
    fontSize:16
  }
})
