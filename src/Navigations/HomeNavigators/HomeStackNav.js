import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Homescreen from '../../Screens/Homescreen'
import MovieDetails from '../../Components/Movies/Details/MovieDetails'


const Stack = createStackNavigator()

const HomeStackNav = () => {
  return (
        <Stack.Navigator initialRouteName='Home' >
            <Stack.Screen name='Home' component={Homescreen} options={{headerShown:false}} />
            <Stack.Screen name='Moviedetails' component={MovieDetails} 
             options={{
                headerShown:true,
                title: 'Movies Details',
                animation: 'slide_from_right',
                headerStyle:{
                    backgroundColor:'#c24d4d',
                    height:100
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  marginTop: 0,
                  marginHorizontal: 20,
                  fontSize: 30,
                  fontWeight: 'bold',
                },
                
                }} />
        </Stack.Navigator>
    )
}

export default HomeStackNav