import React, {useEffect, useState} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OrderDelivery} from '.';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const Restaurant = ({route, navigation}) => {
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  useEffect(() => {
    let {item, currentLocation} = route.params;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, []);

  function editOrder(action, menuId, price) {
    let orderList = orderItems.slice();
    let item = orderList.filter(a => a.menuId === menuId);
    if (action === '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }
      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0].qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }
      setOrderItems(orderList);
    }
  }

  function getOrderQty(menuId) {
    let orderItem = orderItems.filter(a => a.menuId === menuId);
    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }
    return 0;
  }

  function getBasketItemCount() {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
    return itemCount;
  }
  function sumOrder() {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    return total;
  }
  function renderHeader() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray,
            }}>
            <Text style={{...FONTS.h3}}>{restaurant?.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.list}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderFoodInfo() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {restaurant?.menu.map((item, index) => {
          return (
            <View style={{alignItems: 'center'}} key={`menu-${index}`}>
              <View style={{height: SIZES.height * 0.35}}>
                <Image
                  source={item.photo}
                  resizeMode="cover"
                  style={{width: SIZES.width, height: '100%'}}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: -20,
                    width: SIZES.width,
                    height: 50,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => editOrder('-', item.menuId, item.price)}
                    style={{
                      width: 50,
                      height: '100%',
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopLeftRadius: 25,
                      borderBottomLeftRadius: 25,
                    }}>
                    <Text style={{...FONTS.body1}}>-</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 50,
                      height: '100%',
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{...FONTS.h2}}>
                      {getOrderQty(item.menuId)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => editOrder('+', item.menuId, item.price)}
                    style={{
                      width: 50,
                      height: '100%',
                      backgroundColor: COLORS.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopRightRadius: 25,
                      borderBottomRightRadius: 25,
                    }}>
                    <Text style={{...FONTS.body1}}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: SIZES.width,
                  alignItems: 'center',
                  marginTop: 15,
                  paddingHorizontal: SIZES.padding * 2,
                }}>
                <Text
                  style={{
                    marginVertical: 10,
                    textAlign: 'center',
                    ...FONTS.h2,
                  }}>
                  {item.name} - {item.price.toFixed(2)}
                </Text>
                <Text style={{...FONTS.body3}}>{item.description}</Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Image
                  source={icons.fire}
                  style={{height: 20, width: 20, marginRight: 10}}
                />
                <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
                  {item.calories.toFixed(2)}
                </Text>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPos = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={{height: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}>
          {restaurant?.menu.map((item, index) => {
            const opacity = dotPos.interpolate({
              inputRange: [index - 1, index, index],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            const dotSize = dotPos.interpolate({
              inputRange: [index - 1, index, index],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });
            const dotColor = dotPos.interpolate({
              inputRange: [index - 1, index, index],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderOrder() {
    return (
      <View>
        {renderDots()}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1,
            }}>
            <Text
              style={{
                ...FONTS.h3,
              }}>{`${getBasketItemCount()} items in Cart`}</Text>
            <Text style={{...FONTS.h3}}>${sumOrder()}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.pin}
                style={{height: 20, width: 20, tintColor: COLORS.darkgray}}
              />
              <Text style={{marginLeft: SIZES.padding, ...FONTS.h4}}>
                Location
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.master_card}
                resizeMode="contain"
                style={{width: 20, height: 20, tintColor: COLORS.darkgray}}
              />
              <Text style={{marginLeft: SIZES.padding, ...FONTS.h4}}>888</Text>
            </View>
          </View>
          <View
            style={{
              padding: SIZES.padding * 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('OrderDelivery', {
                  restaurant: restaurant,
                  currentLocation: currentLocation,
                })
              }
              style={{
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                borderRadius: SIZES.radius,
              }}>
              <Text style={{color: COLORS.white, ...FONTS.h2}}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={style.container}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

export default Restaurant;
