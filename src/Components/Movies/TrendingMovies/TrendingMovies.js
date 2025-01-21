import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchTrendingMovies,
  image500,
} from '../../../Store/Features/Actions/movies-actions';
import Loader from '../../UI/Loader';

const TrendingMovies = () => {
  const dispatch = useDispatch();
  const [Refreshing, setRefreshing] = useState(false)
  const {trendingMovies, loading, error} = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  const {width, height} = Dimensions.get('window');
  
  const renderMovieCard = ({item}) => (
    <View
      style={[
        styles.cardContainer,
        {width: width * 0.8, height: height * 0.4},
      ]}>
      <ImageBackground
        source={{uri: image500(item.poster_path)}}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        >
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
            <Text style={styles.movieTiming}>{'2h 30m'}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  const onTrendingMoviesRefresh =()=>{
    setRefreshing(true)
    fetchTrendingMovies(trendingMovies.page + 1)

    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <Text>Error fetching movies: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={trendingMovies}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMovieCard}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        refreshing={Refreshing} onRefresh={onTrendingMoviesRefresh}  colors={['#d41616']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#fff',
    // paddingVertical: 20,
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

export default TrendingMovies;
