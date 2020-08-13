import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Footer, FooterTab, Button, Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';

class Rodape extends React.Component {
    render(){
        if(this.props.atual == 'principal'){
            return(
                <Footer>
                    <FooterTab>
                        {/*<Button full style={styles.btnFooter} onPress={() => null}>
                            <Icon style={styles.icoFooter} name="home" />
                        </Button>*/}
                        <Button full style={styles.btnFooter} onPress={() => Actions.estatisticas()}>
                            <Icon style={styles.icoFooter} name="analytics" />
                        </Button>
                        <Button full style={styles.btnFooter} onPress={() => Actions.configuracoespai()}>
                            <Icon style={styles.icoFooter} name="construct" />
                        </Button>
                        <Button full style={styles.btnFooter} onPress={() => Actions.filhos()}>
                            <Icon style={styles.icoFooter} name="bookmarks" />
                        </Button>
                        <Button full style={styles.btnFooter2} onPress={() => Actions.login()}>
                            <Icon style={styles.icoFooter} name="log-out" style={{color:'white'}} />
                        </Button>
                    </FooterTab>
                </Footer>
            )
        } else if(this.props.atual == 'configuracoes'){
            return(
                <Footer>
                    <FooterTab>
                        {/*<Button full style={styles.btnFooter} onPress={() => Actions.principalpai({type:'reset'})}>
                            <Icon style={styles.icoFooter} name="home" />
                        </Button>*/}
                        <Button full style={styles.btnFooter} onPress={() => Actions.estatisticas()}>
                            <Icon style={styles.icoFooter} name="analytics" />
                        </Button>
                        <Button full style={styles.btnFooter} onPress={() => null}>
                            <Icon style={styles.icoFooter} name="construct" />
                        </Button>
                        <Button full style={styles.btnFooter} onPress={() => Actions.filhos()}>
                            <Icon style={styles.icoFooter} name="bookmarks" />
                        </Button>
                        <Button full style={styles.btnFooter2} onPress={() => Actions.login()}>
                            <Icon style={styles.icoFooter} name="log-out" style={{color:'white'}} />
                        </Button>
                    </FooterTab>
                </Footer>
            )
        } else {
            return(
                <Footer>
                    <FooterTab>
                        {/*<Button full style={styles.btnFooter} onPress={() => Actions.principalpai({type:'reset'})}>
                            <Icon style={styles.icoFooter} name="home" />
                        </Button>*/}
                        <Button full style={styles.btnFooter} onPress={() => null}>
                            <Icon style={styles.icoFooter} name="analytics" />
                        </Button>
                        <Button full style={styles.btnFooter} onPress={() => Actions.configuracoespai()}>
                            <Icon style={styles.icoFooter} name="construct" />
                        </Button>
                        <Button full style={styles.btnFooter} onPress={() => Actions.filhos()}>
                            <Icon style={styles.icoFooter} name="bookmarks" />
                        </Button>
                        <Button full style={styles.btnFooter2} onPress={() => Actions.login()}>
                            <Icon style={styles.icoFooter} name="log-out"  />
                        </Button>
                    </FooterTab>
                </Footer>
            )
        }
    }
}

export default Rodape;

const styles = StyleSheet.create({
    btnFooter: {
        backgroundColor: "#13a7df"
    },
    btnFooter2: {
        backgroundColor: "#cc3300"
    },
    icoFooter:{
        color:"#ffffff"
    }
});
