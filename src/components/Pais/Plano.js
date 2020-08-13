import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, ImageBackground} from 'react-native';
import {Container, Header, Left, Button, Icon, Body, Right, Content, Card, ListItem, List} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { modificaPlanoPai, buscaDadosPai, listaDadosPlano } from '../../actions/AppActions';
import Menu from "../../config/Menu";
import Rodape from "./Rodape";

class Plano extends React.Component {
        
    componentWillMount(){
        this.props.listaDadosPlano();
      }

    componentWillReceiveProps(){
        this.props.buscaDadosPai(this.props.id);
    }

    atualizacaoPlano(){
        if(this.props.loading_plano == true){
            return (
                <View padder>
                    <ActivityIndicator size="small"/>
                </View>
            );
        } else {
            return (
                this.statusPlano()
            );
        }
    }


    renderListaCardPlano (id) {
        return (this.props.planos.map((plano, index) => {
            return (
                <Card style={{paddingBottom:15,borderBottomWidth:4,borderColor:"#000",backgroundColor:'#ffffff',elevation:1}} key={index.toString()}>
                    <Text style={{textAlign:'center',color:'#000',fontSize:28,fontWeight:'300',marginTop:12,marginBottom:10}}>{plano.titulo}</Text>
                    <Text style={{paddingHorizontal:15,color:'#000',fontSize:15,fontWeight:'300',textAlign:'justify'}}>{plano.descricao}</Text>
                    <View style={{padding:10,marginTop:10,justifyContent:"center",alignItems:'center'}}>
                        {/*<Text style={{color:'#000',fontSize:22,fontWeight:'300'}}>Escolha este plano:</Text>*/}
                        <Button transparent bordered light style={{backgroundColor:"#000"}} onPress={() => this.props.modificaPlanoPai(plano.id,id)}>
                            <Text style={{color:'#fff',paddingHorizontal:10}}>Selecionar</Text>
                        </Button>
                    </View>
                </Card>
            )
        }));
    }

    renderCardPlano (idPlano) {
        return (this.props.planos.filter((p)=>{return p.id == idPlano}).map((plano, index) => {
            return(
                <Card key={idPlano.toString()}>
                    <View style={{alignItems:'center',padding:10,backgroundColor:'#0fa087'}}>
                        <Icon name="happy" style={{color:"#fff",fontSize:70}} />
                        <Text style={{color:"#fff",marginVertical:5,fontSize:24,fontWeight:'200'}}>Seu plano está ativo!</Text>
                        {/*<Text style={{color:"#fff",fontSize:28,textAlign:'center',marginVertical:10}}>Você possui o plano: {this.props.plano}</Text>*/}
                        <Text style={{color:"#fff",fontSize:28,textAlign:'center',marginVertical:10}}>{plano.titulo}</Text>
                        <Text style={{color:"#fff",marginVertical:5,fontSize:15,fontWeight:'200'}}>{plano.descricao}</Text>
                    </View>
                </Card>
            );

        }));
    }

    statusPlano(){
        const {plano,id} = this.props;
        switch (Number(plano)) {
            case 0:
                return(
                    <View style={{padding:10}}>
                        <Card>
                            <View style={{alignItems:'center',padding:10,backgroundColor:"#e55060"}}>
                                <Icon name="sad" style={{color:"#ffffff",fontSize:70}} />
                                <Text style={{color:"#ffffff",marginVertical:5,fontSize:24,fontWeight:'200'}}>Ops!</Text>
                                <Text style={{color:"#ffffff",fontSize:18,textAlign:'center',marginVertical:10}}>Você ainda não tem nenhum Plano ativo</Text>
                            </View>
                        </Card>
                        <Card style={{backgroundColor:'#13a7df',zIndex:1,padding:10,elevation:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontSize:20,fontWeight:'300',marginVertical:10,marginRight:10}}>Escolha um plano abaixo!</Text>
                            <Icon style={{color:'white'}} name="arrow-down"/>
                        </Card>
                        {this.renderListaCardPlano (id)}
                    </View>
                );
                break;
            default:
                return(
                    <View style={{padding:10}}>
                        {this.renderCardPlano(Number(plano))}
                    </View>
                );
            break;
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
                            <Text>Meu Plano</Text>
                        </Body>
                        <Right />
                    </Header>*/}
                    <Content>
                        <List padder>
                            <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                                <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-card' android='md-card' />
                                <Text style={{fontSize:15,color:'#338fb5'}}> Meu Plano</Text>
                            </ListItem>
                        </List>
                        {this.atualizacaoPlano()}
                    </Content>
                </ImageBackground>
                {/*<Rodape atual="plano" />*/}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    plano:state.AppReducer.planoPaiAtual,
    id:state.AppReducer.idPaiAtual,
    loading_plano:state.AppReducer.loading_plano, 
    planos:state.AppReducer.planos
});

export default connect(mapStateToProps,{modificaPlanoPai,buscaDadosPai,listaDadosPlano})(Plano);

const styles = StyleSheet.create({

});