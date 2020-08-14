import React from 'react';
import { AppState, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, View, Dimensions, PanResponder, Animated, Alert, AsyncStorage } from 'react-native';
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
      gender: '',
    }
  }

  UNSAFE_componentWillMount() {
    //this.buscaMaterias();
    this.chooseGender();
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
    }, 60000)
  }

  async chooseGender() {
    let gender = '';

    gender = await AsyncStorage.getItem('@FuturoNerd/GenderIcon');

    if (gender == "Menino") {
      this.setState({ gender: "Menino" })
    } else {
      this.setState({ gender: "Menina " })
    }
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
    const pos1 = new Animated.ValueXY({ x: 0, y: 0 })
    const size1 = new Animated.Value(1)

    const pos2 = new Animated.ValueXY({ x: 0, y: 0 })
    const size2 = new Animated.Value(1)

    const pos3 = new Animated.ValueXY({ x: 0, y: 0 })
    const size3 = new Animated.Value(1)

    const pos4 = new Animated.ValueXY({ x: 0, y: 0 })
    const size4 = new Animated.Value(1)

    const pos5 = new Animated.ValueXY({ x: 0, y: 0 })
    const size5 = new Animated.Value(1)

    const pan1 = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        pos1.setValue({ x: gesture.dx, y: gesture.dy })
        size1.setValue(1.5)
      },
      onPanResponderRelease: () => {
        // position.setValue({x: 0, y:0})
        Animated.spring(size1, {
          toValue: 1,
          useNativeDriver: true
        }).start()

        Animated.spring(pos1, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start()
      }

    })

    const pan2 = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        pos2.setValue({ x: gesture.dx, y: gesture.dy })
        size2.setValue(1.5)
      },
      onPanResponderRelease: () => {
        // position.setValue({x: 0, y:0})
        Animated.spring(size2, {
          toValue: 1,
          useNativeDriver: true
        }).start()

        Animated.spring(pos2, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start()
      }
    })

    const pan3 = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        pos3.setValue({ x: gesture.dx, y: gesture.dy })
        size3.setValue(1.5)
      },
      onPanResponderRelease: () => {
        // position.setValue({x: 0, y:0})

        Animated.spring(size3, {
          toValue: 1,
          useNativeDriver: true
        }).start()

        Animated.spring(pos3, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start()
      }
    })

    const pan4 = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        pos4.setValue({ x: gesture.dx, y: gesture.dy })
        size4.setValue(1.5)
      },
      onPanResponderRelease: () => {
        // position.setValue({x: 0, y:0})

        Animated.spring(size4, {
          toValue: 1,
          useNativeDriver: true
        }).start()

        Animated.spring(pos4, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start()
      }
    })

    const pan5 = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        pos5.setValue({ x: gesture.dx, y: gesture.dy })
        size5.setValue(1.5)
      },
      onPanResponderRelease: () => {
        // position.setValue({x: 0, y:0})

        Animated.spring(size5, {
          toValue: 1,
          useNativeDriver: true
        }).start()

        Animated.spring(pos5, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start()
      }
    })

    function handleClickEscola() {
      Alert.alert(`Olá!`, 'Seja bem vindo ao Futuro Nerd\nEscolha uma matéria e teste seu conhecimento!', [{ text: 'OK', onPress: () => null },], { cancelable: false })
    }

    return (

      <LinearGradient
        colors={['rgb(0,71,212)', 'rgb(140,175,250)']}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={{
            flexDirection: 'row', alignItems: 'center', backgroundColor: '#EBAB6C',
            position: 'absolute', left: 5, top: 25, borderRadius: 20, paddingVertical: 5, paddingHorizontal: 20
          }}>
            <Text style={styles.textName}>{this.props.nome}</Text>
            {/* <Text style={styles.textName}>Marcel</Text> */}
            {/* <Button transparent onPress={() => Actions.configuracoes()}>
              <Icon style={styles.headerConfig} ios='md-settings' android="md-cog" />
            </Button> */}
          </View>

          <View style={{ flexDirection: "row", alignItems: 'center', position: 'absolute', right: 5, top: 20 }}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              {/* <Icon style={styles.headerIconPontos} ios='ios-trophy' android='md-trophy' /> */}
              <Image style={styles.headerAward}
                source={require('../imgs/award.png')} />
              <Text style={styles.headerPontos}>{this.props.pts}</Text>
            </View>
          </View>


          <View>

          </View>
          <View style={styles.choiceContainer}>


            {/* <View style={{ position: 'absolute', zIndex: 199 }} >
              <Image style={styles.nuvemImg}
                source={require('../imgs/nuvem.png')} />
            </View> */}





            <Animated.View
              {...pan1.panHandlers}
              style={{
                position: 'absolute', zIndex: 200, right: 190, bottom: 150, transform: [
                  { translateX: pos1.x },
                  { translateY: pos1.y },
                  { scale: size1 },
                ]
              }} >
              <TouchableOpacity style={[styles.ilhasButton, {

              }]} onPress={() => Actions.jogo({ id_materia: "28", nome_materia: "Português" })} >
                <Image style={styles.ilhasImg}
                  source={require('../imgs/portugues.png')} />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View {...pan2.panHandlers} style={{
              position: 'absolute', zIndex: 200, left: 190, bottom: 150, transform: [
                { translateX: pos2.x },
                { translateY: pos2.y },
                { scale: size2 },
              ]
            }} >
              <TouchableOpacity style={[styles.ilhasButton, {

              }]} onPress={() => Actions.jogo({ id_materia: "29", nome_materia: "História" })}>
                <Image style={styles.ilhasImg}
                  source={require('../imgs/historia.png')} />
              </TouchableOpacity>
            </Animated.View>

            {/* <TouchableOpacity onPress={getRandomMateria} >
              <Image style={styles.escolaImg} source={require('../imgs/newEscola.png')} />
            </TouchableOpacity> */}

            <TouchableOpacity onPress={handleClickEscola} >
              {/* <TouchableOpacity onPress={() => alert(`\tSeja bem vindo ao Futuro Nerd!\nEscolha uma matéria e teste seu conhecimento!`)} > */}
              <Image style={styles.escolaImg} source={require('../imgs/newEscola.png')} />
            </TouchableOpacity>


            {/* <View style={{ position: 'absolute', zIndex: 0, bottom: 200 }} >
              </View> */}

            <Animated.View {...pan3.panHandlers} style={{
              position: 'absolute', zIndex: 200, right: 210, top: 150, transform: [
                { translateX: pos3.x },
                { translateY: pos3.y },
                { scale: size3 },
              ]
            }} >
              <TouchableOpacity style={[styles.ilhasButton, {

              }]} onPress={() => Actions.jogo({ id_materia: "26", nome_materia: "Matemática" })}>
                <Image style={styles.ilhasImg}
                  source={require('../imgs/matematica.png')} />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View {...pan4.panHandlers} style={{
              position: 'absolute', zIndex: 200, top: 220, left: 45, transform: [
                { translateX: pos4.x },
                { translateY: pos4.y },
                { scale: size4 },
              ]
            }}>
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
            </Animated.View>
            <Animated.View {...pan5.panHandlers} style={{
              position: 'absolute', zIndex: 200, left: 210, top: 150, transform: [
                { translateX: pos5.x },
                { translateY: pos5.y },
                { scale: size5 },
              ]
            }} >
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
            </Animated.View>

            <View style={{ position: 'absolute', zIndex: 199, top: 380, right: 210 }} >
              <Image style={styles.nuvemImg}
                source={require('../imgs/nuvem.png')} />
            </View>

            <View style={{ position: 'absolute', zIndex: 199, top: 400, right: 50 }} >
              <Image style={styles.nuvemImg}
                source={require('../imgs/nuvem.png')} />
            </View>

            <View style={{ position: 'absolute', zIndex: 199, top: 310, left: 210 }} >
              <Image style={styles.nuvemImg}
                source={require('../imgs/nuvem.png')} />
            </View>

            <View style={{
              position: 'absolute', zIndex: 200, top: 490, left: -110, backgroundColor: '#EBAB6C',
              width: '110%', display: 'flex', flexDirection: 'row', height: '40%', alignItems: 'center', justifyContent: 'space-between',
              paddingLeft: 50, paddingRight: 0
            }} >
              <TouchableOpacity style={{ marginLeft: 0 }} onPress={() => Actions.loja()}>
                <Icon style={styles.iconBoxes} ios='ios-cart' android='md-cart' />
              </TouchableOpacity>
              {/* <TouchableOpacity style={{ marginRight: 85 }} onPress={() => Actions.loja()}>
                <Icon style={styles.iconBoxes} ios='ios-cart' android='md-cart' />
              </TouchableOpacity> */}

              {this.state.gender == "Menino" ?
                <TouchableOpacity style={{ marginRight: 85 }} onPress={() => Actions.completados()}>
                  <Image style={styles.genderImg}
                    source={require('../imgs/smile.png')} />
                </TouchableOpacity>
                :
                <TouchableOpacity style={{ marginRight: 85 }} onPress={() => Actions.completados()}>
                  <Image style={styles.genderImg}
                    source={require('../imgs/child.png')} />
                </TouchableOpacity>
              }
            </View>

            {/* <TouchableOpacity onPress={() => Actions.completados()}>
              <Card>
                <CardItem style={styles.boxesCardItem}>
                  <Body style={styles.boxes}>
                    <Icon style={styles.iconBoxes} ios='ios-checkmark-circle-outline' android='md-checkmark-circle-outline' />
                    <Text style={styles.txtBoxes}>{('Completados').toUpperCase()}</Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity> */}



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
    fontSize: 54,
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
    width: 230,
    height: 160,
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
    // position: 'absolute',
    // left: 10,
    // top: 20,
    color: '#292827',
    fontWeight: 'bold',
    fontSize: 22,
    // paddingLeft: 25,
    // paddingRight: 15,
  },
  ilhasButton: {
    // position: 'absolute',
    // zIndex: 100,

  },
  choiceContainer: {
    // position: 'relative',
    // zIndex: 1,
    marginBottom: 150
  },
  headerConfig: {
    color: '#F8E180',
    fontSize: 25
  },
  headerIconPontos: {
    fontSize: 25,
    color: '#f5e067'
  },
  headerAward: {
    width: 40,
    height: 40,
  },
  headerPontos: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 24,
    color: '#f5e067'
  },
  genderImg: {
    width: 40,
    height: 40,
  }
})