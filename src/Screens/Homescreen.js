import React, { useCallback, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import TrendingMovies from '../Components/Movies/TrendingMovies/TrendingMovies'
import MovieList from '../Components/Movies/MovieList/MovieList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies, fetchTrendingMovies } from '../Store/Features/Actions/movies-actions';
import CustomSearchBar from '../Components/SearchBar/CustomeSearchBar';
import Homewatchlist from '../Components/HomeWatch/Homewatchlist';
import { Screen } from '@react-navigation/elements';

const Homescreen = ({navigation}) => {
  const {movieWatchList} = useSelector(state => state.movies)
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
             {/* this navigation operations are implement for the nested deeply navigate root pages to sub tabs navigate in the screens in react native */}

           <View style={styles.sectionTitle}>
             {movieWatchList.length > 0 &&
             <> 
               <Text style={styles.title}>WatchList</Text>
                <TouchableOpacity style={[styles.title, {color:'black'}]} onPress={()=>navigation.navigate('WatchList',{screen : 'Watchlist'})}>
                  <Text style={{fontWeight:'bold', fontSize:20, marginVertical:10}} >See all</Text>  
                </TouchableOpacity>
              </>}
        </View>
        <View>
        <Homewatchlist/>
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
    flex: 1,    
    padding: 10,
  },
  titleContent:{
    flex:1,
    marginTop:5,
    // alignContent:'flex-start',
  },
  title:{
    fontSize:25,
    fontWeight:'bold',
    color:'white',
    marginBottom:15
  },
  sectionTitle:{
    flex:1,
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'space-between'
  }
});

export default Homescreen;