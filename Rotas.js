import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import Login from './src/components/Login';
import Principal from './src/components/Principal';
import Configuracoes from './src/components/Configuracoes';
import BoasVindas from './src/components/BoasVindas';
import Jogar from './src/components/Jogar';
import Jogo from './src/components/Jogo';
import Ajuda from './src/components/Ajuda';
import Loja from './src/components/Loja';
import Produto from './src/components/Loja/Produto';
import Completados from './src/components/Completados';
import LoginPai from './src/components/Pais/LoginPai';
import Pais from './src/components/Pais/Pais';
import CadastroPai from './src/components/Pais/CadastroPai';
import PrincipalPai from './src/components/Pais/PrincipalPai';
import AjudaPai from './src/components/Pais/AjudaPai';
import ConfiguracoesPai from './src/components/Pais/ConfiguracoesPai';
import Plano from './src/components/Pais/Plano';
import Filhos from './src/components/Pais/Filhos';
import VerFilho from './src/components/Pais/VerFilho';
import Estatisticas from './src/components/Pais/Estatisticas';
import MateriasFilho from './src/components/Pais/MateriasFilho';
import EstatisticasResultados from './src/components/Pais/EstatisticasResultados';
import LojaPai from './src/components/Pais/LojaPai';
import ProdutosPai from './src/components/Pais/ProdutosPai';
import PedidosFilhoPai from './src/components/Pais/PedidosFilhoPai';
import RecuperarSenha from './src/components/RecuperarSenha';

import Welcome from './src/components/Welcome';

import Tela1ListaFilho from './src/components/Pais/Produtos/Tela1ListaFilho';
import Tela2ListaProduto from './src/components/Pais/Produtos/Tela2ListaProduto';
import Tela3DetalheProdutoEFrete from './src/components/Pais/Produtos/Tela3DetalheProdutoEFrete';
import Tela4ConclusaoCompraPagamento from './src/components/Pais/Produtos/Tela4ConclusaoCompraPagamento';

export default props => (
  <Router>
    <Stack key="root">
      <Scene key="welcome" component={Welcome} hideNavBar initials/> 
      <Scene key="login" component={Login} hideNavBar />
      <Scene key="pais" component={Pais} hideNavBar/> 
      <Scene key="principal" component={Principal} hideNavBar/>
      <Scene key="configuracoes" component={Configuracoes} hideNavBar/>
      <Scene key="boasvindas" component={BoasVindas} hideNavBar/>
      <Scene key="jogar" component={Jogar} hideNavBar/>
      <Scene key="jogo" component={Jogo} hideNavBar/>
      <Scene key="ajuda" component={Ajuda} hideNavBar/>
      <Scene key="loja" component={Loja} hideNavBar/>
      <Scene key="produto" component={Produto} hideNavBar/>
      <Scene key="completados" component={Completados} hideNavBar/>
      <Scene key="loginpai" component={LoginPai} hideNavBar/>
      <Scene key="cadastropai" component={CadastroPai} hideNavBar/>
      <Scene key="principalpai" component={PrincipalPai}  hideNavBar/>
      <Scene key="ajudapai" component={AjudaPai} hideNavBar/>
      <Scene key="configuracoespai" component={ConfiguracoesPai} hideNavBar/>
      <Scene key="plano" component={Plano} hideNavBar/>
      <Scene key="filhos" component={Filhos} hideNavBar/>
      <Scene key="verfilho" component={VerFilho} hideNavBar/>
      <Scene key="estatisticas" component={Estatisticas} hideNavBar/>
      <Scene key="materiasfilho" component={MateriasFilho} hideNavBar/>
      <Scene key="estatisticasresultados" component={EstatisticasResultados} hideNavBar/>
      <Scene key="lojapai" component={LojaPai} hideNavBar/>
      <Scene key="produtospai" component={ProdutosPai} hideNavBar/>
      <Scene key="pedidosfilhopai" component={PedidosFilhoPai} hideNavBar/>
      <Scene key="recuperarsenha" component={RecuperarSenha} hideNavBar/>
      {/* Rotas Pai Produtos */}
      <Scene key="tela1listafilho" component={Tela1ListaFilho} hideNavBar/>
      <Scene key="tela2listaproduto" component={Tela2ListaProduto} hideNavBar/>
      <Scene key="tela3detalheprodutoefrete" component={Tela3DetalheProdutoEFrete} hideNavBar/>
      <Scene key="tela4conclusaocomprapagamento" component={Tela4ConclusaoCompraPagamento} hideNavBar/>
    </Stack>
  </Router>
);