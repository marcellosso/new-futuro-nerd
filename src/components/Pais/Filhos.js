import React from 'react';
import {
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity, ImageBackground, StyleSheet, Alert
} from 'react-native';
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
    Separator,
    Picker,
    CardItem, ListItem, List
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {
    listaDadosSeries,
    cadastraFilho,
    modificaNomeFilho,
    modificaEmailFilho,
    modificaSenhaFilho,
    listaDadosFilhos
} from '../../actions/AppActions';
import Menu from "../../config/Menu";
import Rodape from "./Rodape";

var width = Dimensions.get('window').width;

class Filhos extends React.Component {

    verSenha(){
        if(this.state.secure == true){
            this.setState({secure:false,iconSecure:'eye-off'});
        } else {
            this.setState({secure:true,iconSecure:'eye'});
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            selected: "selecione",
            secure: true,
            iconSecure: 'eye'
        };
        this.props.listaDadosSeries();
        this.props.listaDadosFilhos(this.props.id_pai);
    }

    onValueChange(string) {
        this.setState({
            selected: string
        });
    }

    _cadastraFilho(){
        const { nomeFilho, emailFilho, senhaFilho, id_pai } = this.props;
        // # MXTera -
        if (nomeFilho.trim() == '' || emailFilho.trim() == '' || senhaFilho.trim() == '') {
            Alert.alert('Atenção!', 'Todos os campos devem ser preenchidos!', [{text: 'OK', onPress: () => null},], { cancelable: false });
            return false;
        }
        if (emailFilho.trim().indexOf('@') == -1 || emailFilho.trim().indexOf('.') == -1) {
            Alert.alert('Atenção!', 'Digite um E-mail válido!', [{text: 'OK', onPress: () => null},], { cancelable: false });
            return false;
        }
        if (senhaFilho.trim().length < 8) {
            Alert.alert('Atenção!', 'A Senha deve ter no mínimo 8 dígitos!', [{text: 'OK', onPress: () => null},], { cancelable: false });
            return false;
        }
        // # -
        const { selected } = this.state;

        this.props.cadastraFilho({
            nomeFilho,
            emailFilho,
            senhaFilho,
            selected,
            id_pai
        }, () => {
            this.props.listaDadosFilhos(this.props.id_pai);
        });
    }

    renderFilhos(){
        if(this.props.filhos.length == 0){
            return (
                <Text style={{ textAlign:'center',fontSize:15,marginVertical:10,color:'#000',marginTop:30 }}>Você ainda não possui nenhum filho cadastrado.</Text>

        );
        } else {
            return (
                <View>
                {this.props.filhos.map((filhos, index) => {
                    return (
                        <TouchableOpacity onPress={() => Actions.verfilho({id:filhos.id})} key={index}>
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

    renderBtnCad(){
        if(this.props.loading_cadastra_filho != true){
            return(
            <Button block style={styles.btnAtualizar} onPress={() => this._cadastraFilho()}><Text style={styles.txtBotao2}>Cadastrar Filho</Text></Button>
            );
        } else {
            return(
            <Button block style={styles.btnAtualizar}>
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
                    <Text>Filhos</Text>
                </Body>
                <Right/>
            </Header>*/}
            <Content>
                {/*<Separator>
                <Text>Cadastre o seu filhos</Text>
                </Separator>*/}
                <List padder>
                    <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                        <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-bookmarks' android='md-bookmarks' />
                        <Text style={{fontSize:15,color:'#338fb5'}}> Cadastre o seu Filho</Text>
                    </ListItem>
                </List>
                <View style={{marginTop:15,paddingLeft:15,paddingRight:15}}>
                    <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="contact"/>
                        <Input
                            style={styles.FormInput}
                            placeholder="Nome"
                            value={this.props.nomeFilho}
                            onChangeText={texto => this.props.modificaNomeFilho(texto)}
                        />
                    </Item>
                    <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="mail"/>
                        <Input
                            style={styles.FormInput}
                            placeholder="Login/Email"
                            value={this.props.emailFilho}
                            autoCapitalize="none"
                            onChangeText={texto => this.props.modificaEmailFilho(texto)}
                        />
                    </Item>
                    {/*<Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="lock"/>
                        <Input
                            placeholder="Senha"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            value={this.props.senhaFilho}
                            onChangeText={texto => this.props.modificaSenhaFilho(texto)}
                        />
                    </Item>*/}
                    <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="lock"/>
                        <Input
                            style={styles.FormInput}
                            placeholder='Senha'
                            value={this.props.senhaFilho}
                            secureTextEntry={this.state.secure}
                            autoCapitalize="none"
                            onChangeText={texto => this.props.modificaSenhaFilho(texto)}
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
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                    >
                        {this.props.series.map((series, index) => {
                            return (
                                <Picker.Item key={series.id} label={series.serie} value={series.id} />
                            )
                        })}
                    </Picker>
                    </Item>
                </View>
                {this.renderBtnCad()}
                {/*<Separator>
                <Text>Filhos Cadastrados</Text>
                </Separator>*/}
                <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#000',marginTop:20,marginBottom:10,fontWeight:"bold"}}>Filhos Cadastrados</Text>
                {this.renderFilhos()}
            </Content>
            </ImageBackground>
            {/*<Rodape atual="cadastrarFilho" />*/}
        </Container>
        );
    }
}

const mapStateToProps = state => ({
    series:state.AppReducer.series,
    loading_cadastra_filho:state.AppReducer.loading_cadastra_filho,
    nomeFilho:state.AppReducer.nomeFilho,
    emailFilho:state.AppReducer.emailFilho,
    senhaFilho:state.AppReducer.senhaFilho,
    id_pai:state.AppReducer.idPaiAtual,
    filhos:state.AppReducer.filhos
})

export default connect(mapStateToProps,{
    cadastraFilho,
    listaDadosSeries,
    modificaNomeFilho,
    modificaEmailFilho,
    modificaSenhaFilho,
    listaDadosFilhos,
})(Filhos);

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
