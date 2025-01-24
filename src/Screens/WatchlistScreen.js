import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import WatchList from '../Components/Movies/WatchList/WatchList'

const Stack = createStackNavigator()

const WatchlistScreen = () => {
  return (
        <Stack.Navigator>
            <Stack.Screen name='Watchlist' component={WatchList} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default WatchlistScreen