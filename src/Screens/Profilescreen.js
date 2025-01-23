import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import ProfileDetails from '../Components/ProfileDetails/ProfileDetails'

const Stack = createStackNavigator()

const Profilescreen = () => {
  return (
    <Stack.Navigator initialRouteName='profileDetails'>
      <Stack.Screen name='profileDetails' component={ProfileDetails} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default Profilescreen