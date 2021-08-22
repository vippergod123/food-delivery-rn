import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, images, FONTS, SIZES} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
const Onboarding = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.onboardingImage}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center', marginHorizontal: SIZES.padding}}>
          <Text style={{...FONTS.h2}}> Digital Ticket</Text>
          <Text
            style={{
              color: COLORS.gray,
              marginTop: SIZES.padding,
              textAlign: 'center',
            }}>
            Easy solution to buy tickets for your travel, business trips,
            transportation, lodging and culinary.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={[
            styles.shadow,
            {
              marginTop: SIZES.padding * 2,
              width: '70%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <LinearGradient
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
            }}
            colors={['#46aeff', '#5884ff']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Text style={{color: COLORS.white, ...FONTS.h3}}>START !</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default Onboarding;
