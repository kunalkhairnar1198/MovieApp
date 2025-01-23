import { createStackNavigator, StackView } from '@react-navigation/stack'
import React from 'react'
import AuthNavigators from './AuthNavigators/AuthNavigators'
import TabNavigator from './TabNavigators/TabNavigator'
import { useSelector } from 'react-redux'


const Stack = createStackNavigator()

const AppNavigator = () => {

  const isLogedinUser = useSelector(state => state.auth.token)
  // console.log(isLogedinUser)

  return (
    <Stack.Navigator>
        {!isLogedinUser ? 
        (
            <Stack.Screen name='Authnavigator' component={AuthNavigators} options={{headerShown:false}}/>
          ):(
            <Stack.Screen name='Tabnav' component={TabNavigator} options={{headerShown:false}}/>
        )}
    </Stack.Navigator>
  )
}

export default AppNavigator