import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomSearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  
  const handleFocus = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity
      onPress={handleFocus}
      style={{flex: 1, alignItems: 'center'}}
      >
        
      <View style={styles.inputContainer}>
      <Icon name="search" style={styles.searchIcon} size={20} color="#000" />        
        <TextInput
          style={[styles.textInput, styles.shadowprop]}
          placeholder="Search Movies..."
          placeholderTextColor="#a9a9a9"
          value={searchText}
          onChangeText={text => setSearchText(text)}
          editable={false}
        />
      </View>
    </TouchableOpacity>
    </View>

  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    inputContainer: {
      flexDirection: 'row', 
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20,
      paddingHorizontal: 10,
      fontSize:10,
      backgroundColor: '#f9f9f9',
    },
    searchIcon: {
      marginRight: 10, 
    },
    textInput: {
      flex: 1, 
      fontSize: 16,
    },
    shadowprop:{
      shadowColor: '#fcfcfc',
      shadowOffset: {width: 2, height: 5},
      shadowOpacity: 0.4,
      shadowRadius: 3, 
      elevation:50,
    },
});

export default CustomSearchBar;
