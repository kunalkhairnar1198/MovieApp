import React from 'react'
import { Text, View } from 'react-native'

const MovieDetails = ({route}) => {
  const {item} = route.params;
  console.log(item)
  return (
    <View>
        <Text>MovieDetails</Text>
    </View>
  )
}

export default MovieDetails