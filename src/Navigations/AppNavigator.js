import { createStackNavigator, StackView } from '@react-navigation/stack'
import React from 'react'
import AuthNavigators from './AuthNavigators/AuthNavigators'
import TabNavigator from './TabNavigators/TabNavigator'


const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Authnavigator'>
        <Stack.Screen name='Authnavigator' component={AuthNavigators} options={{headerShown:false}}/>
        <Stack.Screen name='Tabnav' component={TabNavigator} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default AppNavigator