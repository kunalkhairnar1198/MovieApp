import React, { startTransition } from 'react'
  import { NavigationContainer } from '@react-navigation/native'
import AuthNavigators from './src/Navigations/AuthNavigators/AuthNavigators'
import { StatusBar } from 'react-native'

const App = () => {
  return (
    <>
    <StatusBar animated={true} backgroundColor={'#c24d4d'}/>
      <NavigationContainer>
        <AuthNavigators/>
      </NavigationContainer>
    </>
  )       
}

export default App