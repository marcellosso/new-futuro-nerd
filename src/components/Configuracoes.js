import React from 'react';
import {View, Text, ActivityIndicator, ImageBackground, StyleSheet, Image} from 'react-native';
import { Container, Content, List, ListItem, Button, Icon, Item, Input, Form } from 'native-base';

import Menu from '../config/Menu';
import { connect } from 'react-redux';
import { modificaApelido, filhoAtualizaDados } from '../actions/AppFilhoActions';
import {Actions} from "react-native-router-flux";
import * as Animatable from "react-native-animatable";

class Configuracoes extends React.Component{

	_atualizaDados(){
		const { nome, id } = this.props;

		this.props.filhoAtualizaDados({
			nome,
			id
		})
	}

	renderBtnAlterar(){
		if(this.props.loading_atualiza == true){
			return (
				<Button full large style={styles.btnAtualizar}>
					<ActivityIndicator size="small"/>
				</Button>
			);
		} else {
			return (
				<Button full large style={styles.btnAtualizar} onPress={() => this._atualizaDados()}>
					<Text style={styles.txtBotao}>Atualizar</Text>
				</Button>
			);
		}
	}

	render(){
		return(
			<Container>
				<ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../imgs/background-t2.jpg')} >
					<Menu tipo="configuracoes" pts={this.props.pts}/>
					<Content>
						<List padder>
							<ListItem itemDivider style={{backgroundColor:"#b7eaff",justifyContent:"center",paddingTop:2,paddingBottom:6}}>
								<Text style={{fontSize:15,color:'#338fb5'}}>Meus Dados</Text>
							</ListItem>
						</List>
						<View style={{marginTop:20,marginBottom:20}}>
							<Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#ffffff' }}>Altere os <Text style={{fontWeight: 'bold'}}>dados</Text> abaixo.</Text>
						</View>
						<View style={{paddingLeft:55,paddingRight:55}}>
							<Item style={{ backgroundColor: "#ffffff",padding:0,margin:0,borderColor:"#000000",borderLeftWidth: 4,marginTop:0}}>
								<Icon active style={{marginLeft:15,color:"#000000"}} ios='ios-contact' android='md-contact'/>
								<Input
									style={{padding:0,margin:0}}
									placeholder='Nome'
									value={this.props.nome}
									onChangeText={texto => this.props.modificaApelido(texto)}
									placeholderTextColor="#b2b2b2"
								/>
							</Item>
						</View>
					</Content>

					<Animatable.View animation="slideInUp" iterationCount={1}>
						{this.renderBtnAlterar()}
					</Animatable.View>
				</ImageBackground>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	nome:state.AppFilhoReducer.nomeFilho,
	loading_atualiza:state.AppFilhoReducer.loading_atualiza,
	id:state.AppFilhoReducer.idFilho
})

export default connect(mapStateToProps,{modificaApelido,filhoAtualizaDados})(Configuracoes);

const styles = StyleSheet.create({
	btnAtualizar:{
		backgroundColor:"#000000",
		margin:15,
		marginTop:30
	},
	txtBotao: {
		color:'#ffffff',
		fontSize:16
	}
});