import { useNavigation } from '@react-navigation/native';
import React, {  useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthActions } from '../../Store/Features/Auth-slice/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { UiActions } from '../../Store/Features/Ui-slice/ui-slice';
import Loader from '../../Components/UI/Loader';

const Loginscreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registeredUsers, logedInUser, loading } = useSelector(
    (state) => state.auth
  );
  const errorMessage = useSelector((state) => state.ui.validText);
  const dispatch = useDispatch();

  console.log(registeredUsers)

  const switchSingupHanlder = () => {
    navigation.navigate("Signup");
  };

  const SingInHandler = () => {
    const loginUser = {
      email,
      password,
    };

    dispatch(AuthActions.Loaduser(true)); 

    const foundUser = registeredUsers.find(
      (user) =>
        user.email.toLowerCase() === loginUser.email.toLowerCase() &&
        user.password === loginUser.password
    );

    if (foundUser) {
      dispatch(AuthActions.LoginUser(loginUser));
      // dispatch(UiActions.isErrorMessage("Login Successful"));
    } else {
      dispatch(UiActions.isErrorMessage("Invalid credentials"));
      dispatch(AuthActions.Loaduser(false)); 
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.image}
          resizeMethod="cover"
          source={require("../../assets/movietitleicon.png")}
        >
          <Text style={styles.title}>Login</Text>
          {<Text style={styles.alertText}>{errorMessage}</Text>}

          <View style={styles.inputele}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              inputMode="email"
              placeholder="Enter Email"
              placeholderTextColor="#a9a9a9"
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
              placeholderTextColor="#a9a9a9"
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>

          <TouchableOpacity onPress={switchSingupHanlder}>
            <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={SingInHandler}>
            <Text style={styles.buttonText}>
              {loading ? "Loading..." : "Login"}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
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
    color:'black',
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

export default Loginscreen;
