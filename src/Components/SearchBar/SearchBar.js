import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
const SearchBar = () => {
  const navigation = useNavigation()
  const [searchData, setSearchData] = useState()

  useEffect(()=>{

  },[])


  useEffect(() => {
    const hideHeader = navigation.getParent()?.setOptions({ headerShown: false });
       navigation.setOptions({title:'Search'})
    return () => {
      navigation.getParent()?.setOptions({ headerShown: true });
    };
  }, [navigation]);


  return (
    <View style={styles.container}>
    
      <View style={styles.inputContainer}>
      <Icon name="search" style={styles.searchIcon} size={20} color="#000" />        
        <TextInput
          style={[styles.textInput, styles.shadowprop]}
          placeholder="Search Movies..."
          value={searchData}
          onChangeText={text => setSearchData(text)}
        />
      </View>
      <View>
      <Text>dfsd</Text>  
      </View>
    </View>
  )
}       

const styles = StyleSheet.create({
  container: {
    // flex: 1, 
    // justifyContent: 'center',
    paddingVertical:5,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical:5,
    paddingHorizontal: 10,
    backgroundColor: '#fffcfc',
  },
  searchIcon: {
    marginRight: 10, 
  },
  textInput: {
    flex: 1, 
    fontSize: 16,
  },
  
  
})

export default SearchBar