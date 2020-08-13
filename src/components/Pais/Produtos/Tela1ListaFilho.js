/**
 * Esta dela deve lista os filhos do pai que esta logado no aplicativo.
 * Ao clicar sob o nome do filho, deverá ser carregada a pagina com a lista de produtos solicitados pelo filho. 
 */


import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, ImageBackground} from 'react-native';
import {Container, Content, Header, Left, Right, Body, Button, Icon, CardItem, ListItem, List} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';




import { 
    listaDadosFilhos, 
    atualizarIDFilhoSelecionado
} from '../../../actions/AppPaiProdutoActions';
import Rodape from '../Rodape';
import Menu from "../../../config/Menu";

class Tela1ListaFilho extends React.Component{

    constructor(props) {
        super(props);
        this.props.listaDadosFilhos(this.props.id_pai);
    }

    abrirTela2(id_filho){
        this.props.atualizarIDFilhoSelecionado(id_filho);
        Actions.tela2listaproduto({id_filho});
      }

    renderFilhos(){
        if(this.props.filhos.length == 0){
            return (
                <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#000000',marginTop:20, marginBottom:20}}>Você precisa ter um <Text style={{fontWeight: 'bold'}}>Filho cadastrado</Text>{'\n'} para ver os Produtos solicitados!</Text>
                /*<Text style={{textAlign:'center'}}>Você precisa ter um filho cadastrado para ver os produtos solicitados.</Text>*/
            );
        } else {
            return (
                <View>
                    {/*<Text style={{fontSize:20,textAlign:'center'}}>Selecione um filho para ver os produtos solicitados</Text>*/}
                    <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#000000',marginTop:20, marginBottom:20}}>Selecione o <Text style={{fontWeight: 'bold'}}>Filho</Text>{'\n'} para ver os Produtos solicitados!</Text>
                    {this.props.filhos.map((filhos, index) => {
                    return (
                        <TouchableOpacity onPress={() => this.abrirTela2(filhos.id)} key={index}>
                            <CardItem style={{backgroundColor:'#13a7df',marginLeft:15,marginRight:15,marginBottom:15}}>
                            <Left>
                            <Icon active style={{color:'#fff', fontSize:40}} name="person" />
                            <Text style={{color:"#fff", fontSize:20, marginHorizontal:10}}>{filhos.nome}</Text>
                            </Left>
                            <Right>
                                <Icon style={{color:"#fff"}} name="arrow-forward" />
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
            <ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../../../imgs/background-t3.jpg')} >
                <Menu tipo="paiVoltar" />
                <Content >
                    <List padder>
                        <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                            <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-cart' android='md-cart' />
                            <Text style={{fontSize:15,color:'#338fb5'}}> Produtos Solicitados</Text>
                        </ListItem>
                    </List>

                    {this.renderFilhos()}

                </Content>
                {/*<Rodape atual="estatisticas" />*/}
            </ImageBackground>
        </Container>
    )
  }
}

const mapStateToProps = state => ({
    id_pai:state.AppReducer.idPaiAtual,
    filhos:state.AppPaiProdutoReducer.lista_filhos
});

export default connect(mapStateToProps,{listaDadosFilhos, atualizarIDFilhoSelecionado})(Tela1ListaFilho);
