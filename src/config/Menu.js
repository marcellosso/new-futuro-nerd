import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Image,
    SafeAreaView, StatusBar, Platform
} from 'react-native';
import { 
  Left, 
  Right, 
  Icon,
  Body,
  Header,
  Button
} from 'native-base';
import { Actions } from 'react-native-router-flux';

class Menu extends React.Component {

  renderMenu() {
    if(this.props.tipo == 'configuracoes'){
      return(
        <Header style={styles.header2}>
          
          <Left>
            <TouchableOpacity style={{flexDirection:"row",alignItems:'center'}} onPress={() => Actions.pop()}>
              <Icon style={{fontSize:18}} ios='ios-arrow-back' android="md-arrow-back" />
              <Text style={{paddingLeft:5,fontSize:16}}>Voltar</Text>
            </TouchableOpacity>
          </Left>

            {/*<Body style={{alignItems:'center'}}>
            <Text style={{fontSize:16}}>Ajustes</Text>
          </Body>*/}
            <Right>
                <Image source={require('../imgs/ico-logo.jpg')} style={{maxHeight: 40}} resizeMode="contain" />
            </Right>
    
            {/*<Right style={{alignItems:"center"}}><Text style={styles.headerTextDesc}>Ajustes</Text></Right>*/}
        </Header> 
      );
    } else if(this.props.tipo == 'voltar'){
      return (
          /*<Header style={styles.header}>
              <Left>
                  <TouchableOpacity style={{flexDirection:"row",alignItems:'center'}} onPress={() => Actions.pop()}>
                      <Icon stlye={{fontSize:18}} ios='ios-arrow-back' android="md-arrow-back" />
                      <Text style={{paddingLeft:5,fontSize:16}}>Voltar</Text>
                  </TouchableOpacity>
              </Left>
              <Right style={{flexDirection:"row",alignItems:'center'}}>
                  <View style={{flexDirection:"row",alignItems:'center'}}>
                      <Icon style={{fontSize:25}} ios='ios-trophy' android='md-trophy'/>
                      <Text style={{paddingLeft:2.5,paddingRight:10,fontSize:16}}>{this.props.pts}</Text>
                  </View>
                  <Button transparent onPress={() => Actions.configuracoes()}>
                      <Icon style={{color:'#000',fontSize:25}} ios='md-settings' android="md-more" />
                  </Button>
              </Right>
          </Header>*/
        <Header style={styles.header}>
            <Left style={{flexDirection:"row",alignItems:'center'}}>
                {/*<Icon stlye={{fontSize:25}} ios='ios-contact' android="md-contact" />*/}
                {/*<Image source={require('../imgs/ico-logo.jpg')} style={{maxHeight: 40}} resizeMode="contain" />
                <Text style={styles.headerTextEntrada}>{this.props.nome}</Text>*/}
                <TouchableOpacity style={{flexDirection:"row",alignItems:'center'}} onPress={() => Actions.pop()}>
                    <Icon style={{fontSize:18}} ios='ios-arrow-back' android="md-arrow-back" />
                    <Text style={{paddingLeft:5,fontSize:16}}>Voltar</Text>
                </TouchableOpacity>
            </Left>

            <Right style={{flexDirection:"row",alignItems:'center'}}>
                <View style={{flexDirection:"row",alignItems:'center'}}>
                    <Icon style={styles.headerIconPontos} ios='ios-trophy' android='md-trophy'/>
                    <Text style={styles.headerPontos}>{this.props.pts}</Text>
                </View>
                <Button transparent onPress={() => Actions.configuracoes()}>
                    <Icon style={styles.headerConfig} ios='md-settings' android="md-more" />
                </Button>
            </Right>
        </Header>
      );
    } else if(this.props.tipo == 'jogo') {
      return (
        <Header style={styles.header}>

          {/*<Left>*/}
          <View style={{flexDirection:"row",alignItems:'center'}}>
            <Text style={{fontSize:18}}>{this.props.materia}</Text>
          </View>
          {/*</Left>*/}
    
          <Right style={{flexDirection:"row",alignItems:'center'}}>
            <Button transparent onPress={() => Actions.principal({type:'reset'})}>
              <Icon style={{color:'#F44336',fontSize:32}} ios='ios-close-circle' android="md-close-circle" />
            </Button>
          </Right>

        </Header>
      );
    } else if(this.props.tipo == 'paiPrincipal') {
      return (
        <Header style={styles.header}>
            <Body style={{flexDirection:"row",alignItems:'center'}}>
                <Image source={require('../imgs/ico-logo.jpg')} style={{maxHeight: 40}} resizeMode="contain" />
                <Text style={styles.headerTextEntrada}>{this.props.saudacao}, <Text style={{fontWeight:"bold"}}>{this.props.nome}</Text>!</Text>
            </Body>
        </Header>
      );
    } else if(this.props.tipo == 'paiVoltar'){
        return (
            <Header style={styles.header2}>

                <Left>
                    <TouchableOpacity style={{flexDirection:"row",alignItems:'center'}} onPress={() => Actions.pop()}>
                        <Icon style={{fontSize:18}} ios='ios-arrow-back' android="md-arrow-back" />
                        <Text style={{paddingLeft:5,fontSize:16}}>Voltar</Text>
                    </TouchableOpacity>
                </Left>

                <Right>
                    <Image source={require('../imgs/ico-logo.jpg')} style={{maxHeight: 40}} resizeMode="contain" />
                </Right>

            </Header>
        );
    } else {
      return (
        <Header style={styles.header}>
          
          {/*<Left style={{flexDirection:"row",alignItems:'center',backgroundColor:"#c30"}}>*/}
          <View style={{flexDirection:"row",alignItems:'center'}}>
              {/*<Icon stlye={{fontSize:25}} ios='ios-contact' android="md-contact" />*/}
              <Image source={require('../imgs/ico-logo.jpg')} style={{maxHeight: 40}} resizeMode="contain" />
              <Text style={styles.headerTextEntrada}>{this.props.nome}</Text>
          </View>
          {/*</Left>*/}

          <Right style={{flexDirection:"row",alignItems:'center'}}>
            <View style={{flexDirection:"row",alignItems:'center'}}>
              <Icon style={styles.headerIconPontos} ios='ios-trophy' android='md-trophy'/>
              <Text style={styles.headerPontos}>{this.props.pts}</Text>
            </View>
            <Button transparent onPress={() => Actions.configuracoes()}>
              <Icon style={styles.headerConfig} ios='md-settings' android="md-more" />
            </Button>
          </Right>

        </Header> 
      );
    }
  }
    
  render() {
    return (
      <View style={styles.STB}>
      {/*<View style={{marginTop:24}}>*/}
        {this.renderMenu()}
      </View>
    )
  }
}

export default Menu;

const styles = StyleSheet.create({
    STB: { marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0 },
    header: {
        backgroundColor:"#ffffff",
        borderBottomWidth: 4,
        borderBottomColor: "#b7eaff",
        margin: 0,
        padding:0
    },
    header2: {
        backgroundColor:"#ffffff"
    },
    headerTextDesc:{
        fontSize:16,
        fontWeight: "bold"
    },
    headerTextEntrada: {
        paddingLeft:5,
        fontSize:16,
        marginLeft:10
    },
    headerIconPontos: {
        fontSize:25,
        color:'#13a7df'
    },
    headerPontos: {
        paddingLeft:10,
        paddingRight:10,
        fontSize:16,
        color:'#13a7df'
    },
    headerConfig: {
        color:'#000000',
        fontSize:25
    }
})