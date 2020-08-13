import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import { Icon, Button, Container, Content } from 'native-base';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { LinearGradient } from 'expo-linear-gradient'
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';

import { buscaDadosPai } from '../../actions/AppActions';

import Rodape from './Rodape';
import Menu from "../../config/Menu";

class PrincipalPai extends React.Component{

    getSaudacao(){
        var data = new Date();

        hora = data.getHours();

        if(hora <= 11){
            saudacao = 'Bom Dia';
        } else if(hora < 18){
            saudacao = 'Boa Tarde';
        } else {
            saudacao = "Boa Noite";
        }

        this.setState({saudacao});
    }

    constructor(props){
        super(props);

        this.state = {
            saudacao:''
        }
    }

    componentWillMount(){
        this.props.buscaDadosPai(this.props.idPai);
        this.getSaudacao();
    }

    render(){
        return(

            <Container>
                {/*<HeaderImageScrollView
                maxHeight={300}
                minHeight={20}
                headerImage={require('../../imgs/background-t2.jpg')}
                minOverlayOpacity={0.45}
                renderForeground={() => (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:25}}>
                            {this.state.saudacao}, <Text style={{fontWeight:"bold"}}>{this.props.nomePai}</Text>!
                        </Text>
                    </View>
                )}
                >*/}

                <ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../../imgs/background-t3.jpg')} >
                        <Menu tipo="paiPrincipal" saudacao={this.state.saudacao} nome={this.props.nomePai} />
                        <Content style={{marginTop:20}}>
                            <TouchableOpacity onPress={() => Actions.estatisticas()}>
                                <LinearGradient
                                    /*colors={['#B24592', '#F15F79']}*/
                                    colors={['#13a7df', '#13a7df']}
                                    style={{flex:1,flexDirection:'row',alignItems:'center',margin:5,padding:10,paddingLeft:20}}>
                                    <Icon name="analytics" style={{color:'white',fontSize:40}} />
                                    <Text style={{paddingHorizontal:20,fontSize:26,color:'white',fontWeight:'200',}}>Estatísticas</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Actions.plano()}>
                                <LinearGradient
                                    /*colors={['#134E5E', '#71B280']}*/
                                    /*colors={['#45b248', '#55f1ac']}*/
                                    colors={['#13a7df', '#13a7df']}
                                    style={{flex:1,flexDirection:'row',alignItems:'center',margin:5,padding:10,paddingLeft:20}}>
                                    <Icon name="card" style={{color:'white',fontSize:40}} />
                                    <Text style={{paddingHorizontal:20,fontSize:26,color:'white',fontWeight:'200',}}>Meu Plano</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            {/* lojapai */}
                            {/*<TouchableOpacity onPress={() => Actions.pedidosfilhopai()}>
                                <LinearGradient
                                    colors={['#457fca', '#5691c8']}
                                    colors={['#f18705', '#f1a470']}
                                    colors={['#13a7df', '#13a7df']}
                                    style={{flex:1,flexDirection:'row',alignItems:'center',margin:10,padding:20}}>
                                    <Icon name="cart" style={{color:'white',fontSize:60}} />
                                    <Text style={{paddingHorizontal:20,fontSize:32,color:'white',fontWeight:'200',}}>Produtos</Text>
                                </LinearGradient>
                            </TouchableOpacity>*/}
                            <TouchableOpacity onPress={() => Actions.tela1listafilho()}>
                                <LinearGradient
                                    /*colors={['#457fca', '#5691c8']}*/
                                    /*colors={['#f18705', '#f1a470']}*/
                                    colors={['#13a7df', '#13a7df']}
                                    style={{flex:1,flexDirection:'row',alignItems:'center',margin:5,padding:10,paddingLeft:20}}>
                                    <Icon name="cart" style={{color:'white',fontSize:40}} />
                                    <Text style={{paddingHorizontal:20,fontSize:26,color:'white',fontWeight:'200',}}>Produtos</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Actions.filhos()}>
                                <LinearGradient
                                    /*colors={['#cb2d3e', '#ef473a']}*/
                                    /*colors={['#457fca', '#56c6f1']}*/
                                    colors={['#13a7df', '#13a7df']}
                                    style={{flex:1,flexDirection:'row',alignItems:'center',margin:5,padding:10,paddingLeft:20}}>
                                    <Icon name="bookmarks" style={{color:'white',fontSize:40}} />
                                    <Text style={{paddingHorizontal:20,fontSize:26,color:'white',fontWeight:'200',}}>Cadastrar Filho</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Actions.ajudapai()}>
                                <LinearGradient
                                    /*colors={['#cb2d3e', '#ef473a']}*/
                                    /*colors={['#457fca', '#56c6f1']}*/
                                    colors={['#13a7df', '#13a7df']}
                                    style={{flex:1,flexDirection:'row',alignItems:'center',margin:5,padding:10,paddingLeft:20}}>
                                    <Icon name="help-buoy" style={{color:'white',fontSize:40}} />
                                    <Text style={{paddingHorizontal:20,fontSize:26,color:'white',fontWeight:'200',}}>Ajuda</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </Content>
                        {/*</HeaderImageScrollView>*/}
                        <Rodape atual="principal"/>
                </ImageBackground>
            </Container>

        )
    }
}

const mapStateToProps = state => ({
    idPai:state.AutenticacaoReducer.idPai,
    nomePai:state.AppReducer.nomePaiAtual
});

export default connect(mapStateToProps,{buscaDadosPai})(PrincipalPai);
