import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchMoviesDetails,
  fetchPopularMovies,
  image500,
} from '../../../Store/Features/Actions/movies-actions';
import Button from '../../UI/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Loader from '../../UI/Loader';
import {moviesActions} from '../../../Store/Features/Movies-slice/movies-slice';

const MovieList = ({navigation}) => {
  const dispatch = useDispatch();

  const {popularMovies,   loading, error} = useSelector(state => state.movies);



  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  const onFavoriteSaveHandler = useCallback(item => {
    dispatch(moviesActions.addMoviesToFavoriteList(item));
    // dispatch(moviesActions.clearWathlistItem())
  }, []);

  const onWatchlistSaveHandler = useCallback(
    item => {
      // console.log('item', item)
      dispatch(moviesActions.addMoviesToWatchList(item));
    },
    [dispatch],
  );

  const switchToDetailPageHandler = item => {
    navigation.navigate('Moviedetails', {item});
    // console.log(item.id);
    dispatch(fetchMoviesDetails(item.id));
  };

  const {width, height} = Dimensions.get('window');

  const renderPopularMoviesCard = ({item}) => {
    return (
      <View
        style={[
          styles.cardContainer,
          {width: width * 0.4, height: height * 0.3},
        ]}>
        <ImageBackground
          source={{uri: image500(item.poster_path)}}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}>
          <TouchableOpacity onPress={() => switchToDetailPageHandler(item)}>
            <View style={styles.textContainer}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <View style={styles.bottomSection}>
                <Text style={styles.movieRating}>
                  IMDb: {item.vote_average.toFixed(1)}
                </Text>
                <Text style={styles.movieTiming}>{'2h 30m'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.buttonSection}>
            <Button onPress={() => onWatchlistSaveHandler(item)}>
              <Fontisto name="favorite" size={25} color='white' />
            </Button>
            <Button onPress={() => onFavoriteSaveHandler(item)}>
              <AntDesign name="heart" size={25} color="white" />
            </Button>
          </View>
        </ImageBackground>
      </View>
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching movies: {error}</Text>
      </View>
    );
  }

  if (!popularMovies || popularMovies.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No movies available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={popularMovies}
        keyExtractor={item => item.id.toString()}
        renderItem={renderPopularMoviesCard}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 15,
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
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000',
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default React.memo(MovieList);
