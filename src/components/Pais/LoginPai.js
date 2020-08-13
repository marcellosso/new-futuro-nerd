import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    StatusBar
} from 'react-native';
import {
    Container,
    Content,
    Icon,
    Button,
    Item
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    modificaEmailPai,
    modificaSenhaPai,
    autenticaPai
} from '../../actions/AutenticacaoActions';

class LoginPai extends React.Component {

    _autenticaPai() {
        const { email, senha } = this.props;

        if (email.trim() != '' && senha.trim() != '') {
            this.props.autenticaPai({ email, senha });
        } else {
            Alert.alert(
                'Atenção!',
                'Usuário / E-Mail ou Senha não pode ser em branco.',
                [
                    { text: 'OK', onPress: () => null },
                ],
                { cancelable: false }
            )
        }
    }

    renderBtnLogin() {
        if (this.props.loading_login) {
            return (
                <Button full large style={styles.btnEntrar} onPress={() => null}>
                    <ActivityIndicator size='small' />
                </Button>
            );
        } else {
            return (
                <Button full large style={styles.btnEntrar} onPress={() => this._autenticaPai()}>
                    <Text style={styles.txtBotao2}>Entrar</Text>
                </Button>
            )
        }
    }

    renderBtnLoginNew() {
        if (!this.props.loading_login) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Button style={styles.newBtnEntrar} onPress={() => this._autenticaPai()}>
                        <Text style={styles.txtBotao2}> ENTRAR PAI </Text>
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
            // <Container>

            //     <ImageBackground style={{flex: 1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}}
            //                      source={require('../../imgs/background-t2.jpg')}>
            //         <KeyboardAwareScrollView
            //             enableOnAndroid
            //             enableAutomaticScroll
            //             keyboardOpeningTime={0}
            //         >
            //             <Content>
            //                 <Animatable.View animation="zoomIn" iterationCount={1}>
            //                     <View style={styles.containerView}>
                                    // <TouchableOpacity onPress={() => Actions.pop()} style={styles.btnBack}>
            //                             <Icon name="md-arrow-back"/>
            //                         </TouchableOpacity>
            //                     </View>
            //                     <View style={{marginTop: 20, marginBottom: 20}}>
            //                         <View style={styles.logo}>
            //                             <Image source={require('../../imgs/logo.jpg')}/>
            //                         </View>
            //                         <Text style={{
            //                             textAlign: 'center',
            //                             fontSize: 18,
            //                             marginVertical: 10,
            //                             color: '#ffffff',
            //                             marginTop: 30
            //                         }}><Text style={{fontWeight: 'bold'}}>Acesso dos Pais!</Text>{"\n"}Entre com o seu
            //                             login de acesso.</Text>
            //                     </View>
            //                     <View style={styles.form}>
            //                         {/*<Item style={styles.Iteminputs}>*/}
            //                         <TextInput
            //                             style={styles.inputs}
            //                             underlineColorAndroid="transparent"
            //                             placeholder="E-mail"
            //                             autoCapitalize="none"
            //                             value={this.props.email}
            //                             placeholderTextColor="#b2b2b2"
            //                             onChangeText={texto => this.props.modificaEmailPai(texto)}
            //                         />
            //                         {/*</Item>
            //       <Item style={styles.Iteminputs}>*/}
            //                         <TextInput
            //                             style={styles.inputs2}
            //                             placeholder="Senha"
            //                             autoCapitalize="none"
            //                             underlineColorAndroid="transparent"
            //                             secureTextEntry={true}
            //                             value={this.props.senha}
            //                             placeholderTextColor="#b2b2b2"
            //                             onChangeText={texto => this.props.modificaSenhaPai(texto)}
            //                         />
            //                         {/*</Item>*/}
            //                     </View>
            //                 </Animatable.View>
            //             </Content>
            //         </KeyboardAwareScrollView>

            //         <Animatable.View animation="slideInUp" iterationCount={1}>
            //             {this.renderBtnLogin()}
            //             <Button full small style={styles.btnCadastrese} onPress={() => Actions.cadastropai()}>
            //                 <Text style={styles.txtBotao}> Cadastrar </Text>
            //             </Button>
            //             <Button full small style={styles.btnEsqSenha}
            //                     onPress={() => Actions.recuperarsenha({modulo: 'pai'})}>
            //                 <Text style={styles.txtBotao3}> Esqueci minha Senha </Text>
            //             </Button>
            //         </Animatable.View>

            //     </ImageBackground>
            // </Container>

            <Container>
                <StatusBar translucent backgroundColor="transparent" />
                <ImageBackground style={{ flex: 1 }} imageStyle={{ resizeMode: 'stretch' }} source={require('../../imgs/bgAlterado.jpg')}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                        <KeyboardAwareScrollView
                            enableOnAndroid
                            enableAutomaticScroll
                            keyboardOpeningTime={0}
                        >
                            <Content>
                                <Animatable.View animation="zoomIn" iterationCount={1}>
                                    <View style={{ marginTop: 40, marginBottom: 20, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                        <View style={{ alignItems: 'flex-start' }}>
                                            <Image source={require('../../imgs/newlogo.png')} />
                                        </View>
                                        <View style={{  justifyContent: 'flex-start', marginRight: 20 }}>
                                            <TouchableOpacity onPress={() => Actions.pop()}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: '600', marginVertical: 10, color: '#000', marginTop: 30 }}>
                                        LOGIN PAI
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
                                            onChangeText={texto => this.props.modificaEmailPai(texto)}
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
                                            onChangeText={texto => this.props.modificaSenhaPai(texto)}
                                        />
                                        {/*</Item>*/}
                                    </View>
                                    {this.renderBtnLoginNew()}
                                    <View style={{ alignItems: 'center' }}>
                                        <Button style={{ backgroundColor: "transparent", border: 0, elevation: 0 }} onPress={() => Actions.recuperarsenha({ modulo: 'pai' })}>
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
                                <Button style={[styles.newBtnEntrar, { backgroundColor: '#F15CF6' }]} onPress={() => Actions.cadastropai()}>
                                    <Text style={styles.txtBotao2}> CADASTRAR-SE </Text>
                                </Button>
                            </View>
                            {/* <Button full small style={styles.btnEsqSenha} onPress={() => Actions.recuperarsenha({ modulo: 'filho' })}>
                <Text style={styles.txtBotao3}> Esqueci minha Senha </Text>
            </Button> */}
                        </Animatable.View>
                    </View>
                </ImageBackground>
            </Container >
        )
    }
}

const mapStateToProps = state => ({
    email: state.AutenticacaoReducer.emailPai,
    senha: state.AutenticacaoReducer.senhaPai,
    loading_login: state.AutenticacaoReducer.loading_login
});

export default connect(mapStateToProps, {
    modificaEmailPai,
    modificaSenhaPai,
    autenticaPai
})(LoginPai);

const styles = StyleSheet.create({
    containerView: {
        paddingTop: 30,
        paddingLeft: 25
    },
    btnBack: {
        backgroundColor: 'rgba(255,255,255, 0.9)',
        width: 55,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    btnCadastrese: {
        backgroundColor: '#ffffff',
        margin: 15,
        marginTop: 0,
        padding: 5
    },
    btnEntrar: {
        backgroundColor: '#000000',
        margin: 15
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
    inputNew: {
        padding: 10,
        paddingLeft: 0,
        fontSize: 15,
        borderBottomWidth: 2,
        // color: '#eee',
        // borderBottomColor: '#eee'
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
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500'
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
        paddingLeft: 55,
        paddingBottom: 30,
        paddingRight: 55,
        marginTop: 50
    },
    Iteminputs: {
        padding: 15,
        margin: 10,
        borderBottomWidth: 0,
        backgroundColor: '#f5f5f5f5',
        borderRadius: 40
    }
});
