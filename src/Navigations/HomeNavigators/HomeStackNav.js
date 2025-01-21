import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Homescreen from '../../Screens/Homescreen'
import MovieDetails from '../../Components/Movies/Details/MovieDetails'


const Stack = createStackNavigator()

const HomeStackNav = () => {
  return (
        <Stack.Navigator initialRouteName='Home'  screenOptions={{headerShown:false}}>
            <Stack.Screen name='Home' component={Homescreen} />
            <Stack.Screen name='Moviedetails' component={MovieDetails} />
        </Stack.Navigator>
    )
}

export default HomeStackNav