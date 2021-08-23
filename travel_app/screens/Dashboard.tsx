import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextButton} from '../components';
import {COLORS, dummyData, FONTS, icons, images, SIZES} from '../constants';

const COUNTRIES_ITEM_SIZE = SIZES.width / 3;
const PLACES_ITEM_SIZE =
  Platform.OS === 'ios' ? SIZES.width / 1.25 : SIZES.width / 1.2;
const EMPTY_ITEM_SIZE = (SIZES.width - PLACES_ITEM_SIZE) / 2;

const Dashboard = ({navigation}) => {
  const [countries, setCountries] = useState([
    {id: -1},
    ...dummyData.countries,
    {id: -2},
  ]);

  const [places, setPlaces] = useState([
    {id: -1},
    ...dummyData.countries[0].places,
    {id: -2},
  ]);

  const [placesScrollPosition, setPlacesScrollPosition] = useState(0);

  const countryScrollX = useRef(new Animated.Value(0)).current;
  const placesScrollX = useRef(new Animated.Value(0)).current;

  function exploreButtonHandler() {
    const currentIndex = placesScrollPosition + 1;
    navigation.navigate('Place', {
      selectedPlace: places[currentIndex],
    });
  }
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: SIZES.base,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            width: 45,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={icons.side_drawer}
            style={{width: 25, height: 25, tintColor: COLORS.white}}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>ASIA</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            console.log('Profile');
          }}>
          <Image
            source={images.profile_pic}
            resizeMode="contain"
            style={{height: 25, width: 25, borderRadius: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function renderCountries() {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={COUNTRIES_ITEM_SIZE}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        data={countries}
        keyExtractor={item => `${item.id}`}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: countryScrollX}}}],
          {useNativeDriver: false},
        )}
        onMomentumScrollEnd={event => {
          var pos = (
            event.nativeEvent.contentOffset.x / COUNTRIES_ITEM_SIZE
          ).toFixed(0);

          setPlaces([{id: -1}, ...dummyData.countries[pos].places, {id: -2}]);
        }}
        renderItem={({item, index}) => {
          const opacity = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const mapSize = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE,
            ],
            outputRange: [25, Platform.OS === 'ios' ? 80 : 60, 25],
            extrapolate: 'clamp',
          });

          const fontSize = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE,
            ],
            outputRange: [15, 25, 15],
            extrapolate: 'clamp',
          });

          if (index === 0 || countries.length - 1 === index) {
            return <View style={{width: COUNTRIES_ITEM_SIZE}} />;
          } else {
            return (
              <Animated.View
                style={{
                  opacity: opacity,
                  height: 130,
                  width: COUNTRIES_ITEM_SIZE,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Animated.Image
                  source={item.image}
                  resizeMode="contain"
                  style={{
                    width: mapSize,
                    height: mapSize,
                    tintColor: COLORS.white,
                  }}
                />
                <Animated.Text
                  style={{
                    marginTop: 3,
                    color: COLORS.white,
                    ...FONTS.h1,
                    fontSize: fontSize,
                  }}>
                  {item.name}
                </Animated.Text>
              </Animated.View>
            );
          }
        }}
      />
    );
  }

  function renderPlaces() {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={places}
        keyExtractor={item => `places-${item.id}`}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        snapToAlignment="center"
        snapToInterval={
          Platform.OS === 'ios' ? PLACES_ITEM_SIZE + 1000 : PLACES_ITEM_SIZE
        }
        onMomentumScrollEnd={event => {
          const pos = (
            event.nativeEvent.contentOffset.x / PLACES_ITEM_SIZE
          ).toFixed(0);

          setPlacesScrollPosition(Number(pos));
        }}
        scrollEventThrottle={16}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: placesScrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          const opacity = placesScrollX.interpolate({
            inputRange: [
              (index - 2) * PLACES_ITEM_SIZE,
              (index - 1) * PLACES_ITEM_SIZE,
              index * PLACES_ITEM_SIZE,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          let activeHeight = 0;
          if (Platform.OS === 'ios') {
            if (SIZES.height > 800) {
              activeHeight = SIZES.height / 2;
            } else {
              activeHeight = SIZES.height / 1.65;
            }
          } else {
            activeHeight = SIZES.height / 1.6;
          }

          const height = placesScrollX.interpolate({
            inputRange: [
              (index - 2) * PLACES_ITEM_SIZE,
              (index - 1) * PLACES_ITEM_SIZE,
              index * PLACES_ITEM_SIZE,
            ],
            outputRange: [
              SIZES.height / 2.25,
              activeHeight,
              SIZES.height / 2.25,
            ],
            extrapolate: 'clamp',
          });

          if (index === 0 || index === places.length - 1) {
            return <View style={{width: EMPTY_ITEM_SIZE}} />;
          }
          return (
            <Animated.View
              style={{
                opacity: opacity,
                width: PLACES_ITEM_SIZE,
                height: height,
                alignItems: 'center',
                borderRadius: 20,
                padding: 10,
              }}>
              <Image
                source={item.image}
                resizeMode="cover"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                }}
              />

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginHorizontal: SIZES.padding,
                }}>
                <Text
                  style={{
                    marginBottom: SIZES.radius,
                    color: COLORS.white,
                    ...FONTS.h1,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    marginBottom: SIZES.padding * 2,
                    color: COLORS.white,
                    textAlign: 'center',
                    ...FONTS.body3,
                  }}>
                  {item.description}
                </Text>

                <TextButton
                  label="Explore"
                  customContainerStyle={{
                    position: 'absolute',
                    bottom: -20,
                    width: 150,
                  }}
                  onPress={() => {
                    exploreButtonHandler();
                  }}
                />
              </View>
            </Animated.View>
          );
        }}
      />
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.black}}>
      {renderHeader()}

      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 40 : 0,
        }}>
        <View>
          <View>{renderCountries()}</View>

          <View style={{height: SIZES.height / 2}}>{renderPlaces()}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: COLORS.black,
  },
});

export default Dashboard;
