import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import ProfileDetails from '../Components/ProfileDetails/ProfileDetails'
import TandC from '../Components/ProfileDetails/TandC'
import { useSelector } from 'react-redux'

const Stack = createStackNavigator()

const Profilescreen = ({navigation}) => {

  const {logedInUser} = useSelector(state => state.auth)

  useEffect(() => {
    const hideHeader = navigation.getParent()?.setOptions({ headerShown: false });
    navigation.setOptions({title:`Welcome ${logedInUser.username}`})
    return () => {
      navigation.getParent()?.setOptions({ headerShown: true });
    };
  }, [navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen name='profileDetails' component={ProfileDetails} options={{headerShown:false}} />
      <Stack.Screen name='tandc' component={TandC} />
    </Stack.Navigator>
  )
}

export default Profilescreen