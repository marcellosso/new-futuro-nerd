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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import {
  atualizaSistemaDadosPai,
  modificaNomePai,
  modificaSenhaPai,
  modificaCelularPai,
  modificaEmailPai,
  modificaCepPai,
  modificaUfPai,
  modificaCidadePai,
  modificaBairroPai,
  modificaLogradouroPai,
  modificaNumeroPai,
  modificaCPFPai
} from '../../actions/AppActions';
import Rodape from './Rodape';
import Menu from "../../config/Menu";

class ConfiguracoesPai extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      secure: true,
      iconSecure: 'eye'
    }

  }

  componentWillReceiveProps(){
    console.log('Pai:' + this.props.cep)
  }

  verSenha(){
    if(this.state.secure == true){
      this.setState({secure:false,iconSecure:'eye-off'});
    } else {
      this.setState({secure:true,iconSecure:'eye'});
    }
  }

  _atualizaDados(){
    const {nome, email, senha, celular, id, cep, uf, cidade, bairro, logradouro, numero} = this.props;
    console.log('Cep '  + cep);
    this.props.atualizaSistemaDadosPai({
      nome,
      email,
      senha,
      celular,
      id,
      cep,
      uf,
      cidade,
      bairro,
      logradouro,
      numero
    });
  }

  renderBtnAtualiza(){
    if(this.props.loading_atualiza != true){
      return(
        <Button block style={styles.btnAtualizar} onPress={() => this._atualizaDados()}><Text style={styles.txtBotao2}>Atualizar Dados</Text></Button>
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
            <KeyboardAwareScrollView
                enableOnAndroid
                enableAutomaticScroll
                keyboardOpeningTime={0}
                extraScrollHeight={150}
            >
            <Menu tipo="paiVoltar" />
            {/*<Header style={{marginTop:24}}>
              <Left>
                <Button transparent onPress={() => Actions.pop()}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Text>Configurações</Text>
              </Body>
              <Right/>
            </Header>	*/}
            <Content>
                <List padder>
                    <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                        <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-construct' android='md-construct' />
                        <Text style={{fontSize:15,color:'#338fb5'}}> Configurações</Text>
                    </ListItem>
                </List>
                <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#000',marginTop:20,marginBottom:0,fontWeight:"bold"}}>Meus Dados</Text>
                <View style={{marginTop:15,paddingLeft:15,paddingRight:15}}>
                    <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="contact"/>
                        <Input
                        style={styles.FormInput}
                          placeholder='Nome e Sobrenome'
                          value={this.props.nome}
                          onChangeText={texto => this.props.modificaNomePai(texto)}
                          placeholderTextColor="#b2b2b2"
                        />
                    </Item>
                    <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="mail"/>
                        <Input
                        style={styles.FormInput}
                          placeholder='E-mail'
                          value={this.props.email}
                          autoCapitalize="none"
                          onChangeText={texto => this.props.modificaEmailPai(texto)}
                        />
                    </Item>
                    <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="call"/>
                        <TextInputMask
                        style={styles.FormInput}
                          placeholder="Celular"
                          options={{
                            format: '(99) 99999-9999'
                          }}
                          type={'cel-phone'}
                          value={this.props.celular}
                          maxLength={15}
                          onChangeText={texto => this.props.modificaCelularPai(texto)}
                        />
                    </Item>
                    <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="create"/>
                        <Input
                        style={styles.FormInput}
                          placeholder='CPF'
                          disabled
                          value={this.props.cpf}
                        autoCapitalize="none"
                        /*onChangeText={texto => this.props.modificaCPFPai(texto)}*/

                        />
                    </Item>
                    <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="lock"/>
                        <Input
                        style={styles.FormInput}
                          placeholder='Senha'
                          value={this.props.senha}
                          secureTextEntry={this.state.secure}
                          autoCapitalize="none"
                          onChangeText={texto => this.props.modificaSenhaPai(texto)}
                        />
                        <TouchableOpacity onPress={() => this.verSenha()}>
                        <Icon active style={{fontSize:25}} name={this.state.iconSecure}/>
                        </TouchableOpacity>
                    </Item>

                    <View style={{marginTop:10}}>
                        <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#000',marginTop:10,marginBottom:20,fontWeight:"bold"}}>Dados de Endereço</Text>
                      <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="create"/>
                        {/*<Input
                          placeholder='Cep'
                          value={this.props.cep}
                          onChangeText={texto => this.props.modificaCepPai(texto)}
                        />*/}
                          <TextInputMask
                              style={styles.FormInput}
                              placeholder="Cep"
                              options={{
                                  format: '99999-999'
                              }}
                              type={'zip-code'}
                              value={this.props.cep}
                              maxLength={9}
                              onChangeText={texto => this.props.modificaCepPai(texto)}
                          />
                      </Item>
                      <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="create"/>
                        <Input
                        style={styles.FormInput}
                          placeholder='UF'
                          value={this.props.uf}
                          onChangeText={texto => this.props.modificaUfPai(texto)}
                        />
                      </Item>
                      <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="create"/>
                        <Input
                        style={styles.FormInput}
                          placeholder='Cidade'
                          value={this.props.cidade}
                          onChangeText={texto => this.props.modificaCidadePai(texto)}
                        />
                      </Item>
                      <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="create"/>
                        <Input
                        style={styles.FormInput}
                          placeholder='Bairro'
                          value={this.props.bairro}
                          onChangeText={texto => this.props.modificaBairroPai(texto)}
                        />
                      </Item>
                      <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="create"/>
                        <Input
                        style={styles.FormInput}
                          placeholder='Logradouro'
                          value={this.props.logradouro}
                          onChangeText={texto => this.props.modificaLogradouroPai(texto)}
                        />
                      </Item>
                      <Item last style={styles.FormItem}>
                        <Icon active style={styles.FormIcon} name="create"/>
                        <Input
                            style={styles.FormInput}
                            placeholder='Número'
                            value={this.props.numero}
                            onChangeText={texto => this.props.modificaNumeroPai(texto)}
                        />
                      </Item>
                    </View>
                </View>
                <View style={{marginTop:10,marginBottom:30}}>
                    {this.renderBtnAtualiza()}
                </View>
                {/*<View style={{justifyContent:'center',alignItems:'center',marginVertical:12}}>
                  <Image
                    style={{width: 50, height: 55}}
                    source={require('../../imgs/game.png')}
                  />
                </View>*/}
                {/*<Card>
                  <TouchableOpacity onPress={() => Actions.plano()}>
                    <CardItem style={{backgroundColor:'#43A047',marginBottom:5}}>
                      <Icon active style={{color:'white',fontSize:40}} name="card" />
                      <Text style={{color:'#fff',fontSize:20,marginHorizontal:10}}>Meu Plano</Text>
                      <Right>
                        <Icon name="arrow-forward" />
                      </Right>
                    </CardItem>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Actions.filhos()}>
                    <CardItem style={{backgroundColor:'#0288D1',marginTop:5}}>
                      <Icon active style={{color:'white',fontSize:40}} name="contacts" />
                      <Text style={{color:'#fff',fontSize:20,marginHorizontal:10}}>Adicionar Filho</Text>
                      <Right>
                        <Icon name="arrow-forward" />
                      </Right>
                    </CardItem>
                  </TouchableOpacity>
                </Card>*/}
            </Content>
            </KeyboardAwareScrollView>
        </ImageBackground>
        <Rodape atual="configuracoes" />
    </Container>
    )
  }
}

const mapStateToProps = state => ({
  nome:state.AppReducer.nomePaiAtual,
  email:state.AppReducer.emailPaiAtual,
  celular:state.AppReducer.celularPaiAtual,
  cpf:state.AppReducer.cpfPaiAtual,
  senha:state.AppReducer.senhaPaiAtual,
  id:state.AppReducer.idPaiAtual,
  cep:state.AppReducer.cepPaiAtual,
  uf:state.AppReducer.ufPaiAtual,
  cidade:state.AppReducer.cidadePaiAtual,
  bairro:state.AppReducer.bairroPaiAtual,
  logradouro:state.AppReducer.logradouroPaiAtual,
  numero:state.AppReducer.numeroPaiAtual,
  loading_atualiza:state.AppReducer.loading_atualiza
});

export default connect(
  mapStateToProps,{
    atualizaSistemaDadosPai,
    modificaNomePai,
    modificaSenhaPai,
    modificaCelularPai,
    modificaEmailPai,
    modificaCepPai,
    modificaUfPai,
    modificaCidadePai,
    modificaBairroPai,
    modificaLogradouroPai,
    modificaNumeroPai,
    modificaCPFPai
  })(ConfiguracoesPai);

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
