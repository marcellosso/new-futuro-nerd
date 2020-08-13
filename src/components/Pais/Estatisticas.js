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

class Estatisticas extends React.Component{

    componentWillMount(){
        this.props.listaDadosFilhos(this.props.id_pai);
    }

    constructor(props) {
        super(props);
        //this.props.listaDadosFilhos(this.props.id_pai);
    }

    renderFilhos(){
        if(this.props.filhos.length == 0){
            //ID PAI {JSON.stringify(this.props)}
            return (
                <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#000000',marginTop:20, marginBottom:20}}>Você precisa ter um <Text style={{fontWeight: 'bold'}}>Filho cadastrado</Text>{'\n'} para acompanhar as Estatísticas!</Text>
                /*<Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#ffffff',marginTop:20, marginBottom:20}}>Você precisa ter um filho cadastrado para ver as estatísticas.</Text>*/
            );
        } else {
            return (
                <View>
                    <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#000000',marginTop:20, marginBottom:20}}>Selecione o <Text style={{fontWeight: 'bold'}}>Filho</Text>{'\n'} para acompanhar as Estatísticas!</Text>
                    {this.props.filhos.map((filhos, index) => {
                        return (
                            <TouchableOpacity onPress={() => Actions.materiasfilho({id:filhos.id,serie:filhos.id_serie})} key={index}>
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
                <ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../../imgs/background-t3.jpg')} >
                    <Menu tipo="paiVoltar" />
                    <Content>
                        <List padder>
                            <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                                <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-analytics' android='md-analytics' />
                                <Text style={{fontSize:15,color:'#338fb5'}}> Estatísticas</Text>
                            </ListItem>
                        </List>
                        <View>
                            {this.renderFilhos()}
                        </View>
                    </Content>
                </ImageBackground>
                {/*<Rodape atual="estatisticas" />*/}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    id_pai:state.AutenticacaoReducer.idPai,
    filhos:state.AppReducer.filhos
});

export default connect(
    mapStateToProps,{
        listaDadosFilhos
    })(Estatisticas);

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