import React from 'react'
import FavoriteList from '../Components/Movies/FavoriteList/FavoriteList'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const Favoritescreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Favoritelist' component={FavoriteList} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default Favoritescreen