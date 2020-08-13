import React from 'react';
import { View, StatusBar, YellowBox} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Rotas from './Rotas';
import reducers from './src/reducers';


export default class App extends React.Component {

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
    }

  render() {
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
    return (
      <View style={{flex:1}}>
        <StatusBar barStyle="light-content" />
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <Rotas />
        </Provider>
      </View>
    );
  }
}
