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

class Login extends React.Component {

    _autenticaFilho() {
        const { email, senha } = this.props;
        // # MXTera -
        if (email.trim() == '' || senha.trim() == '') {
            Alert.alert('Atenção!', 'Usuário / E-Mail ou Senha não pode ser em branco.', [{ text: 'OK', onPress: () => null },], { cancelable: false })
        } else {
            this.props.autenticaFilho({ email, senha });
        }
        // - #
    }

    renderBtnLogin() {
        if (this.props.loading == false) {
            return (
                <Button full large style={styles.btnEntrar} onPress={() => this._autenticaFilho()}>
                    <Text style={styles.txtBotao2}> Entrar </Text>
                </Button>
            );
        } else {
            return (
                <Button full large style={styles.btnEntrar} onPress={() => null}>
                    <ActivityIndicator size="small" />
                </Button>
            );
        }
    }

    renderBtnLoginNew() {
        if (this.props.loading == false) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Button style={styles.newBtnEntrar} onPress={() => this._autenticaFilho()}>
                        <Text style={styles.txtBotao2}> ENTRAR FILHO </Text>
                    </Button>
                </View>
            );
        } else {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Button style={styles.newBtnEntrar} onPress={() => null}>
                        <ActivityIndicator size="small" />
                    </Button>
                </View>
            );
        }
    }

    render() {
        return (

            <Container>
                <StatusBar translucent backgroundColor="transparent" />
                <ImageBackground style={{ flex: 1 }} imageStyle={{ resizeMode: 'stretch' }} source={require('../imgs/bgAlterado.jpg')}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                        <KeyboardAwareScrollView
                            enableOnAndroid
                            enableAutomaticScroll
                            keyboardOpeningTime={0}
                        >
                            <Content>
                                <Animatable.View animation="zoomIn" iterationCount={1}>
                                    <View style={{ marginTop: 40, marginBottom: 20 }}>
                                        <View style={{ alignItems: 'flex-start' }}>
                                            <Image source={require('../imgs/newlogo.png')} />
                                        </View>
                                    </View>

                                    <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: '600', marginVertical: 10, color: '#000', marginTop: 30 }}>
                                        LOGIN FILHO
                                    </Text>


                                    <View style={styles.form}>
                                        {/*<Item style={styles.Iteminputs}>*/}
                                        <TextInput
                                            style={styles.inputNew}
                                            placeholder="Login / E-mail"
                                            autoCapitalize="none"
                                            underlineColorAndroid="transparent"
                                            keyboardType="email-address"
                                            value={this.props.email}
                                            placeholderTextColor="#b2b2b2"
                                            onChangeText={texto => this.props.modificaEmailFilho(texto)}
                                        />
                                        {/*</Item>*/}
                                        {/*<Item style={styles.Iteminputs}>*/}
                                        <TextInput
                                            style={styles.inputNew}
                                            placeholder="Senha"
                                            autoCapitalize="none"
                                            underlineColorAndroid="transparent"
                                            secureTextEntry={true}
                                            value={this.props.senha}
                                            placeholderTextColor="#b2b2b2"
                                            onChangeText={texto => this.props.modificaSenhaFilho(texto)}
                                        />
                                        {/*</Item>*/}
                                    </View>
                                    {this.renderBtnLoginNew()}
                                    <View style={{ alignItems: 'center' }}>
                                        <Button style={{ backgroundColor: "transparent", border: 0, elevation: 0 }} onPress={() => Actions.recuperarsenha({ modulo: 'filho' })}>
                                            <Text style={{ color: '#3f77d1' }}> Esqueci minha senha </Text>
                                        </Button>
                                    </View>
                                </Animatable.View>
                            </Content>
                        </KeyboardAwareScrollView>

                        <Animatable.View animation="slideInUp" iterationCount={1}>
                            {/* <Button full small style={styles.btnCadastrese} onPress={() => Actions.loginpai()}>
                                <Text style={styles.txtBotao}> Acesso dos Pais </Text>
                            </Button> */}
                            <View style={{ alignItems: 'center' }}>
                                <Button style={[styles.newBtnEntrar, { backgroundColor: '#E5872A' }]} onPress={() => Actions.loginpai()}>
                                    <Text style={styles.txtBotao2}> ENTRAR PAI </Text>
                                </Button>
                            </View>
                            {/* <Button full small style={styles.btnEsqSenha} onPress={() => Actions.recuperarsenha({ modulo: 'filho' })}>
                                <Text style={styles.txtBotao3}> Esqueci minha Senha </Text>
                            </Button> */}
                        </Animatable.View>
                    </View>
                </ImageBackground>
            </Container >

            // <Container>

            //   {/*<ImageBackground style={{flex:1}} blurRadius={5} source={require('../imgs/background.jpg')} >*/}
            //   <ImageBackground style={{ flex: 1 }} blurRadius={0.6} imageStyle={{ resizeMode: 'cover' }} source={require('../imgs/background-t2.jpg')} >
            //     {/* <ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../imgs/bgAlterado.jpg')} > */}
            //     <KeyboardAwareScrollView
            //       enableOnAndroid
            //       enableAutomaticScroll
            //       keyboardOpeningTime={0}
            //     >
            //       <Content>

            //         <Animatable.View animation="zoomIn" iterationCount={1} >
            //           <View style={{ marginTop: 40, marginBottom: 20 }}>
            //             <View style={styles.logo}>
            //               <Image source={require('../imgs/logo.jpg')} />
            //               {/*<Text style={{textAlign:'center',fontSize:20,marginVertical:10,fontWeight:'bold'}}>Reforço Escolar</Text>*/}
            //             </View>
            //             <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 10, color: '#ffffff', marginTop: 30 }}>Bem vindo <Text style={{ fontWeight: 'bold' }}>Aluno</Text>,{"\n"}entre com o seu login de acesso.</Text>
            //           </View>

            //           <View style={styles.form}>
            //             {/*<Item style={styles.Iteminputs}>*/}
            //             <TextInput
            //               style={styles.inputs}
            //               placeholder="Login / E-mail"
            //               autoCapitalize="none"
            //               underlineColorAndroid="transparent"
            //               keyboardType="email-address"
            //               value={this.props.email}
            //               placeholderTextColor="#b2b2b2"
            //               onChangeText={texto => this.props.modificaEmailFilho(texto)}
            //             />
            //             {/*</Item>*/}
            //             {/*<Item style={styles.Iteminputs}>*/}
            //             <TextInput
            //               style={styles.inputs2}
            //               placeholder="Senha"
            //               autoCapitalize="none"
            //               underlineColorAndroid="transparent"
            //               secureTextEntry={true}
            //               value={this.props.senha}
            //               placeholderTextColor="#b2b2b2"
            //               onChangeText={texto => this.props.modificaSenhaFilho(texto)}
            //             />
            //             {/*</Item>*/}
            //           </View>
            //         </Animatable.View>

            //       </Content>
            //     </KeyboardAwareScrollView>
            //     <Animatable.View animation="slideInUp" iterationCount={1}>
            //       {this.renderBtnLogin()}
            //       {/*<Button full small style={styles.btnCadastrese} onPress={() => Actions.pais()}>*/}
            //       <Button full small style={styles.btnCadastrese} onPress={() => Actions.loginpai()}>
            //         <Text style={styles.txtBotao}> Acesso dos Pais </Text>
            //       </Button>
            //       <Button full small style={styles.btnEsqSenha} onPress={() => Actions.recuperarsenha({ modulo: 'filho' })}>
            //         <Text style={styles.txtBotao3}> Esqueci minha Senha </Text>
            //       </Button>
            //     </Animatable.View>

            //   </ImageBackground>

            // </Container>

        )
    }
}

mapStateToProps = state => ({
    email: state.AutenticacaoReducer.emailFilho,
    senha: state.AutenticacaoReducer.senhaFilho,
    loading: state.AutenticacaoReducer.loading_login
});

export default connect(mapStateToProps, { modificaEmailFilho, modificaSenhaFilho, autenticaFilho })(Login);

const styles = StyleSheet.create({
    btnCadastrese: {
        /*backgroundColor:'#00695C',*/
        backgroundColor: '#ffffff',
        margin: 15,
        marginTop: 0,
        padding: 5
    },
    inputNew: {
        padding: 10,
        paddingLeft: 0,
        fontSize: 15,
        borderBottomWidth: 2,
        // color: '#eee',
        // borderBottomColor: '#eee'
    },
    btnEntrar: {
        /*backgroundColor:'#00796B',*/
        backgroundColor: '#000000',
        margin: 15,
    },
    newBtnEntrar: {
        /*backgroundColor:'#00796B',*/
        backgroundColor: '#2A9AE5',
        margin: 15,
        borderRadius: 50,
        // textAlign: 'center',
        // elevation: 20,
        width: '80%',
        // marginLeft: 55,
        justifyContent: 'center'
    },
    btnEsqSenha: {
        backgroundColor: '#1297e2',
        margin: 15,
        marginTop: 0,
        padding: 5
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
    txtBotao: {
        color: '#000000',
        fontSize: 16
    },
    txtBotao2: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500',
        alignSelf: 'center'
    },
    txtBotao3: {
        color: '#ffffff',
        fontSize: 16
    },
    inputs: {
        padding: 10,
        paddingLeft: 15,
        backgroundColor: "#ffffff",
        color: "#000000",
        fontSize: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#000000'
    },
    inputs2: {
        padding: 10,
        paddingLeft: 15,
        backgroundColor: "#ffffff",
        color: "#000",
        fontSize: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#000000',
        marginTop: 20
    },
    form: {
        paddingTop: 0,
        paddingBottom: 30,
        paddingLeft: 55,
        paddingRight: 55,
        marginTop: 50
    },
    Iteminputs: {
        padding: 15,
        margin: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#fff',
        /*borderBottomWidth: 0,*/
        /*backgroundColor: '#f5f5f5f5',*/
        /*borderRadius:40*/
        backgroundColor: '#d7f5ff',
        borderRadius: 10
    }
});
