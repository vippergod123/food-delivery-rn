import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DestinationDetail, Home, Onboarding} from './screens';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS, SIZES} from './constants/theme';
import {Image, TouchableOpacity} from 'react-native';
import {icons} from './constants';
import Tabs from './navigation/tabs';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName={'Onboarding'}>
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{
            title: null,
            headerStyle: {backgroundColor: COLORS.white},
            headerLeft: ({onPress}) => (
              <TouchableOpacity
                onPress={onPress}
                style={{marginLeft: SIZES.padding}}>
                <Image
                  source={icons.back}
                  resizeMode="contain"
                  style={{height: 25, width: 25}}
                />
              </TouchableOpacity>
            ),
            headerRight: ({}) => (
              <TouchableOpacity
                onPress={() => console.log('Menu')}
                style={{marginLeft: SIZES.padding}}>
                <Image
                  source={icons.menu}
                  resizeMode="contain"
                  style={{height: 25, width: 25}}
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            title: null,
            headerStyle: {backgroundColor: COLORS.white},
            headerLeft: null,
            headerRight: () => (
              <TouchableOpacity
                style={{marginRight: SIZES.padding}}
                onPress={() => {
                  console.log('press');
                }}>
                <Image
                  source={icons.barMenu}
                  style={{height: 25, width: 25}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="DestinationDetail"
          component={DestinationDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
