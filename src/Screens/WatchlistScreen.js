import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import WatchList from '../Components/Movies/WatchList/WatchList'
import WatchDetail from '../Components/Movies/WatchList/WatchDetail'

const Stack = createStackNavigator()

const WatchlistScreen = () => {
  return (
        <Stack.Navigator>
            <Stack.Screen name='Watchlist' component={WatchList} options={{headerShown:false}}/>
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

export default WatchlistScreen