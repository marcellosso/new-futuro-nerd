import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    ImageBackground,
    ActivityIndicator,
    Platform,
    Alert,
    StatusBar,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Item
} from 'native-base';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { modificaEmailFilho, modificaSenhaFilho, autenticaFilho } from '../actions/AutenticacaoActions';

class Welcome extends React.Component {

    // renderBtnLoginNew() {
    //     return (
    //         <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //             <Button style={styles.newBtnEntrar} onPress={() => Actions.login()}>
    //                 <Text style={styles.txtBotao2}> > </Text>
    //             </Button>
    //         </View>
    //     )

    // }

    async UNSAFE_componentWillMount() {
        let icon = '';

        icon = await AsyncStorage.getItem('@FuturoNerd/GenderIcon');
        if (icon) Actions.login();

    }


    async handleMeninoClick() {
        try {
            await AsyncStorage.setItem('@FuturoNerd/GenderIcon', "Menino");
        } catch(e) {
            Alert.alert('Atenção!', 'Ocorreu um erro ao registrar o seu genero', [{ text: 'OK', onPress: () => null },], { cancelable: false })
        }
    }

    async handleMeninaClick() {
        try {
            await AsyncStorage.setItem('@FuturoNerd/GenderIcon', "Menina");
        } catch(e) {
            Alert.alert('Atenção!', 'Ocorreu um erro ao registrar o seu genero', [{ text: 'OK', onPress: () => null },], { cancelable: false })
        }
    }

    render() {
        return (

            <Container>
                <StatusBar translucent backgroundColor="transparent" />
                <ImageBackground style={{ flex: 1 }} imageStyle={{ resizeMode: 'stretch' }} source={require('../imgs/bgAlterado.jpg')}>


                    <Content >
                        <Animatable.View animation="zoomIn" iterationCount={1}>
                            <View style={{ marginTop: 40, marginBottom: 20 }}>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Image source={require('../imgs/newlogo.png')} />
                                </View>
                            </View>


                            <Text style={{ textAlign: 'center', fontSize: 52, fontWeight: 'bold', marginVertical: 10, color: '#000', marginTop: 30 }}>
                                SEJA BEM VINDO
                                    </Text>

                            <Text style={{ textAlign: 'center', fontSize: 38, fontWeight: '700', marginVertical: 10, color: '#000', marginTop: 30 }}>
                                QUEM VOCÊ É?
                            </Text>

                            {/* <View style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                {this.renderBtnLoginNew()}
                            </View> */}

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 40 }}>
                                <View style={{ marginRight: 25 }} >
                                    <TouchableOpacity onPress={() => {this.handleMeninoClick()}} style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 20 }} >
                                        <Image style={styles.imgChoice} source={require('../imgs/smile.png')} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginLeft: 25 }}>
                                    <TouchableOpacity onPress={() => {this.handleMeninaClick()}} style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 20 }} >
                                        <Image style={styles.imgChoice} source={require('../imgs/child.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            


                        </Animatable.View>
                    </Content>




                </ImageBackground>
            </Container >


        )
    }
}

export default Welcome;

const styles = StyleSheet.create({
    newBtnEntrar: {
        /*backgroundColor:'#00796B',*/
        backgroundColor: '#2A9AE5',
        margin: 15,
        borderRadius: 100,
        // textAlign: 'center',
        // elevation: 20,
        width: '20%',
        // marginLeft: 55,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center'
    },
    logo: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 4,
        borderBottomColor: '#000000',
        borderTopWidth: 8,
        borderTopColor: '#b7eaff'
    },
    txtBotao2: {
        color: '#eee',
        fontSize: 55,
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center'
    },
    imgChoice: {
        width: 120,
        height: 120
    }


});
