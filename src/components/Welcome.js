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
    StatusBar
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


    renderBtnLoginNew() {
        return (
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button style={styles.newBtnEntrar} onPress={() => Actions.login()}>
                    <Text style={styles.txtBotao2}> > </Text>
                </Button>
            </View>
        )

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


                            <Text style={{ textAlign: 'center', fontSize: 52, fontWeight: '600', marginVertical: 10, color: '#000', marginTop: 30 }}>
                                SEJA BEM VINDO
                                    </Text>

                            {this.renderBtnLoginNew()}


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


});
