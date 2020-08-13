import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { 
  Container,  
  Icon, 
  Content, 
  Button} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
class Pais extends React.Component {

  render(){
      return(
      <Container style={styles.container}>

        <ImageBackground style={{flex:1}} blurRadius={5} source={require('../../imgs/background.jpg')} >
          <Content>
            <Animatable.View animation="slideInDown" iterationCount={1}>
            <View style={styles.containerView}>
              <TouchableOpacity onPress={() => Actions.pop()} style={styles.btnBack}>
                <Icon name="md-arrow-back"/>
              </TouchableOpacity>
            </View>
            <View style={styles.containerView}>
              <View style={styles.viewWhite}>
                <Text>lorem ipsum</Text>
                <Text>
                  <Icon name="md-checkmark"/>
                  teste
                </Text>
                <Text>
                  <Icon name="md-checkmark"/>
                  teste
                </Text>
                <Text>
                  <Icon name="md-checkmark"/>
                  teste
                </Text>
              </View>
            </View>
            </Animatable.View>
          </Content>

          <Animatable.View animation="slideInUp" style={{justifyContent:'space-between',flexDirection:'row'}} iterationCount={1}>
            <Button full large style={{width:'50%',backgroundColor:'#00796B'}} onPress={() => Actions.loginpai()}>
              <Text style={styles.txtBotao}> Entrar </Text>
            </Button>
            <Button full large style={{width:'50%',backgroundColor:'#00695C'}} onPress={() => Actions.cadastropai()}>
              <Text style={styles.txtBotao}> Cadastre-se </Text>
            </Button>
          </Animatable.View>

          {/* <Animatable.View animation="slideInUp" iterationCount={1}>
            <Button full large style={styles.btnCadastrese}>
              <Text style={styles.txtBotao}> Cadastre-se </Text>
            </Button>
          </Animatable.View> */}
        </ImageBackground>
      </Container>
      )
   }
}

export default Pais;

const styles = StyleSheet.create({
  btnBack: {
    backgroundColor:'rgba(255,255,255, 0.9)',
    width:55,
    padding:10,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50
  },
  containerView: {
    padding:25
  },
  container: {
    backgroundColor:"#283b4c"
  },
  viewWhite: {
    padding:20,
    backgroundColor:'rgba(255,255,255, 0.9)',
    borderRadius:5,
  },
  txtBotao: {
    color:'white',
    fontSize: 22
  }
});