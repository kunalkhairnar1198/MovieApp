import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Homescreen from '../../Screens/Homescreen';
import Profilescreen from '../../Screens/Profilescreen';
import Favoritescreen from '../../Screens/Favoritescreen';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      style={styles.tabbarContainer}
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarStyle: {
          position: 'absolute',
          height: 90,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Homescreen}
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
        }}
      />
      <Tab.Screen name="Profile" component={Profilescreen} />
      <Tab.Screen name="Favorite" component={Favoritescreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabbarContainer: {
    borderTopColor: '#66666666',
    backgroundColor: 'transparent',
    elevation: 0,
  },
});

export default TabNavigator;
