import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Profilescreen from '../../Screens/Profilescreen';
import Favoritescreen from '../../Screens/Favoritescreen';
import {StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeStackNav from '../HomeNavigators/HomeStackNav';
import WatchlistScreen from '../../Screens/WatchlistScreen';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {logedInUser} = useSelector(state => state.auth)
  const { watchRead, FavRead } = useSelector(state => state.movies)

  console.log(logedInUser)
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#c24d4d',
        tabBarHideOnKeyboard:true,
        tabBarStyle: {...styles.tabbarContainer},
      }}>
      <Tab.Screen
        name="HomestackNav"
        component={HomeStackNav}
        options={{
          headerShown:false,
          headerStyle:{
              backgroundColor:'#c24d4d',
              height:0
          },
          headerTintColor:{
            color:'#c24d4d'
          },
          tabBarIcon: ({focused}) => (
            <Icon name="home" size={30} color={focused ? 'red' : '#000'} />
          ),
          tabBarLabel: () => <Text style={styles.tabBarLabel}>Home</Text>,
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={Favoritescreen}
        options={{
          tabBarBadge: FavRead > 0 ? FavRead : undefined,
          title: 'Favorite',
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#c24d4d',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            marginTop: 0,
            marginHorizontal: 20,
            fontSize: 30,
            fontWeight: 'bold',
          },
          tabBarIcon: ({focused}) => (
            <Icon name="heart-o" size={30} color={focused ? 'red' : '#000'} />
          ),
          tabBarLabel: () => <Text style={styles.tabBarLabel}>Favorite</Text>,
        }}
      />

      <Tab.Screen
        name="WatchList"
        component={WatchlistScreen}
        options={{
          tabBarBadge: watchRead > 0 ? watchRead : undefined,
          title: 'WatchList',
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#c24d4d',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            marginTop: 0,
            marginHorizontal: 20,
            fontSize: 30,
            fontWeight: 'bold',
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="bookmark-o"
              size={30}
              color={focused ? 'red' : '#000'}
            />
          ),
          tabBarLabel: () => <Text style={styles.tabBarLabel}>WatchList</Text>,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profilescreen}
        options={{
          title: 'Profile',
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#c24d4d',
            height: 60,
            borderBottomRightRadius: 45,
            borderBottomLeftRadius: 45,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            marginTop: 0,
            marginHorizontal: 20,
            fontSize: 30,
            fontWeight: 'bold',
          },
          tabBarIcon: ({focused}) => (
            <Icon name="user-o" size={30} color={focused ? 'red' : '#000'} />
          ),
          tabBarLabel: () => <Text style={styles.tabBarLabel}>Profile</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabbarContainer: {
      height:70
  },
  tabBarLabel: {
    color: '#292929',
    fontSize: 12,
  },
  tabBarheight: {
    size: 10,
  },
});

export default TabNavigator;
