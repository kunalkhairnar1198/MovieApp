import React from 'react'
  import { NavigationContainer } from '@react-navigation/native'
import AuthNavigators from './src/Navigations/AuthNavigators/AuthNavigators'

const App = () => {
  return (
    <>
      <NavigationContainer>
        <AuthNavigators/>
      </NavigationContainer>
    </>
  )       
}

export default App