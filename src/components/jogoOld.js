import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Card, CardItem, Text, Content, Body, Button, Icon } from 'native-base';
import { connect } from 'react-redux';

import Menu from '../config/Menu';
import { 
  buscaTotalQuestoes, 
  buscaQuestoesRespondidas, 
  buscaPergunta,
  cadastraResposta,
  recomeca
} from '../actions/AppFilhoActions';

class Jogo extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      tempoTotal: 30,
      estaCorreto: null,
    }
    this.props.buscaTotalQuestoes(this.props.id_materia,this.props.id_serie);
    this.props.buscaQuestoesRespondidas(this.props.id_filho,this.props.id_materia,this.props.id_serie);
    this._puxaPergunta();
  }

  componentDidMount() {
    //this.contador();
  }

  contador(){
    cont = setTimeout(() => {
      if(this.state.tempoTotal != 0){
        this.setState({tempoTotal: this.state.tempoTotal -1});
        this.contador();
      } else {
        this._cadastraResposta({correto:0});
      }
    }, 1000)
  }

  componentWillUnmount(){
    //clearTimeout(cont);
    //console.log(cont);
  }

  // recomeca(){
  //   this.setState({tempoTotal:30});
  //   this.props.buscaTotalQuestoes(this.props.id_materia,this.props.id_serie);
  //   this.props.buscaQuestoesRespondidas(this.props.id_filho,this.props.id_materia,this.props.id_serie);
  //   this._puxaPergunta();
  //   this.contador();
  // }

  _puxaPergunta(){
    const {id_filho,id_materia,id_serie} = this.props;

    this.props.buscaPergunta({
      id_filho,
      id_materia,
      id_serie
    });
  }

  _cadastraResposta(correto){
    const { id_filho, id_materia, id_serie, id_questao } = this.props;

    this.props.cadastraResposta({
      id_filho,
      id_serie,
      id_materia,
      id_questao,
      correto
    });
    //clearTimeout(cont);
  }
  
	render(){
    if(this.props.telaCadastrado == true) {
      if(this.props.estaCorreto == 1){
        return (
          <View style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:'#76d275'}}>
            <Icon name="checkmark-circle" style={{color:'#fff',fontSize:140}} />
            <Text style={{fontSize:30,color:'white'}}>Você acertou!</Text>
            <Text style={{color:'white'}}>foi adicionado mais 10 pontos a você</Text>
            <Button block large style={{margin:10}} onPress={() => this.props.recomeca()}>
              <Text>Continuar</Text>
            </Button>
          </View>
        );
      } else {
        return (
          <View style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:'#e53935'}}>
            <Icon name="close-circle" style={{color:'#fff',fontSize:140}} />
            <Text style={{fontSize:30,color:'white'}}>Você errou =/</Text>
            <Text style={{color:'white'}}>esta questão aparecerá para você aleatoriamente.</Text>
            <Button block large warning style={{margin:10}} onPress={() => this.props.recomeca()}>
              <Text>Continuar</Text>
            </Button>
          </View>
        );
      }
    } else {
      return(
        <Container>
          <Menu tipo="jogo" materia={this.props.nome_materia}/>
          <Content padder>
            <View style={{flexDirection:'row',justifyContent:'space-between',margin:2}}>
              <View style={styles.boxesTopo}>
                <Text>{this.props.questoesRespondidas}/{this.props.totalQuestoes}</Text>
              </View>
              <View style={styles.boxesTopo}>
                <Text>
                {this.state.tempoTotal}
                </Text>
              </View>
            </View>
            
            <Card>
              <CardItem header>
                <Text>{this.props.titulo}</Text>
              </CardItem>
              <CardItem>
                <Body> 
                  <Text>
                  {this.props.pergunta}
                  </Text>
                </Body>
              </CardItem>
          </Card>
          <View>
                <Button block onPress={() => this._cadastraResposta({correto:1})} style={{margin:2}}>
                  <Text style={styles.txtBoxes}>{this.props.correta}</Text>
                </Button>
                <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
                  <Text style={styles.txtBoxes}>{this.props.errada1}</Text>
                </Button>
                <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
                  <Text style={styles.txtBoxes}>{this.props.errada2}</Text>
                </Button>
                <Button block onPress={() => this._cadastraResposta({correto:0})} style={{margin:2}}>
                  <Text style={styles.txtBoxes}>{this.props.errada3}</Text>
                </Button>
          </View>
          </Content>
        </Container>
      )
    }
	}
}

const mapStateToProps = state => ({
  id_serie:state.AppFilhoReducer.serieFilho,
  id_filho:state.AppFilhoReducer.idFilho,
  id_questao:state.AppFilhoReducer.idQuestao,
  totalQuestoes:state.AppFilhoReducer.total_questoes,
  questoesRespondidas:state.AppFilhoReducer.questoes_respondidas,
  titulo:state.AppFilhoReducer.tituloQuestaoAtual,
  pergunta:state.AppFilhoReducer.perguntaQuestaoAtual,
  correta:state.AppFilhoReducer.respostaCorreta,
  errada1:state.AppFilhoReducer.respostaErrada,
  errada2:state.AppFilhoReducer.respostaErrada1,
  errada3:state.AppFilhoReducer.respostaErrada2,
  telaCadastrado:state.AppFilhoReducer.telaCadastrado,
  estaCorreto:state.AppFilhoReducer.estaCorreto,
  recomecou:state.AppFilhoReducer.recomecou
});

export default connect(mapStateToProps,{
  buscaTotalQuestoes,
  buscaQuestoesRespondidas,
  buscaPergunta,
  cadastraResposta,
  recomeca
})(Jogo);

const styles = StyleSheet.create({
  txtBoxes: {
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center'
  },
  boxes: {
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:20
  },
  boxesTopo: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius:3
  }
});