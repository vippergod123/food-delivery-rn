import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import HomeScreen from './HomeScreen';
import reducer from './reducer';
import {sayBye} from './utils';
import thunk from 'redux-thunk';
const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <HomeScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;

//youtube: https://www.youtube.com/watch?v=6kM1Z5dDF-Q&ab_channel=BungFerdly
