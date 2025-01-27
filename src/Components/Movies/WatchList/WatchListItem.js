import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {  image500 } from '../../../Store/Features/Actions/movies-actions';

const WatchListItem = ({  originalTitle, overview, posterPath, voteAverage, releaseDate }) => {


    return (
      <Card>
        <View style={styles.container}>
          <Image
            style={styles.imageStyle}
            source={{ uri: image500(posterPath) }}
            resizeMode="cover"
          />
          <View style={styles.textSection}>
            <Text style={styles.moviesTitle} numberOfLines={1}>
              {originalTitle}
            </Text>
            <Text style={styles.moviesDescription} numberOfLines={5}>
              {overview}
            </Text>
            <View style={styles.bottomSection}>
              <Text style={styles.movieDate}>Date: {releaseDate}</Text>
              <Text style={styles.movieRating}>
                IMDb rating: {voteAverage ? voteAverage.toFixed(1) : 'N/A'}
              </Text>
            </View>
            <View style={styles.buttonSection}>
              <Button onPress={() => console.log('Favorite clicked')}>
                <Fontisto name="favorite" size={25} color='white' />
              </Button>
              <Button onPress={() => console.log('Heart clicked')}>
                <AntDesign name="heart" size={25} color="white" />
              </Button>
            </View>
          </View>
        </View>
      </Card>
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
})

export default WatchListItem