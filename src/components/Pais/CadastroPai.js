import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    Platform, Image, Alert,
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
import { TextInputMask } from 'react-native-masked-text';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    modificaNomePai,
    modificaCelularPai,
    modificaCPFPai,
    modificaEmailPai,
    modificaSenhaPai,
    cadastrarPai
} from '../../actions/AutenticacaoActions';


class CadastroPai extends React.Component {

    _cadastrarPai() {
        const { nome, email, senha, celular, cpf } = this.props;
        // # MXTera -
        if (nome.trim() == '' || email.trim() == '' || senha.trim() == '' || celular.trim() == '' || cpf.trim() == '') {
            Alert.alert('Atenção!', 'Todos os campos devem ser preenchidos!', [{ text: 'OK', onPress: () => null },], { cancelable: false });
            return false;
        }
        if (cpf.trim().length < 5) {
            Alert.alert('Atenção!', 'Digite um CPF válido!', [{ text: 'OK', onPress: () => null },], { cancelable: false });
            return false;
        }
        if (email.trim().indexOf('@') == -1 || email.trim().indexOf('.') == -1) {
            Alert.alert('Atenção!', 'Digite um E-mail válido!', [{ text: 'OK', onPress: () => null },], { cancelable: false });
            return false;
        }
        if (senha.trim().length < 8) {
            Alert.alert('Atenção!', 'A Senha deve ter no mínimo 8 dígitos!', [{ text: 'OK', onPress: () => null },], { cancelable: false });
            return false;
        }
        this.props.cadastrarPai({
            nome,
            email,
            senha,
            celular,
            cpf
        });
        // -- #
    }

    old_renderBtnCadastrar() {
        if (this.props.loading_cadastro) {
            return (
                <Button full large style={styles.btnEntrar} onPress={() => null}>
                    <ActivityIndicator size='small' />
                </Button>
            );
        } else {
            return (
                <Button full large style={styles.btnEntrar} onPress={() => this._cadastrarPai()}>
                    <Text style={styles.txtBotao}>Cadastrar</Text>
                </Button>
            )
        }
    }

    renderBtnCadastrar() {
        if (this.props.loading_cadastro) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Button style={styles.newBtnEntrar} onPress={() => null}>
                        <ActivityIndicator size='small' />
                    </Button>
                </View>
            );
        } else {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Button style={styles.newBtnEntrar} onPress={() => this._cadastrarPai()}>
                        <Text style={styles.txtBotao}>CADASTRAR-SE</Text>
                    </Button>
                </View>
            )
        }
    }

    render() {
        return (
            // <Container>

            //   <ImageBackground style={{flex:1}} blurRadius={0.6} imageStyle={{resizeMode: 'cover'}} source={require('../../imgs/background-t2.jpg')} >
            //   <KeyboardAwareScrollView
            //   enableOnAndroid
            //   enableAutomaticScroll
            //   keyboardOpeningTime={0}
            //   extraHeight={Platform.select({android: 80})}
            //   >
            //     <Content>
            //       <Animatable.View animation="zoomIn" iterationCount={1}>
            //           <View style={styles.containerView}>
            //               <TouchableOpacity onPress={() => Actions.pop()} style={styles.btnBack}>
            //                   <Icon name="md-arrow-back"/>
            //               </TouchableOpacity>
            //           </View>
            //           <View style={{marginTop:20,marginBottom:20}}>
            //               <View style={styles.logo}>
            //                 <Image source={require('../../imgs/logo.jpg')} />
            //               </View>
            //               <Text style={{ textAlign:'center',fontSize:18,marginVertical:10,color:'#ffffff',marginTop:30 }}><Text style={{fontWeight: 'bold'}}>Acesso dos Pais!</Text>{"\n"}Informe os dados abaixo para o cadastro.</Text>
            //           </View>
            //           <View style={styles.form}>
            //             <TextInput
            //                 style={styles.inputs}
            //                 placeholder="Nome e Sobrenome"
            //                 underlineColorAndroid="transparent"
            //                 onChangeText={texto => this.props.modificaNomePai(texto)}
            //                 value={this.props.nome}
            //                 placeholderTextColor="#b2b2b2"
            //             />
            //             <TextInputMask
            //                 style={styles.inputs}
            //                 placeholder="CPF"
            //                 options={{
            //                   format: '999.999.999-99'
            //                 }}
            //                 type={'cpf'}
            //                 underlineColorAndroid="transparent"
            //                 maxLength={14}
            //                 onChangeText={texto => this.props.modificaCPFPai(texto)}
            //                 value={this.props.cpf}
            //                 placeholderTextColor="#b2b2b2"
            //             />
            //             <TextInputMask
            //                 style={styles.inputs}
            //                 placeholder="Celular"
            //                 underlineColorAndroid="transparent"
            //                 options={{
            //                   format: '(99) 99999-9999'
            //                 }}
            //                 type={'cel-phone'}
            //                 onChangeText={texto => this.props.modificaCelularPai(texto)}
            //                 value={this.props.celular}
            //                 maxLength={15}
            //                 placeholderTextColor="#b2b2b2"
            //             />
            //             <TextInput
            //                 style={styles.inputs}
            //                 placeholder="E-mail"
            //                 autoCapitalize="none"
            //                 underlineColorAndroid="transparent"
            //                 onChangeText={texto => this.props.modificaEmailPai(texto)}
            //                 value={this.props.email}
            //                 placeholderTextColor="#b2b2b2"
            //             />
            //             <TextInput
            //                 style={styles.inputs}
            //                 placeholder="Senha"
            //                 underlineColorAndroid="transparent"
            //                 autoCapitalize="none"
            //                 secureTextEntry={true}
            //                 onChangeText={texto => this.props.modificaSenhaPai(texto)}
            //                 value={this.props.senha}
            //                 placeholderTextColor="#b2b2b2"
            //             />

            //           </View>
            //       </Animatable.View>
            //     </Content>
            //     </KeyboardAwareScrollView>

            //     <Animatable.View animation="slideInUp" iterationCount={1}>
            //       {this.renderBtnCadastrar()}
            //     </Animatable.View>
            //   </ImageBackground>
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
                                        <View style={{ justifyContent: 'flex-start', marginRight: 20 }}>
                                            <TouchableOpacity onPress={() => Actions.pop()}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: '600', marginVertical: 10, color: '#000', marginTop: 30 }}>
                                        CADASTRAR-SE
                                    </Text>


                                    <View style={styles.form}>
                                        <TextInput
                                            style={styles.inputNew}
                                            placeholder="Nome e Sobrenome"
                                            underlineColorAndroid="transparent"
                                            onChangeText={texto => this.props.modificaNomePai(texto)}
                                            value={this.props.nome}
                                            placeholderTextColor="#b2b2b2"
                                        />
                                        <TextInputMask
                                            style={styles.inputNew}
                                            placeholder="CPF"
                                            options={{
                                                format: '999.999.999-99'
                                            }}
                                            type={'cpf'}
                                            underlineColorAndroid="transparent"
                                            maxLength={14}
                                            onChangeText={texto => this.props.modificaCPFPai(texto)}
                                            value={this.props.cpf}
                                            placeholderTextColor="#b2b2b2"
                                        />
                                        <TextInputMask
                                            style={styles.inputNew}
                                            placeholder="Celular"
                                            underlineColorAndroid="transparent"
                                            options={{
                                                format: '(99) 99999-9999'
                                            }}
                                            type={'cel-phone'}
                                            onChangeText={texto => this.props.modificaCelularPai(texto)}
                                            value={this.props.celular}
                                            maxLength={15}
                                            placeholderTextColor="#b2b2b2"
                                        />
                                        <TextInput
                                            style={styles.inputNew}
                                            placeholder="E-mail"
                                            autoCapitalize="none"
                                            underlineColorAndroid="transparent"
                                            onChangeText={texto => this.props.modificaEmailPai(texto)}
                                            value={this.props.email}
                                            placeholderTextColor="#b2b2b2"
                                        />
                                        <TextInput
                                            style={styles.inputNew}
                                            placeholder="Senha"
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                            secureTextEntry={true}
                                            onChangeText={texto => this.props.modificaSenhaPai(texto)}
                                            value={this.props.senha}
                                            placeholderTextColor="#b2b2b2"
                                        />
                                    </View>
                                    {this.renderBtnCadastrar()}
                                </Animatable.View>
                            </Content>
                        </KeyboardAwareScrollView>

                        {/* <Animatable.View animation="slideInUp" iterationCount={1}>
                            {this.renderBtnCadastrar()}
                        </Animatable.View> */}
                    </View>
                </ImageBackground>
            </Container >
        )
    }
}

const mapStateToProps = state => ({
    nome: state.AutenticacaoReducer.nomePai,
    celular: state.AutenticacaoReducer.celularPai,
    cpf: state.AutenticacaoReducer.cpfPai,
    email: state.AutenticacaoReducer.emailPai,
    senha: state.AutenticacaoReducer.senhaPai,
    loading_cadastro: state.AutenticacaoReducer.loading_cadastro
});

export default connect(mapStateToProps, {
    modificaNomePai,
    modificaCelularPai,
    modificaCPFPai,
    modificaEmailPai,
    modificaSenhaPai,
    cadastrarPai
})(CadastroPai);

const styles = StyleSheet.create({
    containerView: {
        paddingTop: 30,
        paddingLeft: 25
    },
    newBtnEntrar: {
        /*backgroundColor:'#00796B',*/
        backgroundColor: '#F15CF6',
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
        marginTop: 10,
        // color: '#eee',
        // borderBottomColor: '#eee'
    },
    btnBack: {
        backgroundColor: 'rgba(255,255,255, 0.9)',
        width: 55,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    btnCadastrese: {
        backgroundColor: '#00695C'
    },
    btnEntrar: {
        backgroundColor: '#000000',
        margin: 15
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
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
    inputs: {
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
        marginTop: 40,
    },
    Iteminputs: {
        padding: 15,
        margin: 10,
        borderBottomWidth: 0,
        backgroundColor: '#f5f5f5f5',
        borderRadius: 40
    }
});