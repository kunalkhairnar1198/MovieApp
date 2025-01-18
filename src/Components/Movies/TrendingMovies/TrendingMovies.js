import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Card from '../../UI/Card'

const TrendingMovies = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const movies = [
      {
        name: 'Inception',
        description: 'A thief with the ability to enter people’s dreams takes on the ultimate heist.',
        rating: '8.8',
        timing: '2h 28m',
      },
      {
        name: 'The Dark Knight',
        description: 'Batman raises the stakes in his war on crime with the help of Lt. Gordon and Harvey Dent.',
        rating: '9.0',
        timing: '2h 32m',
      },
      {
        name: 'Interstellar',
        description: 'A team of explorers travels through a wormhole in space to save humanity.',
        rating: '8.6',
        timing: '2h 49m',
      },
    ];


    const nextSlide = (n) => {
      let newIndex = slideIndex + n;
      if (newIndex >= movies.length) newIndex = 0;
      if (newIndex < 0) newIndex = movies.length - 1;
      setSlideIndex(newIndex);
    };


    const setCurrentSlide = (index) => {
      setSlideIndex(index);
    };
  

  return (
    <View style={styles.slides}>
      <Card>
      <Text style={styles.moviesname}>{movies[slideIndex].name}</Text>
      <Text style={styles.moviesdescription}>{movies[slideIndex].description}</Text>


      <View style={styles.bottomSection}>
            <Text style={styles.movieRating}>IMDb: {movies[slideIndex].rating}</Text>
            <Text style={styles.movieTiming}>{movies[slideIndex].timing}</Text>
      </View>
      </Card>

      <View style={styles.indicators}>
          <TouchableOpacity style={styles.navButton} onPress={() => nextSlide(-1)}>
            <Text style={styles.navText}>&#10094;</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => nextSlide(1)}>
            <Text style={styles.navText}>&#10095;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dotsContainer}>
          {movies.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                slideIndex === index && styles.activeDot,
              ]}
              onPress={() => setCurrentSlide(index)}
            />
          ))}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({

  slides:{
  width:'100%',
  height:250,
  position:'relative'
  },
  moviesname:{
    fontSize:10,
    fontWeight:'bold',
    marginBottom:10,
    color:'#333'
  },
  moviesdescription:{
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  bottomSection:{
    position:'absolute',
    bottom:15,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20
  },
  movieRating:{
    fontSize:16,
    fontWeight:'bold',
    color:"#333"
  },
  movieTiming:{
    fontSize:15,
    color:'#555'
  },
  indicators:{
    position:'absolute',
    top:'50%',
    left:0,
    right:0,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:10
  },
  navButton:{
    backgroundColor:'transparent',
    borderRadius:50,
    padding:10
  },
  navText:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25,
    width: '100%',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333',
  },


})

export default TrendingMovies