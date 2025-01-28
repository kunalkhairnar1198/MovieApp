import React, { Children } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const Button = ({children, onPress, style}) => {
  return (
    <TouchableOpacity
    style={style}
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