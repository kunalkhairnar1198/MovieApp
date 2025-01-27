import React, { useEffect } from 'react';
import { StyleSheet, Text, View, VirtualizedList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {  image500 } from '../../../Store/Features/Actions/movies-actions';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import WatchListItem from '../WatchList/WatchListItem';
import Loader from '../../UI/Loader';

const FavoriteList = ({navigation}) => {
  const dispatch = useDispatch();
  const { favoriteMovieList = [], loading, error } = useSelector((state) => state.movies);
  console.log('fav compo', favoriteMovieList)
  
  if (loading) {
    return (
     <Loader/>
    );
  }

  if (error) {
    return (
      <SafeAreaProvider>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load watchlist. Please try again.</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <View style={styles.container}>
      <VirtualizedList
        data={favoriteMovieList}
        renderItem={({ item }) => (
          <WatchListItem
            navigation={navigation}
            id={item.id}
            originalTitle={item.original_title}
            overview={item.overview}
            posterPath={item.poster_path}
            voteAverage={item.vote_average}
            releaseDate={item.release_date}
          />
        )}
        keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index] || null}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your watchlist is empty.</Text>
          </View>
        }
      />
      </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#851f1f',
    paddingHorizontal:10,
    paddingVertical:10
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
  },
});

export default FavoriteList;
