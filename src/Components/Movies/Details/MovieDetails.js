import React, {useCallback, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  fetchMoviesDetails,
  image500,
} from '../../../Store/Features/Actions/movies-actions';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../UI/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Button from '../../UI/Button';
import { moviesActions } from '../../../Store/Features/Movies-slice/movies-slice';

const MovieDetails = ({route, navigation}) => {
  const {item} = route.params;
  // console.log('--->',item)
  const dispatch = useDispatch();
  const {moviesDetailList, loading, error} = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(fetchMoviesDetails(item.id));
  }, [item]);

  useEffect(() => {
    const hideHeader = navigation.getParent()?.setOptions({headerShown: false});
    if (moviesDetailList) {
      navigation.setOptions({title: `${moviesDetailList.original_title}`});
    } else {
      <Text>Loading...</Text>;
    }
    return () => {
      navigation.getParent()?.setOptions({headerShown: true});
    };
  }, [navigation, item, moviesDetailList]);

  if (loading || !moviesDetailList) {
    return <Loader />;
  }

   const onFavoriteSaveHandler = item => {
      dispatch(moviesActions.addMoviesToFavoriteList(item));
      // dispatch(moviesActions.clearWathlistItem())
    }
  
    const onWatchlistSaveHandler = 
      item => {
        // console.log('item', item)
        dispatch(moviesActions.addMoviesToWatchList(item));
      }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: image500(moviesDetailList.backdrop_path)}}
        style={styles.imageBackground}
        resizeMode="cover">
        <View style={styles.imageWrapper}>
          <Image
            source={{uri: image500(moviesDetailList.poster_path)}}
            style={styles.posterImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.cardContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.textContainer}>
              <Text style={styles.originalTitle}>
                {moviesDetailList.original_title}
              </Text>
              <Text style={styles.description}>
                {moviesDetailList.overview}
              </Text>
              <View style={styles.detailsSection}>
                <Text style={styles.statusSection}>
                  Status: {moviesDetailList.status}
                </Text>
                <Text style={styles.imdbSection}>
                  IMDB Rating: {moviesDetailList.vote_average.toFixed(2)}
                </Text>
              </View>
              <View style={styles.detailsSection}>
                <Text style={styles.releaseDate}>
                  Release Date: {moviesDetailList.release_date}
                </Text>
                <Text style={styles.language}>
                  Original Language:{' '}
                  {moviesDetailList.original_language.toUpperCase()}
                </Text>
              </View>
              <View style={styles.buttonSection}>
              <Button onPress={() => onWatchlistSaveHandler(item)}>
                <Fontisto name="favorite" size={35} color='white' />
              </Button>
              <Button onPress={() =>  onFavoriteSaveHandler(item)}>
                <AntDesign name="heart" size={35} color="white" />
              </Button>
            </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9b9696',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  imageWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },

  posterImage: {
    width: 250,
    height: 350,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 6.27,
    elevation: 10,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#e9ddddc5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  textContainer: {
    // alignItems: 'center',
    textAlign: 'auto',
  },
  originalTitle: {
    textAlign: 'auto',
    // backgroundColor: 'yellow',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign: 'justify',
    lineHeight: 24,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    // marginTop: 20,
  },
  statusSection: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'yellow',
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  imdbSection: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'yellow',
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1d0f0f',
    marginBottom: 8,
  },
  language: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent:'flex-end',
    gap: 15,
  },
});

export default MovieDetails;
