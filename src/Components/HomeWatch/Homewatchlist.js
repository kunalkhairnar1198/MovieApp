import React, { useCallback } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {image500} from '../../Store/Features/Actions/movies-actions';
import Button from '../UI/Button';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { moviesActions } from '../../Store/Features/Movies-slice/movies-slice';

const Homewatchlist = () => {
    const dispatch = useDispatch()
  const {movieWatchList} = useSelector(state => state.movies);
  console.log('---', movieWatchList);

  const {width, height} = Dimensions.get('window');

  const removeWatchlistItem =(id)=>{
            dispatch(moviesActions.removeWatchlist(id))
    }

  const onFavoriteSaveHandler = useCallback(item => {
    dispatch(moviesActions.addMoviesToFavoriteList(item));
    // dispatch(moviesActions.clearWathlistItem())
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={movieWatchList}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View
            style={[
              styles.cardContainer,
              {width: width * 0.5, height: height * 0.2},
            ]}>
            <ImageBackground
              imageStyle={styles.imageStyle}
              source={{uri: image500(item.backdrop_path)}}
              resizeMode="cover"
              style={styles.imageBackground}>
              <View style={styles.textSection}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <View style={styles.bottomSection}>
                  <Text style={styles.movieRating}>
                    IMDb: {item.vote_average.toFixed(1)}
                  </Text>
                  <Text style={styles.movieTiming}>{'2h 30m'}</Text>
                </View>
                <View style={styles.buttonSection}>
              <Button style={{backgroundColor:'yellow', padding:5, borderRadius:10, marginBottom:5}} onPress={()=>removeWatchlistItem(item.id)}>
                <Text style={styles.text}> + Remove Watchlist</Text> 
              </Button>
                <Button onPress={() => onFavoriteSaveHandler(item)}>
                <AntDesign name="heart" size={25} color="white" />
                </Button>
            </View>
              </View>
            </ImageBackground>
          </View>
        )}
        contentContainerStyle={styles.homeFlatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 15,
  },
  homeFlatList: {
    paddingHorizontal: 10,
  },
  textSection: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  movieTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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
  buttonSection: {
    paddingVertical:5,
    paddingHorizontal:5,
    flexDirection: 'row',
    justifyContent:'flex-start',
    gap: 10,
  },
  text:{
    fontWeight:'bold',
    color:'red'
  }
});

export default Homewatchlist;
