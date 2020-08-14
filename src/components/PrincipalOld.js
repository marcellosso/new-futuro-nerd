import React from 'react';
import { AppState, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, View, Dimensions, PanResponder, Animated } from 'react-native';
import { Container, Body, Card, Icon, Content, CardItem, Col, Grid, Row, Button, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AppStateListener from "react-native-appstate-listener";
import { ativarContadorFilho, updateActiveTime } from '../actions/AppFilhoActions';
import Menu from '../config/Menu';
import * as Animatable from "react-native-animatable";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

import { URL_API_FUTURONERD } from '../config/Constants';

// function handleActive() {
//   console.log("The application is now active!");
//   cont = setTimeout(() => {
//     console.log("The application is now active!");
//   }, 1000)
// }


const dimensions = Dimensions.get('window');
const imageHeight = dimensions.height;
const imageWidth = dimensions.width;


class Principal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      materias: [],
    }
  }

  UNSAFE_componentWillMount() {
    //this.buscaMaterias();
  }

  componentDidMount() {
    //this.setState({ contator_ativo: true });
    this.props.ativarContadorFilho(true);
    myInterval = setInterval(() => {
      if (AppState.currentState == 'active' && this.props.contator_ativo) { // 'background' 'inactive'
        // console.log("The contador is now active!");
        this.props.updateActiveTime(this.props.id_filho);
      } else {
        clearInterval(myInterval);
        // console.log("The contador is now inactive!");
      }
    }, 5000)
  }

  buscaMaterias() {
    axios.get(URL_API_FUTURONERD + '/materia_by_serie/' + this.props.serie)
      .then(materias => {
        this.setState({ materias: materias.data })
      })
      .catch(() => {
        console.log('erro ao recuperar os dados de materias');
      });
  }


  render() {
    const position = new Animated.ValueXY({x:0,y:0})

    const pan = PanResponder.create({
      onMoveShouldSetPanResponder:()=>true,
      onPanResponderMove: (e, gesture) => {
        position.setValue({x:gesture.dx,y:gesture.dy})
      },
      onPanResponderRelease:() => {
        // position.setValue({x: 0, y:0})
        Animated.spring(position, {
          toValue: {x:0, y:0}
        }).start()
      }
    })


    return (
      // <Container>
      //   <ImageBackground style={{ flex: 1 }} blurRadius={0.6} imageStyle={{ resizeMode: 'cover' }} source={require('../imgs/background-t2.jpg')} >
      //     <Menu nome={this.props.nome} pts={this.props.pts} />

      //     <Content padder>

      //       <Grid>
      //         <Row>
      //           <Col>
      //             <TouchableOpacity onPress={() => Actions.jogar()}>

      //               <Card>
      //                 <CardItem style={styles.boxesCardItem}>
      //                   <Body style={styles.boxes}>
      //                     <Icon style={styles.iconBoxes} ios='ios-play' android='md-play' />
      //                     <Text style={styles.txtBoxes}>{('Jogar').toUpperCase()}</Text>
      //                   </Body>
      //                 </CardItem>
      //               </Card>
      //             </TouchableOpacity>
      //           </Col>
      //           <Col>
      //             <TouchableOpacity onPress={() => Actions.loja()}>
      //               <Card>
      //                 <CardItem style={styles.boxesCardItem}>
      //                   <Body style={styles.boxes}>
      //                     <Icon style={styles.iconBoxes} ios='ios-basket' android='md-basket' />
      //                     <Text style={styles.txtBoxes}>{('Loja').toUpperCase()}</Text>
      //                   </Body>
      //                 </CardItem>
      //               </Card>
      //             </TouchableOpacity>
      //           </Col>
      //         </Row>

      //         <Row>
      //           <Col>
      //             <TouchableOpacity onPress={() => Actions.completados()}>
      //               <Card>
      //                 <CardItem style={styles.boxesCardItem}>
      //                   <Body style={styles.boxes}>
      //                     <Icon style={styles.iconBoxes} ios='ios-checkmark-circle-outline' android='md-checkmark-circle-outline' />
      //                     <Text style={styles.txtBoxes}>{('Completados').toUpperCase()}</Text>
      //                   </Body>
      //                 </CardItem>
      //               </Card>
      //             </TouchableOpacity>
      //           </Col>
      //           <Col>
      //             <TouchableOpacity onPress={() => Actions.ajuda()}>
      //               <Card>
      //                 <CardItem style={styles.boxesCardItem}>
      //                   <Body style={styles.boxes}>
      //                     <Icon style={styles.iconBoxes} ios='ios-help-buoy' android='md-help' />
      //                     <Text style={styles.txtBoxes}>{('Ajuda').toUpperCase()}</Text>
      //                   </Body>
      //                 </CardItem>
      //               </Card>
      //             </TouchableOpacity>
      //           </Col>
      //         </Row>

      //       </Grid>
      //     </Content>

      //     <Animatable.View animation="slideInUp" iterationCount={1}>
      //       <Button full large style={styles.btnSair} onPress={() => { this.props.ativarContadorFilho(false); Actions.login() }}>
      //         <Text style={styles.txtBotao}> Sair </Text>
      //       </Button>
      //     </Animatable.View>
      //   </ImageBackground>
      // </Container>
      <LinearGradient
        colors={['rgb(0,71,212)', 'rgb(140,175,250)']}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.textName}>Olá, {this.props.nome}</Text>

          <Right style={{ flexDirection: "row", alignItems: 'center', position: 'absolute', right: 5, top: 15 }}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <Icon style={styles.headerIconPontos} ios='ios-trophy' android='md-trophy' />
              <Text style={styles.headerPontos}>{this.props.pts}</Text>
            </View>
            <Button transparent onPress={() => Actions.configuracoes()}>
              <Icon style={styles.headerConfig} ios='md-settings' android="md-cog" />
            </Button>
          </Right>

          <View style={styles.choiceContainer}>

            <View style={{ position: 'absolute', zIndex: 199 }} >
              <Image style={styles.nuvemImg}
                source={require('../imgs/nuvem.png')} />
            </View>

            <View style={{ position: 'absolute', zIndex: 199, bottom: 350, right: 200 }} >
              <Image style={styles.nuvemImg}
                source={require('../imgs/nuvem.png')} />
            </View>

            <View style={{ position: 'absolute', zIndex: 199, bottom: 400, right: 50 }} >
              <Image style={styles.nuvemImg}
                source={require('../imgs/nuvem.png')} />
            </View>

            <View style={{ position: 'absolute', zIndex: 199, bottom: 310, left: 200 }} >
              <Image style={styles.nuvemImg}
                source={require('../imgs/nuvem.png')} />
            </View>


            <Animated.View 
              { ...pan.panHandlers }
              style={{ position: 'absolute', zIndex: 200, right: 190, bottom: 150, transform: [
                {translateX: position.x},
                {translateY: position.y},
              ] }} >
              <TouchableOpacity style={[styles.ilhasButton, {

              }]} onPress={() => Actions.jogo({ id_materia: "28", nome_materia: "Portugues" })} >
                <Image style={styles.ilhasImg}
                  source={require('../imgs/portugues.png')} />
              </TouchableOpacity>
            </Animated.View>

            <View style={{ position: 'absolute', zIndex: 200, left: 190, bottom: 150 }} >
              <TouchableOpacity style={[styles.ilhasButton, {

              }]} onPress={() => Actions.jogo({ id_materia: "29", nome_materia: "História" })}>
                <Image style={styles.ilhasImg}
                  source={require('../imgs/historia.png')} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Image style={styles.escolaImg} source={require('../imgs/escola.png')} />
            </TouchableOpacity>


            {/* <View style={{ position: 'absolute', zIndex: 0, bottom: 200 }} >
              </View> */}

            <View style={{ position: 'absolute', zIndex: 200, right: 190, top: 150 }} >
              <TouchableOpacity style={[styles.ilhasButton, {

              }]} onPress={() => Actions.jogo({ id_materia: "26", nome_materia: "Matemática" })}>
                <Image style={styles.ilhasImg}
                  source={require('../imgs/matematica.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ position: 'absolute', zIndex: 200, top: 220, left: 45 }} >
              <TouchableOpacity style={[styles.ilhasButton, {
                // top: 160,
                // right: 0,
                // bottom: 0,
                // left: 220,
                // zIndex: 105,
              }]} onPress={() => Actions.jogo({ id_materia: "22", nome_materia: "Geografia" })}>
                <Image style={styles.ilhasImg}
                  source={require('../imgs/geografia.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ position: 'absolute', zIndex: 200, left: 190, top: 150 }} >
              <TouchableOpacity style={[styles.ilhasButton, {
                // top: 160,
                // right: 0,
                // bottom: 0,
                // left: 220,
                // zIndex: 105,
              }]} onPress={() => Actions.jogo({ id_materia: "21", nome_materia: "Ciências" })}>
                <Image style={styles.ilhasImg}
                  source={require('../imgs/ciencias.png')} />
              </TouchableOpacity>
            </View>

            <View style={{ position: 'absolute', zIndex: 200, top: 400, left: 75 }} >
              <TouchableOpacity onPress={() => Actions.loja()}>
                <Icon style={styles.iconBoxes} ios='ios-cart' android='md-cart' />
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </LinearGradient>
    )
  }


}

const mapStateToProps = state => ({
  nome: state.AppFilhoReducer.nomeFilho,
  pts: state.AppFilhoReducer.pts,
  contator_ativo: state.AppFilhoReducer.contator_ativo,
  appState: AppState.currentState,
  id_filho: state.AppFilhoReducer.idFilho,
  serieFilho: state.AppFilhoReducer.serieFilho
});

export default connect(mapStateToProps, { ativarContadorFilho, updateActiveTime })(Principal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBoxes: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
  iconBoxes: {
    fontSize: 64,
    color: '#fff',
  },
  boxesCardItem: {
    borderBottomWidth: 4,
    borderBottomColor: "#000000"
  },
  boxes: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  btnSair: {
    backgroundColor: '#000000',
    margin: 15,
    marginTop: 0,
    padding: 10,
    justifyContent: 'center',
  },
  txtBotao: {
    color: '#ffffff',
    fontSize: 16
  },
  escolaImg: {
    width: 200,
    height: 200,
  },
  ilhasImg: {
    width: 120,
    height: 150,
  },
  nuvemImg: {
    width: 70,
    height: 55,
  },
  textName: {
    position: 'absolute',
    left: 10,
    top: 20,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  ilhasButton: {
    // position: 'absolute',
    // zIndex: 100,

  },
  choiceContainer: {
    // position: 'relative',
    // zIndex: 1,
  },
  headerConfig: {
    color: '#fff',
    fontSize: 25
  },
  headerIconPontos: {
    fontSize: 25,
    color: '#f5e067'
  },
  headerPontos: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    color: '#f5e067'
  },
})