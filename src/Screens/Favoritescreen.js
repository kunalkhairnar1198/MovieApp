import React from 'react'
import FavoriteList from '../Components/Movies/FavoriteList/FavoriteList'
import { createStackNavigator } from '@react-navigation/stack'
import MovieDetails from '../Components/Movies/Details/MovieDetails'
import WatchDetail from '../Components/Movies/WatchList/WatchDetail'

const Stack = createStackNavigator()

const Favoritescreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Favoritelist' component={FavoriteList} options={{headerShown:false}}/>
      <Stack.Screen name='WatchDetails' component={WatchDetail}
        options={{
          headerShown: true,
          title: 'Watch Detail',
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
        }}/>
    </Stack.Navigator>
  )
}

export default Favoritescreen