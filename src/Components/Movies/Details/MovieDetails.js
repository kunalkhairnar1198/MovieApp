import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { image500 } from '../../../Store/Features/Actions/movies-actions';

const MovieDetails = ({route, navigation}) => {
  const {item} = route.params;
  console.log(item)


  useEffect(()=>{
      const hideHeader = navigation.getParent()?.setOptions({headerShown:false})
      
      return()=>{
        navigation.getParent()?.setOptions({ headerShown: true });

      }
      
  },[navigation,item])



  return (
    <View>
        {/* source={{ uri: image500(item.poster_path) }} */}
    </View>
  )
}
const styles = StyleSheet.create({
  container:{

  }
})

export default MovieDetails