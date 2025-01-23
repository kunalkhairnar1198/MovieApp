import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

const TandC = () => {
    const navigation = useNavigation()

    useEffect(() => {
        const hideHeader = navigation.getParent()?.setOptions({ headerShown: false });
       
        return () => {
          navigation.getParent()?.setOptions({ headerShown: true });
        };
      }, [navigation]);
   

  return (
    <View>
    <Text>Terms and condition</Text>
    </View>
  )
}

export default TandC