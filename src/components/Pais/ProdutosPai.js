import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Button, Icon, Form, Item, Input, Card, CardItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import { Alert } from 'react-native';

import { 
} from '../../actions/AppActions';
import Rodape from './Rodape';
import {URL_ADMIN_FUTURONERD, URL_CONSULTA_CEP} from '../../config/Constants';

class ProdutosPai extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      produto_cep: this.props.endereco_envio_produto_cep,
      produto_uf: this.props.endereco_envio_produto_uf,
      produto_cidade: this.props.endereco_envio_produto_cidade,
      produto_bairro: this.props.endereco_envio_produto_bairro,
      produto_logradouro: this.props.endereco_envio_produto_logradouro,
      produto_numero: this.props.endereco_envio_produto_numero,
      consulta_cep: this.props.cepPaiAtual
    }
  }

  componentWillMount(){
    this.setState({
      produto_cep: this.props.cepPaiAtual,
      produto_uf: this.props.ufPaiAtual,
      produto_cidade: this.props.cidadePaiAtual,
      produto_bairro: this.props.bairroPaiAtual,
      produto_logradouro: this.props.logradouroPaiAtual,
      produto_numero: this.props.numeroPaiAtual,
      consulta_cep: this.props.cepPaiAtual
    })
  }

  componentWillReceiveProps(){
    this.setState({
      produto_cep: this.props.cepPaiAtual,
      produto_uf: this.props.ufPaiAtual,
      produto_cidade: this.props.cidadePaiAtual,
      produto_bairro: this.props.bairroPaiAtual,
      produto_logradouro: this.props.logradouroPaiAtual,
      produto_numero: this.props.numeroPaiAtual,
      consulta_cep: this.props.cepPaiAtual
    })
  }

  _atualizaDadosEnderecoNaTela(res){
    this.setState({
      produto_cep: res.cep,
      produto_uf: res.uf,
      produto_cidade: res.localidade,
      produto_bairro: res.bairro,
      produto_logradouro: res.logradouro,
      //produto_numero: res.numero,
    })
  }

  calcularFrete() {
    
  }


  endereco() {
    //alert(URL_CONSULTA_CEP + this.state.consulta_cep + '/json/unicode/')
    return fetch(URL_CONSULTA_CEP + this.state.consulta_cep + '/json/unicode/')
      .then((res) => res.json())
      .then((res) => {
        console.log(JSON.stringify(res));
       // alert(res.logradouro+' - '+res.localidade);
       //alert(res.toString())
        if(res.erro){
          Alert.alert(
            'Consulta endereço',
            'Endereço não encontrado para o CEP '+ this.state.cep + '.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        }else{
          Alert.alert(
            'Consulta endereço',
            'Endereço encontrado! \n Cep: ' + res.cep + 
                                ' \n Logradouro: '+ res.logradouro + 
                                ' \n Complemento: '+ res.complemento + 
                                ' \n Bairro: '+ res.bairro + 
                                ' \n Localidade: '+ res.localidade + 
                                ' \n UF: '+ res.uf  
                                ,
            [
              {text: 'Utilizar endereço', onPress: () => {
                this. _atualizaDadosEnderecoNaTela(res)
                console.log('Ask me later pressed')
              }},
              {text: 'Não utilizar endereço', onPress: () => console.log('Ask me later pressed')},
              // {
              //   text: 'Cancel',
              //   onPress: () => console.log('Cancel Pressed'),
              //   style: 'cancel',
              // },
            ],
            {cancelable: false},
          );
        }

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render(){
    return(
	<Container style={{backgroundColor:'#fff'}}>
        <Header style={{marginTop:24}}>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text>Produtos</Text>
          </Body>
          <Right/>
        </Header>	
        <Content padder>
            <View>
            <View style={{padding:10,flex:1}}>
                  <Text style={{fontWeight:'bold',fontSize:20, textAlign:'center'}}>
                    <Icon name="trophy" />
                    <Text>Finalizar compra</Text>
                  </Text>
                </View>
                <View style={{padding:10,flex:1}}>
                  <Text style={{fontWeight:'bold',fontSize:15, textAlign:'left'}}>
                    <Text>Produto</Text>
                  </Text>
                </View>
            <TouchableOpacity onPress={() => alert('a')} >
              <View style={{borderWidth:1.5,flexDirection:'row',borderRadius:10,borderColor:'#ccc',overflow:'hidden',marginVertical:10}}>
                <Image style={{width:100,height:110}} source={{uri: URL_ADMIN_FUTURONERD + '/uploads/1533130751.jpg'}} />
                <View style={{padding:10,flex:1}}>
                  <Text style={{fontWeight:'bold',fontSize:17}}>Placa Mario</Text>
                  <Text>Placa decorativa</Text>
                  <Text style={{fontWeight:'bold',fontSize:15}}>
                    <Icon name="trophy" />
                    <Text>300</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            </View>

            <View style={{padding:10,flex:1}}>
                  <Text style={{fontWeight:'bold',fontSize:15, textAlign:'left'}}>
                    <Text>Cálculo de Frete e Envio</Text>
                  </Text>
                </View>
            <View>
            <TextInput 
              placeholder="CEP"
              value={this.state.consulta_cep}
              onChangeText={consulta_cep => this.setState({consulta_cep}) } // this.setState({cep})
              style={{padding:10,borderWidth:1,margin:10, textAlign:'center'}}
            />
            <Button block onPress={() => this.endereco()}><Text style={{fontSize:20,color:'white'}}>Consultar CEP</Text></Button>
           



            <View style={{marginTop:10}}>
              <Text>
                Dados de Endereço
              </Text>
              
              <Item last>
                <Icon active name="create"/>
                <Input 
                  placeholder='Cep' 
                  value={this.state.produto_cep}
                  // onChangeText={texto => this.props.modificaCepPai(texto)}
                />
              </Item> 
              <Item last>
                <Icon active name="create"/>
                <Input 
                  placeholder='Logradouro' 
                  value={this.state.produto_logradouro}
                  // onChangeText={texto => this.props.modificaLogradouroPai(texto)}
                />
              </Item>
              <Item last>
                <Icon active name="create"/>
                <Input
                    placeholder='Número'
                    value={this.state.produto_numero}
                    // onChangeText={texto => this.props.modificaNumeroPai(texto)}
                />
              </Item>
              <Item last>
                <Icon active name="create"/>
                <Input 
                  placeholder='Bairro' 
                  value={this.state.produto_bairro}
                  // onChangeText={texto => this.props.modificaBairroPai(texto)}
                />
              </Item>
              
              <Item last>
                <Icon active name="create"/>
                <Input 
                  placeholder='Cidade' 
                  value={this.state.produto_cidade}
                  // onChangeText={texto => this.props.modificaCidadePai(texto)}
                />
              </Item>
              <Item last>
                <Icon active name="create"/>
                <Input 
                  placeholder='UF' 
                  value={this.state.produto_uf}
                  // onChangeText={texto => this.props.modificaUfPai(texto)}
                />
              </Item>
              
            </View>

            <Button block onPress={() => this.calcularFrete()}><Text style={{fontSize:20,color:'white'}}>Calcular Frete</Text></Button>



           
            <View style={{marginTop:30}}>
              <Text style={{fontWeight:'bold',fontSize:15, textAlign:'left', marginBottom:30}}>
                <Text>Dados de pagamento</Text>
              </Text>
            </View>           
           
           
           
              <View style={{marginTop:10}}>
              <Button block onPress={() => Alert.alert('erro',"items product: placa decorativa,quantity: 1, detail: ... , price: 300cr, customer: ownId: 1,fullname: Anderson salazar,email: anderson.s@goowords.com.br,birthDate: 2000-06-21,taxDocument: {type: CPF,number: 47542895877",
                      [
                        {text: 'OK', onPress: () => null},
                      ],
                      { cancelable: false })}><Text style={{fontSize:20,color:'white'}}>Finalizar compra</Text></Button>
              </View>
            </View>
        </Content>
        <Rodape atual="estatisticas" />
    </Container>
    )
  }
}

const mapStateToProps = state => ({
  id_pai:state.AppReducer.idPaiAtual,
  filhos:state.AppReducer.filhos,
  cepPaiAtual: state.AppReducer.cepPaiAtual,
  ufPaiAtual: state.AppReducer.ufPaiAtual,
  cidadePaiAtual: state.AppReducer.cidadePaiAtual,
  bairroPaiAtual: state.AppReducer.bairroPaiAtual,
  logradouroPaiAtual: state.AppReducer.logradouroPaiAtual,
  numeroPaiAtual: state.AppReducer.numeroPaiAtual,

  endereco_envio_produto_cep: state.AppReducer.endereco_envio_produto_cep,
  endereco_envio_produto_uf: state.AppReducer.endereco_envio_produto_uf,
  endereco_envio_produto_cidade: state.AppReducer.endereco_envio_produto_cidade,
  endereco_envio_produto_bairro: state.AppReducer.endereco_envio_produto_bairro,
  endereco_envio_produto_logradouro: state.AppReducer.endereco_envio_produto_logradouro,
  endereco_envio_produto_numero: state.AppReducer.endereco_envio_produto_numero
});

export default connect(
  mapStateToProps,{
  })(ProdutosPai);

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
  }
});