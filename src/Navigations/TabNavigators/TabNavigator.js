import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Homescreen from '../../Screens/Homescreen';
import Profilescreen from '../../Screens/Profilescreen';
import Favoritescreen from '../../Screens/Favoritescreen';
import {StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import WatchList from '../../Components/Movies/WatchList/WatchList';
import HomeStackNav from '../HomeNavigators/HomeStackNav';
import {  useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  const navigation = useRoute()
  console.log(navigation)
  return (
    <Tab.Navigator
      initialRouteName="HomestackNav"
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarStyle: {...styles.tabbarContainer},
      }
      }>
      <Tab.Screen
        name="HomestackNav"
        component={HomeStackNav}
        options={{
          title: 'Movies',
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#c24d4d',
            height: 100,
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
            <Icon name="home" size={30} color={focused ? 'red' : '#000'}  />
          ),
          tabBarLabel: () => <Text style={styles.tabBarLabel}>Home</Text>,
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={Favoritescreen}
        options={{
          title: 'Favorite',
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#c24d4d',
            height: 100,
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
        component={WatchList}
        options={{
          title: 'WatchList',
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#c24d4d',
            height: 100,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            marginTop: 0,
            marginHorizontal: 20,
            fontSize: 30,
            fontWeight: 'bold',
          },
          tabBarIcon: ({focused}) => (
            <Icon name="bookmark-o" size={30} color={focused ? 'red' : '#000'} />
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
            height: 100,
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
    position: 'relative',
    width: '100%',
    height: 80,
    backgroundColor: '#F8F7FB',
    borderRadius: 30,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    top:5,
    alignItems: 'center',
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
