import React, { useCallback } from 'react'
import { Image, StyleSheet, Text,   View } from 'react-native';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {  fetchMoviesDetails, image500 } from '../../../Store/Features/Actions/movies-actions';
import { useDispatch, useSelector } from 'react-redux';
import { moviesActions } from '../../../Store/Features/Movies-slice/movies-slice';
import { useRoute } from '@react-navigation/native';

const WatchListItem = ({ navigation, item }) => {
    const dispatch = useDispatch()
    const route = useRoute()
    // console.log(route)

    const switchToNavigateDetail=( item)=>{  
        navigation.navigate('WatchDetails',{item})
        // console.log(item.id)
       dispatch(fetchMoviesDetails(item.id))
    }

        const removeWatchlistItem =(id)=>{
          dispatch(moviesActions.removeWatchlist(id))
// console.log(id)
       }
      const removeFavoriteList =(id)=>{
        dispatch(moviesActions.removeToFavList(id))
  // console.log(id)
      }

      const onFavoriteSaveHandler = useCallback(item => {
          dispatch(moviesActions.addMoviesToFavoriteList(item));
          // dispatch(moviesActions.clearWathlistItem())
        }, []);
      
      const onWatchlistSaveHandler = useCallback(
        item => {
          // console.log('item', item)
          dispatch(moviesActions.addMoviesToWatchList(item));
        },[dispatch]);

   

    return (
      <Button onPress={()=>switchToNavigateDetail(item)}>
      <Card>
        <View style={styles.container}>
          <Image
            style={styles.imageStyle}
            source={{ uri: image500(item.poster_path) }}
            resizeMode="cover"
          />
          <View style={styles.textSection}>
            <Text style={styles.moviesTitle} numberOfLines={1}>
              {item.original_title}
            </Text>
            <Text style={styles.moviesDescription} numberOfLines={5}>
              {item.overview}
            </Text>
            <View style={styles.bottomSection}>
              <Text style={styles.movieDate}>Date: {item.release_date}</Text>
              <Text style={styles.movieRating}>
                IMDb rating: {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
              </Text>
            </View>
            <View style={styles.buttonSection}>
              <Button style={{backgroundColor:'yellow', padding:5, borderRadius:10, marginBottom:5}} onPress={route.name == 'Watchlist' ? () => removeWatchlistItem(item.id) : ()=>removeFavoriteList(item.id)}>
                <Text style={styles.text}>{route.name == 'Watchlist' ? ('+ Remove Watchlist') : ('+ Remove FavoriteList')}</Text> 
              </Button>
             
              {route.name == 'Favoritelist' ? ( 
              <Button onPress={()=>onWatchlistSaveHandler(item)}>
                 <Fontisto name="favorite" size={25} color='white' />
              </Button>): 
              (<Button onPress={() => onFavoriteSaveHandler(item)}>
                <AntDesign name="heart" size={25} color="white" />
              </Button>
            )}
            </View>
          </View>
         
        </View>
      </Card>
      </Button> 
    );
}
const styles = StyleSheet.create({
    container: {
      flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      },
      imageStyle: {
        width: 130,
        height: 180,
        borderRadius: 10,
        marginHorizontal: 10,
      },
      textSection: {
        flex: 1,
        paddingHorizontal: 10,
      },
      moviesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#090909',
        backgroundColor:'white',
        marginBottom: 5,
      },
      moviesDescription: {
        fontSize: 14,
        color: '#ddd',
        marginBottom: 10,
      },
      bottomSection: {
        flexDirection: 'column',
        marginBottom: 10,
      },
      movieRating: {
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor:'#d4c04d',
        color: 'black',
      },
      movieDate: {
        fontSize: 14,
        backgroundColor:'black',
        color: '#c0a914',
      },
      buttonSection: {
        flexDirection: 'row',
        justifyContent:'flex-end',
        gap: 10,
      },
      text:{
        fontWeight:'bold',
        color:'red'
      }
})

export default WatchListItem