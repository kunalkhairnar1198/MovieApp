import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Loader = () => {
  return (
    <SafeAreaProvider>
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#c0a914" />
            <Text style={styles.loaderText}>Loading Watchlist...</Text>
        </View>
  </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      loaderText: {
        marginTop: 10,
        fontSize: 16,
        color: '#c0a914',
      },
})

export default Loader