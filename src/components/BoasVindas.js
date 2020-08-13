import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  Image,
  ImageBackground 
} from 'react-native';
import { 
  Container, 
  Left, 
  Title, 
  Right, 
  Body, 
  Icon, 
  Footer, 
  Form, 
  Header, 
  Content, 
  Button, 
  Item, 
  Label, 
  Input } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';

class BoasVindas extends React.Component {

  render(){
      return(
      <Container>

        <ImageBackground style={{flex:1}} blurRadius={5} source={require('../imgs/background.jpg')} >
          <Content padder>
            <Animatable.View animation="fadeIn" iterationCount={1}>
            <View style={{marginTop:80,marginBottom:80,alignItems:'center'}}>
              <View style={styles.bemVindo}>
                <Text style={styles.titBemVindo}>{('Bem Vindo!').toUpperCase()}</Text>
              </View>
              <View style={styles.bemVindoTxt}>
                <Text style={styles.txtBemVindo}>
                ipsum a pretium fermentum, magna leo pellentesque dolor, sodales blandit ex elit a lacus. Duis ut sodales risus, efficitur maximus lacus.{"\n\n"}
                Cras egestas et sem eget luctus. Aenean at elementum felis, a ullamcorper diam. Nullam pellentesque volutpat urna, id consectetur ipsum egestas in. Praesent eleifend, dui egestas finibus blandit, ex erat bibendum nisi, id consectetur libero dui sed turpis.
                {"\n\n"}
                Cras egestas et sem eget luctus. Aenean at elementum felis, a ullamcorper diam. Nullam pellentesque volutpat urna, id consectetur ipsum egestas in. Praesent eleifend, dui egestas finibus blandit, ex erat bibendum nisi, id consectetur libero dui sed turpis.
                {"\n\n"}
                Cras egestas et sem eget luctus. Aenean at elementum felis, a ullamcorper diam. Nullam pellentesque volutpat urna, id consectetur ipsum egestas in. Praesent eleifend, dui egestas finibus blandit, ex erat bibendum nisi, id consectetur libero dui sed turpis.
                {"\n\n"}
                Cras egestas et sem eget luctus. Aenean at elementum felis, a ullamcorper diam. Nullam pellentesque volutpat urna, id consectetur ipsum egestas in. Praesent eleifend, dui egestas finibus blandit, ex erat bibendum nisi, id consectetur libero dui sed turpis.</Text>
              </View>
            </View>
            </Animatable.View>
          </Content>

          <Animatable.View animation="fadeIn" iterationCount={1}>
            <Button full large style={styles.btnCadastrese}>
              <Text style={styles.txtBotao}> Efetuar login </Text>
            </Button>
          </Animatable.View>
        </ImageBackground>
      </Container>
      )
   }
}

export default BoasVindas;

const styles = StyleSheet.create({
  btnCadastrese: {
    backgroundColor:'#00695C'
  },
  txtBotao: {
    color:'white',
    fontSize:22
  },
  bemVindoTxt: {
    marginTop:20,
    backgroundColor:'rgba(255,255,255, 0.9)',
    padding:20,
    borderRadius: 5
  },
  titBemVindo: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  bemVindo: {
    backgroundColor:'rgba(255,255,255, 0.9)',
    padding:20,
    borderRadius: 100
  }
});