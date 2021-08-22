import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS, icons} from '../constants';
import {Home} from '../screens';
const Tab = createBottomTabNavigator();

const tabOptions = {
  showLabel: false,
  style: {
    height: 90,
    shadowColor: '#000',
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
};

const Tabs = () => {
  function createTabIcon(routeName, focused) {
    var icon = icons.home;
    const tintColor = focused ? COLORS.primary : COLORS.gray;
    switch (routeName) {
      case 'Home':
        icon = icons.home;
        break;
      case 'Search':
        icon = icons.search;
        break;
      case 'Bookmark':
        icon = icons.bookmark;
        break;
      case 'Account':
        icon = icons.user;
        break;
    }

    return (
      <Image
        source={icon}
        style={{width: 30, height: 30, tintColor: tintColor}}
        resizeMode="contain"
      />
    );
  }
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          return createTabIcon(route.name, focused);
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Home} />
      <Tab.Screen name="Bookmark" component={Home} />
      <Tab.Screen name="Account" component={Home} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: 90,
    shadowColor: '#000',
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
});

export default Tabs;
