import React from 'react'
import { StyleSheet, View } from 'react-native'

const Card = (props) => {
  return (
    <View style={styles.cardContainer}>
        {props.children}    
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer:{
      width: '100%',
      height: '200',
      backgroundColor: '#f8f9fa',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    }
})

export default Card