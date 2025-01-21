import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addWatchListToAsyncStorage, fetchPopularMovies, fetchWatchListToAsyncStorage, image500 } from '../../../Store/Features/Actions/movies-actions';
import Button from '../../UI/Button';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Loader from '../../UI/Loader';

const MovieList = ({navigation}) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation()
  const [wathchMovies, setWatchMovies] = useState([])
  const { popularMovies, loading, error } = useSelector((state) => state.movies);



  useEffect(() => {

     dispatch(fetchPopularMovies());

  }, [dispatch]);



  const onFavoriteSaveHandler =()=>{
    
    
  }

  const onWatchlistSaveHandler =(item)=>{
    // console.log(item)
        const updatedMovies =[...wathchMovies, item]
        setWatchMovies(updatedMovies)
    // console.log('updated movies',updatedMovies)

    dispatch(addWatchListToAsyncStorage(updatedMovies))
  }

  const { width, height } = Dimensions.get('window');

  const renderPopularMoviesCard = ({ item }) => {
    return (
      <TouchableOpacity 
      onPress={()=>navigation.navigate('Moviedetails', { item })}
      >
      <View
        style={[
          styles.cardContainer,
          { width: width * 0.4, height: height * 0.3 }, 
        ]}
      >
        <ImageBackground
          source={{ uri: image500(item.poster_path) }}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.textContainer}>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <View style={styles.bottomSection}>
              <Text style={styles.movieRating}>
                IMDb: {item.vote_average.toFixed(1)}
              </Text>
              <Text style={styles.movieTiming}>{'2h 30m'}</Text>
            </View>
          </View>
          <View style={styles.buttonSection}>
            <Button onPress={()=>onWatchlistSaveHandler(item)}>
              <Fontisto name="favorite" size={20} color='white' />
            </Button>
            <Button onPress={ onFavoriteSaveHandler}>
              <AntDesign name="hearto" size={20} color='white' />
            </Button>
          </View>
        </ImageBackground>
      </View>
      </TouchableOpacity>

    );
  };

  if (loading) {
    return (
      <Loader/>
    );
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
        keyExtractor={(item) => item.id.toString()}
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
    paddingBottom:15
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
  buttonSection:{
     flexDirection:'row',
     alignItems:'flex-end',
     justifyContent:'space-between',
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
    backgroundColor: '#000',
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default MovieList;
