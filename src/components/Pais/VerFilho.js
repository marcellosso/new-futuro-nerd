import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator, ImageBackground, StyleSheet
} from 'react-native';
import {
    Container,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Right,
    Content,
    Separator,
    Form,
    Input,
    Item,
    Picker, ListItem, List
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
    buscaDadosFilho,
    limpaRegistroFilho,
    modificaNomeFilhoEditando,
    modificaEmailFilhoEditando,
    modificaSenhaFilhoEditando,
    modificaSerieFilhoEditando,
    atualizaSistemaDadosFilho
} from '../../actions/AppActions';
import Menu from "../../config/Menu";
import Rodape from "./Rodape";

var width = Dimensions.get('window').width;

class VerFilho extends React.Component{

    verSenha(){
        if(this.state.secure == true){
            this.setState({secure:false, iconSecure:'eye-off'});
        } else {
            this.setState({secure:true, iconSecure:'eye'});
        }
    }

    constructor(props){
        super(props);
        const {id} = this.props;
        this.props.buscaDadosFilho(id);
        this.state = {
            secure: true,
            iconSecure: 'eye'
        }
    }

    componentWillUnmount(){
        this.props.limpaRegistroFilho();
    }

    _atualizaDadosFilho(){
        const { nome, email, senha, id_serie, id } = this.props;

        this.props.atualizaSistemaDadosFilho({
            nome,
            email,
            senha,
            id_serie,
            id
        })

    }

    renderBtnAtualiza(){
        if(this.props.loading_atualiza != true){
          return(
            <Button style={{margin:10}} block style={styles.btnAtualizar} onPress={() => this._atualizaDadosFilho()}><Text style={styles.txtBotao2}>Atualizar Dados</Text></Button>
          );
        } else {
          return(
            <Button style={{margin:10}} block style={styles.btnAtualizar}>
              <ActivityIndicator size='small' />
            </Button>
          );
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
                            <Text>{this.props.nome}</Text>
                        </Body>
                        <Right/>
                    </Header>*/}
                    <Content>
                        {/*<Separator>
                            <Text>Atualização de dados</Text>
                        </Separator>*/}
                        <List padder>
                            <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                                <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-bookmarks' android='md-bookmarks' />
                                <Text style={{fontSize:15,color:'#338fb5'}}> Atualização do Filho</Text>
                            </ListItem>
                        </List>
                        <View style={{marginTop:15,paddingLeft:15,paddingRight:15}}>
                            <Item last style={styles.FormItem}>
                                <Icon active style={styles.FormIcon} name="contact"/>
                                <Input
                                    style={styles.FormInput}
                                    placeholder="Nome"
                                    value={this.props.nome}
                                    onChangeText={texto => this.props.modificaNomeFilhoEditando(texto)}
                                />
                            </Item>
                            <Item last style={styles.FormItem2}>
                                <Icon active style={styles.FormIcon} name="mail"/>
                                <Input
                                    style={styles.FormInput}
                                    placeholder="Email"
                                    editable = {false}
                                    value={this.props.email}
                                    onChangeText={texto => this.props.modificaEmailFilhoEditando(texto)}
                                />
                            </Item>
                            <Item last style={styles.FormItem}>
                                <Icon active style={styles.FormIcon} name="lock"/>
                                <Input
                                    style={styles.FormInput}
                                    placeholder="Senha"
                                    value={this.props.senha}
                                    secureTextEntry={this.state.secure}
                                    onChangeText={texto => this.props.modificaSenhaFilhoEditando(texto)}
                                />
                                <TouchableOpacity onPress={() => this.verSenha()}>
                                    <Icon active style={{fontSize:25}} name={this.state.iconSecure}/>
                                </TouchableOpacity>
                            </Item>
                            <Item last style={styles.FormItem}>
                                <Picker
                                    iosHeader="Séries"
                                    placeholder="Selecione uma série"
                                    headerBackButtonText="Voltar"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    mode="dropdown"
                                    selectedValue={this.props.id_serie}
                                    onValueChange={this.props.modificaSerieFilhoEditando.bind(this)}
                                >
                                    {this.props.series.map((series, index) => {
                                        return (
                                            <Picker.Item key={index} label={series.serie} value={series.id} />
                                        )
                                    })}
                                </Picker>
                            </Item>
                        </View>
                        {this.renderBtnAtualiza()}
                    </Content>
                </ImageBackground>
                {/*<Rodape atual="atualizacaoFilho" />*/}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    //console.log('----');
    //console.log(state);
    return {
        nome:state.AppReducer.nomeFilhoEditando,
        email:state.AppReducer.emailFilhoEditando,
        senha:state.AppReducer.senhaFilhoEditando,
        id_serie:state.AppReducer.serieFilhoEditando,
        series:state.AppReducer.series,
        loading_atualiza:state.AppReducer.loading_atualiza
    }};

export default connect(mapStateToProps,{
    buscaDadosFilho,
    limpaRegistroFilho,
    modificaEmailFilhoEditando,
    modificaNomeFilhoEditando,
    modificaSenhaFilhoEditando,
    modificaSerieFilhoEditando,
    atualizaSistemaDadosFilho
})(VerFilho);

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
    },
    FormItem: {
        backgroundColor: "#ffffff",
        padding:0,
        margin:0,
        borderColor:"#000000",
        borderLeftWidth: 4,
        borderBottomWidth:0,
        marginTop:0,
        marginBottom:10
    },
    FormItem2: {
        backgroundColor: "#cccccc",
        padding:0,
        margin:0,
        borderColor:"#000000",
        borderLeftWidth: 4,
        borderBottomWidth:0,
        marginTop:0,
        marginBottom:10
    },
    FormIcon: {
        marginLeft:15,
        color:"#000000"
    },
    FormInput: {
        paddingVertical:10,
        fontSize: 15
    },
    txtBotao: {
        color:'#000000',
        fontSize:16
    },
    txtBotao2: {
        color:'#ffffff',
        fontSize:18
    },
    inputs: {
        padding:10,
        paddingLeft:15,
        backgroundColor: "#ffffff",
        color: "#000000",
        fontSize: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#000000'
    },
    inputs2: {
        padding:10,
        paddingLeft:15,
        backgroundColor: "#ffffff",
        color: "#000",
        fontSize: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#000000',
        marginTop:20
    },
    btnAtualizar:{
        backgroundColor:"#000000",
        margin:15,
        marginTop:10
    }
});