import { combineReducers } from 'redux';

import AutenticacaoReducer from './AutenticacaoReducer';
import AppReducer from './AppReducer';
import AppFilhoReducer from './AppFilhoReducer';
import AppPaiProdutoReducer from './AppPaiProdutoReducer';

export default combineReducers({
    AutenticacaoReducer,
    AppReducer,
    AppFilhoReducer,
    AppPaiProdutoReducer
});