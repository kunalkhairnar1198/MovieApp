import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {UiActions} from '../../Store/Features/Ui-slice/ui-slice';
import { getUserData, registerUser } from '../../Store/Features/Auth-slice/auth-slice';

const Registerscreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const errorMessage = useSelector(state => state.ui.validText);
  const registredUsers = useSelector(state => state.auth.RegisterUser)
  const dispatch = useDispatch();

  console.log('-----------',registredUsers);

  useEffect(()=>{
    dispatch(getUserData())
    // dispatch(clearData())
},[])

  const swithchHandleTosignIn = () => {
    navigation.navigate('Login'); 
  };

  const RegisterHandler = () => {
    const userRegisterData = {
      id: Math.random().toString(),
      username,
      email,
      password,
      confirmPassword,
      phoneNumber,
      time:Date()
    };

    if (
      username == '' ||
      email == '' ||
      password == '' ||
      confirmPassword == '' ||
      phoneNumber == ''
    ) {
      dispatch(UiActions.isErrorMessage('All Fields are required !'));
    } else if (password !== confirmPassword) {
      dispatch(UiActions.isErrorMessage('do not match password'));
    } else {  
      dispatch(registerUser(userRegisterData))
      console.log(userRegisterData) 
      dispatch(UiActions.isErrorMessage(''));
      navigation.push('Login');
    }
    



    console.log(userRegisterData);
  };

 

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.image}
        resizeMethod="cover"
        source={require('../../assets//movietitleicon.png')}>
        <Text style={styles.title}>Signup</Text>
        <Text style={`!errorMessage ?  ${styles.alertText} : ''`}>{errorMessage}</Text>

        <View style={styles.inputele}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="Enter the Username"
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>
        <View style={styles.inputele}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            inputMode="email"
            placeholder="Enter Email"
            keyboardType="email-address"
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>
        <View style={styles.inputele}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter Password"
            secureTextEntry={true}
            inputMode="password-new"
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>
        <View style={styles.inputele}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm password"
            secureTextEntry={true}
            returnKeyType={'next'}
            autoFocus={!errorMessage}
            inputMode="password"
            onChangeText={setConfirmPassword}
            style={styles.input}
          />
          <Text style={`!errorMessage ?  ${styles.alertText} : ''`}>{errorMessage}</Text>
        </View>
        <View style={styles.inputele}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            placeholder="Phone number"
            inputMode="number"
            keyboardType="number-pad"
            onChangeText={setPhoneNumber}
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={swithchHandleTosignIn}>
          <Text style={styles.linkText}>If have an account? Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={RegisterHandler}>
          <Text style={styles.buttonText}>Singup</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
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
  alertText: {
    fontSize: 15,
    color: '#fc2525',
    backgroundColor: 'white',
  },
});

export default Registerscreen;
