import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../../Store/Features/Auth-slice/auth-slice';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Zocial';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window'); 

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { logedInUser } = useSelector((state) => state.auth);


  
  const logoutHandler = () => {
    dispatch(AuthActions.LogoutUser());
  };

  

  return (
    <View style={styles.container}>
      <Image
        style={styles.profile}
        source={require('../../../src/assets/profile.png')}
        resizeMode="contain"
      />
      <View style={styles.detailsSection}>
        <Text style={styles.detailText}>Name: {logedInUser?.username || 'N/A'}</Text>
        <View style={styles.emailSection}>
          <Icon name="email" size={16} color={'#977474'} />
          <Text style={styles.email}>{logedInUser?.email || 'N/A'}</Text>
        </View>
        <View style={styles.phoneSection}>
          <Feather name="smartphone" size={16} color={'#977474'} />
          <Text style={styles.phone}>{logedInUser?.phoneNumber || 'N/A'}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('tandc')}
      >
        <Text style={styles.navButtonText}>Terms and Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={logoutHandler}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  profile: {
    marginVertical: 20,
    height: 150,
    width: 150,
    borderColor: '#cc4a4a',
    borderRadius: 75,
    borderWidth: 5,
  },
  detailsSection: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  emailSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  email: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  phoneSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  phone: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',TandC
  },
  navButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    backgroundColor: '#e6f0ff',
  },
  navButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  button: {
    marginTop: 20,
    width: width * 0.8,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#cc4343',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProfileDetails;
