import {createStackNavigator} from '@react-navigation/stack';
import React, { useEffect } from 'react';
import Homescreen from '../../Screens/Homescreen';
import MovieDetails from '../../Components/Movies/Details/MovieDetails';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const HomeStackNav = ({navigation}) => {
  const {logedInUser} = useSelector(state => state.auth)

   useEffect(() => {
      const hideHeader = navigation.getParent()?.setOptions({headerShown: false});
     
      return () => {
        navigation.getParent()?.setOptions({headerShown: true});
      };
    }, []);
  
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Homescreen}
        options={{
        title: logedInUser ? `Hello @${logedInUser.username}` : 'Movies',
        animation: 'fade',
       cardStyle:{
        backgroundColor:'#851f1f'
       },
      animationTypeForReplace:'pop',
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
          fontWeight: 'bold'
          }}}
      />
      <Stack.Screen
        name="Moviedetails"
        component={MovieDetails}
        options={{
          headerShown: true,
          title: 'Movies Detail',
          animation: 'slide_from_right',
          headerStyle: {
            backgroundColor: '#c24d4d',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            marginTop: 0,
            marginHorizontal: 20,
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchBar}
        options={{
          headerShown: true,
          title: 'Search',
          animation: 'slide_from_right',
          headerStyle: {
            backgroundColor: '#c24d4d',
            height: 60,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            marginTop: 0,
            marginHorizontal: 20,
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNav;
