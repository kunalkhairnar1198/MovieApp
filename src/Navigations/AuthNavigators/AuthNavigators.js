import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Loginscreen from '../../Screens/Auth/Loginscreen'
import Registerscreen from '../../Screens/Auth/Registerscreen'

const Stack = createStackNavigator()

const AuthNavigators = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
      <Stack.Screen name='Login' component={Loginscreen} />
      <Stack.Screen name='Signup' component={Registerscreen}/>
      </Stack.Navigator>
  )
}

export default AuthNavigators