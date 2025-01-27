import React, { useCallback, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import TrendingMovies from '../Components/Movies/TrendingMovies/TrendingMovies'
import WatchList from '../Components/Movies/WatchList/WatchList';
import FavoriteList from '../Components/Movies/FavoriteList/FavoriteList';
import MovieList from '../Components/Movies/MovieList/MovieList';
import { useDispatch } from 'react-redux';
import { fetchPopularMovies, fetchTrendingMovies } from '../Store/Features/Actions/movies-actions';
import SearchBar from '../Components/SearchBar/SearchBar';
import CustomSearchBar from '../Components/SearchBar/CustomeSearchBar';

const Homescreen = ({navigation}) => {

  const [refreshingScreen, setIsRefreshing] = useState(false)
  const dispatch =useDispatch()


  const onScrollControler=useCallback(()=>{
      setIsRefreshing(true)
        dispatch(fetchPopularMovies())
        dispatch(fetchTrendingMovies())
      setTimeout(()=>{
        setIsRefreshing(false)
      },2000)

  },[])

  return (
    <ScrollView
      style={[
        styles.container,
        {
          flexDirection: 'column',
        },
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshingScreen} onRefresh={onScrollControler}/>
      }
      >
      <View style={styles.titleContent}>
        <View style={styles.section}>
             <CustomSearchBar navigation={navigation}/>
      </View>
      </View>
          
      <View style={styles.titleContent}>
        <Text style={styles.title}>Trending</Text>
        <View style={styles.section}>
             <TrendingMovies navigation={navigation}/>
      </View>
      </View>
      
      <View style={styles.titleContent}>
         {/* <Text style={styles.title}>WatchList</Text> */}
         <View>
        {/* <WatchList/> */}
      </View>
      </View>
     
     
      <View style={styles.titleContent}>
      {/* <Text style={styles.title}>Favorite</Text> */}
      <View>
        {/* <FavoriteList/> */}
      </View>
      </View>
      
      <View style={styles.titleContent}>
      <Text style={styles.title}>Popular movies</Text>
      <View>
        <MovieList navigation={navigation}/>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,    
    padding: 10,
  },
  titleContent:{
    flex:1,
    marginTop:5,
    alignContent:'flex-start',
  },
  title:{
    fontSize:25,
    fontWeight:'bold',
    color:'black',
    marginBottom:15
  },
  section:{
  }
});

export default Homescreen;