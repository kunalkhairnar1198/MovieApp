import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import TrendingMovies from '../Components/Movies/TrendingMovies/TrendingMovies'
import WatchList from '../Components/Movies/WatchList/WatchList';
import FavoriteList from '../Components/Movies/FavoriteList/FavoriteList';
import MovieList from '../Components/Movies/MovieList/MovieList';
import Card from '../Components/UI/Card';

const Homescreen = () => {
  return (
    <ScrollView
      style={[
        styles.container,
        {
          flexDirection: 'column',
        },
      ]}>
        <View>
          
        </View>
      <View style={styles.titleContent}>
        <Text style={styles.title}>Trending</Text>
        <View style={styles.section}>
             <TrendingMovies/>
      </View>
      </View>
      
      <View style={styles.titleContent}>
         <Text style={styles.title}>WatchList</Text>
         <View>
          <Card>
        <WatchList/>

          </Card>
      </View>
      </View>
     
     
      <View style={styles.titleContent}>
      <Text style={styles.title}>Favorite</Text>
      <View>
        <Card>
        <FavoriteList/>
        </Card>
      </View>
      </View>
      
      <View style={styles.titleContent}>
      <Text style={styles.title}>AllMovies</Text>
      <View>
        <Card>
        <MovieList/>
        </Card>
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
        // flex:1,
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

export default Homescreen