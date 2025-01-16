import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Loginscreen = () => {
    const navigation = useNavigation()

    const switchSingupHanlder =()=>{
        navigation.navigate('Signup')   
        console.log(navigation) 
    }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        resizeMethod="cover"
        source={require('../assets/movietitleicon.png')}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputele}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            inputMode="email"
            placeholder="Enter Email"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>
        <View style={styles.inputele}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter Password"
            secureTextEntry={true}
            inputMode="password-new"
            style={styles.input}
          />
        </View>
       
        <TouchableOpacity onPress={switchSingupHanlder  }>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c24d4d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 190,
    width: 300,
    resizeMode: 'stretch',
  },
  inputele: {
    marginTop: 5,
  },

  label: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1e2e2',
  },

  input: {
    padding: 10,
    marginTop: 4,
    borderWidth: 1,
    width: '300',
    borderColor: '#cdcaca',
    borderRadius: 9,
    backgroundColor: 'white',
    fontSize: 20,
    marginBottom: 5,
  },
  title: {
    fontFamily: 'italic',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 40,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#007bff',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    marginTop: 20,
    fontSize: 15,
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default Loginscreen;
