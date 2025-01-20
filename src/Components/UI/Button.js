import React, { Children } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const Button = ({children, onPress}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )
}

// const styles = StyleSheet.create({
//   button:{
  
//   }
// })

export default Button   