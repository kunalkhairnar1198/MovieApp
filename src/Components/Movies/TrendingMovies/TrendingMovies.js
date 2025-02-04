import React, { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesDetails, fetchTrendingMovies, image500 } from '../../../Store/Features/Actions/movies-actions';
import Loader from '../../UI/Loader';

const TrendingMovies = ({navigation}) => {
  const dispatch = useDispatch();
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { trendingMovies, pages, loading, error } = useSelector((state) => state.movies);

  // console.log(pages, trendingMovies)

  useEffect(() => {
    dispatch(fetchTrendingMovies(1));
  }, [dispatch]);


  const fetchNextPage = async() => {
    try {
      if (isFetchingMore || loading) return; 
      setIsFetchingMore(true);
    
      await dispatch(fetchTrendingMovies(pages + 1 ))
      await setIsFetchingMore(false)
    } catch (error) {
        await  setIsFetchingMore(false)
    }
  };


  const switchToTrendingMovieDetailsScreen =(item)=>{
    navigation.navigate('Moviedetails', {item});
    // console.log('detail',item.id)
     dispatch(fetchMoviesDetails(item.id));
  }

  const { width, height } = Dimensions.get('window');

  const renderMovieCard = useMemo(
    () => ({ item }) => (
      <View
        style={[
          styles.cardContainer,
          { width: width * 0.8, height: height * 0.4 },
        ]}
      >
        <ImageBackground
          source={{ uri: image500(item.poster_path) }}
          style={styles.imageBackground}
          resizeMode="stretch"
          imageStyle={styles.imageStyle}
        >
          <TouchableOpacity onPress={() => switchToTrendingMovieDetailsScreen(item)}>
            <View style={styles.overlay} />
            <View style={styles.textContainer}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.movieDescription} numberOfLines={3}>
                {item.overview}
              </Text>
              <View style={styles.bottomSection}>
                <Text style={styles.movieRating}>
                  IMDb: {item.vote_average.toFixed(1)}
                </Text>
                <Text style={styles.movieTiming}>{"2h 30m"}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    ),
    [width, height, navigation] 
  );

  if (loading && pages === 1) {
    return <Loader />;
  }

  if (error) {
    return <Text>Error fetching movies: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <VirtualizedList
      data={trendingMovies}
      initialNumToRender={5} 
      getItem={(data, index) => data[index]}
      getItemCount={(data) => data.length}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderMovieCard}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatListContent}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.1}
      ListFooterComponent={isFetchingMore ? <Loader /> : null}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  cardContainer: {
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
  },
  imageStyle: {
    borderRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  movieDescription: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 10,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieRating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  movieTiming: {
    fontSize: 14,
    color: '#fff',
  },
});

export default React.memo(TrendingMovies);
