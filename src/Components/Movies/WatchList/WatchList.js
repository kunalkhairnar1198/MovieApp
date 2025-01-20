import React, { useEffect } from 'react';
import { StyleSheet, Text, View, VirtualizedList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWatchListToAsyncStorage, image500 } from '../../../Store/Features/Actions/movies-actions';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import WatchListItem from './WatchListItem';

const WatchList = () => {
  const dispatch = useDispatch();
  const { movieWatchList = [], loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchWatchListToAsyncStorage());
  }, [dispatch]);

  if (loading) {
    return (
      <SafeAreaProvider>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#c0a914" />
          <Text style={styles.loaderText}>Loading Watchlist...</Text>
        </View>
      </SafeAreaProvider>
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
    <SafeAreaProvider>
      <SafeAreaView>
      <VirtualizedList
        data={movieWatchList}
        renderItem={({ item }) => (
          <WatchListItem
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#c0a914',
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

export default WatchList;
