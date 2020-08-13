import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Platform, Image
} from 'react-native';
import {
  Container,
  Content,
  Icon,
  Button,
  Item
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import { TextInputMask } from 'react-native-masked-text';
import { connect } from 'react-redux';
import {Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  modificaNomePai,
  modificaCelularPai,
  modificaCPFPai,
  modificaEmailPai,
  modificaSenhaPai,
  cadastrarPai,
  recuperaSenhaPai,
  recuperaSenhaFilho
} from '../actions/AutenticacaoActions';


class RecuperarSenha extends React.Component {

  componentWillMount() {
    // alert(this.props.modulo);
  }

  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }

  _recuperaSenha() {
    // # MXTera -
    if (this.state.email.trim().indexOf('@') == -1 || this.state.email.trim().indexOf('.') == -1) {
        Alert.alert('Atenção!', 'Digite um Login/E-mail válido!', [{text: 'OK', onPress: () => null},], { cancelable: false });
        return false;
    }
    if(this.props.modulo === 'pai'){
      this.props.recuperaSenhaPai(this.state.email, (res)=>{
        console.log("#### - Pai");
        console.log(res[0]);
        if(res[0]){
          Alert.alert('Atenção!', 'Email de recupeação de senha enviado com sucesso!', [{text: 'OK', onPress: () => Actions.pop()},], {cancelable: false},);
        } else {
          Alert.alert('Atenção!', 'Por favor veirifique o Login / E-mail informado e tente novamente!', [{text: 'OK', onPress: () => console.log('Erro ao recuperar senha')},], {cancelable: false},);
        }
      });
    }else{
      this.props.recuperaSenhaFilho(this.state.email, (res)=>{
        console.log("#### - Filho");
        console.log(res[0]);
        if(res[0]){
          Alert.alert('Atenção!', 'Email de recupeação de senha enviado com sucesso!', [{text: 'OK', onPress: () => Actions.pop()},], {cancelable: false},);
        } else {
          Alert.alert('Atenção!', 'Por favor veirifique o Login / E-mail informado e tente novamente!', [{text: 'OK', onPress: () => console.log('Erro ao recuperar senha')},], {cancelable: false},);
        }
      });
    }
    // - #
  }

  renderBtnEnviar() {
      return (
        <Button full large style={styles.btnEntrar} onPress={() => this._recuperaSenha()}>
          <Text style={styles.txtBotao}>Enviar</Text>
        </Button>
      )
  }

  render(){
      return(
      <Container>

        <ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../imgs/background-t2.jpg')} >
        <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        keyboardOpeningTime={0}
        extraHeight={Platform.select({android: 80})}
        >
          <Content>
            <Animatable.View animation="zoomIn" iterationCount={1}>
                <View style={styles.containerView}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={styles.btnBack}>
                        <Icon name="md-arrow-back"/>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:20,marginBottom:20}}>
                    <View style={styles.logo}>
                      <Image source={require('../imgs/logo.jpg')} />
                    </View>
                    <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#ffffff',marginTop:30 }}><Text style={{fontWeight: 'bold'}}>Recuperar a Senha!</Text>{"\n"}Informe o seu Login ou E-mail abaixo.</Text>
                </View>
                <View style={styles.form}>
                  <TextInput
                      style={styles.inputs}
                      placeholder="Login / E-mail"
                      underlineColorAndroid="transparent"
                      onChangeText={texto => this.setState({email:texto})}
                      value={this.state.email}
                      placeholderTextColor="#b2b2b2"
                  />
                </View>
            </Animatable.View>
          </Content>
          </KeyboardAwareScrollView>

          <Animatable.View animation="slideInUp" iterationCount={1}>
            {this.renderBtnEnviar()}
          </Animatable.View>
        </ImageBackground>
      </Container>
      )
   }
}

const mapStateToProps = state => ({
  //email:state.AutenticacaoReducer.emailPai
});

export default connect(mapStateToProps, {
  recuperaSenhaPai,
  recuperaSenhaFilho
})(RecuperarSenha);

const styles = StyleSheet.create({
	containerView: {
		paddingTop:30,
		paddingLeft:25
  },
  btnBack: {
      backgroundColor:'rgba(255,255,255, 0.9)',
      width:55,
      padding:10,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:50
  },
  btnCadastrese: {
    backgroundColor:'#00695C'
  },
  btnEntrar: {
    backgroundColor:'#000000',
    margin:15
  },
  logo: {
    backgroundColor:'#ffffff',
    alignItems: 'center',
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth: 4,
    borderBottomColor: '#000000',
    borderTopWidth: 8,
    borderTopColor: '#b7eaff'
  },
  txtBotao: {
    color:'#ffffff',
    fontSize:16
  },
  inputs: {
    padding:10,
    paddingLeft:15,
    backgroundColor: "#ffffff",
    color: "#000",
    fontSize: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#000000',
    marginTop:20
  },
  form: {
    paddingTop:0,
    paddingBottom:30,
    paddingLeft:55,
    paddingRight:55
  },
  Iteminputs: {
    padding:15,
    margin:10,
    borderBottomWidth: 0,
    backgroundColor: '#f5f5f5f5',
    borderRadius:40
  }
});
