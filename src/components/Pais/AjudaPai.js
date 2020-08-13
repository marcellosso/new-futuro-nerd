import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {Container, Content, Header, Left, Right, Body, Button, Icon, ListItem, List} from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';
// import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';

import {listaDadosAjudaPai} from  '../../actions/AppFilhoActions';
import Menu from "../../config/Menu";

// const SECTIONS = [
//   {
//     title: 'Dúvida 1!',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nulla felis, faucibus eu ante id, auctor sagittis mi. Sed a vestibulum nisl, eget rhoncus odio.'
//   },
//   {
//     title: 'Dúvida 2',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nulla felis, faucibus eu ante id, auctor sagittis mi. Sed a vestibulum nisl, eget rhoncus odio.'
//   },
//   {
//     title: 'Dúvida abcdef 3',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nulla felis, faucibus eu ante id, auctor sagittis mi. Sed a vestibulum nisl, eget rhoncus odio.'
//   }
// ];

class AjudaPai extends React.Component{

  componentWillMount(){
    this.props.listaDadosAjudaPai();
  }
  
  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Icon style={{fontSize:16,color:"#000000"}} ios='ios-arrow-dropright-circle' android="md-arrow-dropright-circle" />
        <Text style={styles.headerText}>{section.titulo}</Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text>{section.descricao}</Text>
      </View>
    );
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
              <Text>Ajuda</Text>
            </Body>
            <Right/>
          </Header>*/}
          <Content>
            {/*<View style={{padding:10}}>
              <Text style={{fontSize:60}}>Dúvidas</Text>
              <Text style={{fontSize:65,fontWeight:'bold'}}>Frequentes</Text>
            </View>*/}
            <List padder>
              <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-help-buoy' android='md-help-buoy' />
                <Text style={{fontSize:15,color:'#338fb5'}}> Dúvidas Frequentes</Text>
              </ListItem>
            </List>
            <View>
              <Accordion
                sections={this.props.ajudas.filter((a)=>{return a.ajuda_do_pai == "S"})}
                renderSectionTitle={this._renderSectionTitle}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
              />
            </View>
            <View style={{marginTop:20,marginBottom:20}}>
              <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#000',marginTop:20, marginBottom:20}}><Text style={{fontWeight: 'bold'}}>Ainda tem dúvidas?</Text>{"\n"}Envie um email para duvidas@futuronerd.com.br</Text>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    )
  }
}


const mapStateToProps = state => ({
  ajudas:state.AppFilhoReducer.ajudas
});

export default connect(mapStateToProps,{listaDadosAjudaPai})(AjudaPai);



// export default AjudaPai;

const styles = StyleSheet.create({
  headerText: {
    fontSize:15,
    marginLeft:10
  },
  header:{
    flexDirection:"row",
    alignItems:'center',
    backgroundColor:'#f5f5f5',
    padding:10
  },
  content: {
    borderTopColor:"#afafaf",
    borderTopWidth:4,
    borderBottomColor:"#afafaf",
    borderBottomWidth:4,
    backgroundColor:"#cccccc",
    padding:10
  }
});