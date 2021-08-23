import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {sayBye} from './utils';

function setMsgAction(msg) {
  return dispatch => {
    dispatch({type: 'setMsg', payload: msg});
  };
}

function callApi() {
  return dispatch => {
    Axios.request({url: 'some.url'}).then(res => {
      dispatch({type: 'setMsg', payload: res.data.msg});
    });
  };
}

const HomeScreen = () => {
  const [status, setStatus] = useState('');

  const state = useSelector(state => state.state);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setMsgAction('action'));
    }, 10000);
  }, [dispatch]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text testID="tv-test">{status}</Text>
      <Button
        testID="btn-test"
        onPress={() => {
          setStatus(sayBye());
        }}
        title="Update"
      />
    </View>
  );
};

//youtube: https://www.youtube.com/watch?v=6kM1Z5dDF-Q&ab_channel=BungFerdly
export default HomeScreen;
