import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { AuthActions } from '../../Store/Features/Auth-slice/auth-slice'
import { useNavigation } from '@react-navigation/native'

const ProfileDetails = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const logoutHandler =()=>{
    dispatch(AuthActions.LogoutUser())  
    }

  return (
    <View>
        <Text>data</Text>
        <TouchableOpacity style={styles.button} onPress={logoutHandler}>
          <Text>Press Here</Text>
        </TouchableOpacity>
        </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
    },
    countContainer: {
      alignItems: 'center',
      padding: 10,
    },
  });
export default ProfileDetails