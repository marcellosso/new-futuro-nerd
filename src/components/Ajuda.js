import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {Container, Content, Icon, List, ListItem} from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';
// import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

import {listaDadosAjuda} from  '../actions/AppActions';
import Menu from '../config/Menu';

class Ajuda extends React.Component{

  componentWillMount(){
    this.props.listaDadosAjuda();
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
                <ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../imgs/background-t2.jpg')} >
                    <Menu tipo="voltar" nome={this.props.nome} pts={this.props.pts}/>
                    <Content>
                        <List padder>
                            <ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
                                <Icon style={{fontSize:18,color:'#338fb5'}} ios='ios-help-buoy' android='md-help' />
                                <Text style={{fontSize:15,color:'#338fb5'}}> Dúvidas Frequentes</Text>
                            </ListItem>
                        </List>

                        <View>
                            <Accordion
                              sections={this.props.ajudas.filter((a)=>{return a.ajuda_do_pai == "N"})}
                              renderSectionTitle={this._renderSectionTitle}
                              renderHeader={this._renderHeader}
                              renderContent={this._renderContent}
                            />
                        </View>

                        <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#ffffff',marginTop:20, marginBottom:20}}><Text style={{fontWeight: 'bold'}}>Ainda tem dúvidas?</Text>{"\n"}Envie um email para duvidas@futuronerd.com.br</Text>
                    </Content>
                </ImageBackground>
			</Container>
    )
  }
}

const mapStateToProps = state => ({
  pts:state.AppFilhoReducer.pts, 
  ajudas:state.AppReducer.ajudas
});

export default connect(mapStateToProps,{listaDadosAjuda})(Ajuda);

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


