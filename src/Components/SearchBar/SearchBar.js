import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  VirtualizedList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {image500} from '../../Store/Features/Actions/movies-actions';
import useDebounce from '../../Hooks/useDebounce';
import axios from 'axios';
import Card from '../UI/Card';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../UI/Button';

const SearchBar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState('');
  const [result, setIsResult] = useState([]);

  const [debounceQuery, cancelDebounce] = useDebounce(searchData, 500);
  // console.log('first')

  const FetchResult = useCallback(async searchData => {
    if (searchData) {
      // dispatch(searchMovies(searchData))
      const Response = await axios(
        `https://api.themoviedb.org/3/search/movie?api_key=ee685f440549ded82e3e87a8eed2f321&query=${searchData}`,
      );
      console.log('-----', Response.data)
      setIsResult(Response.data.results);
    }
  }, []);

  useEffect(() => {
    FetchResult(debounceQuery);
    setIsResult([]);
    return () => {
      cancelDebounce();
    };
  }, [debounceQuery]);

  // console.log('result data api call', result)

  useEffect(() => {
    const hideHeader = navigation.getParent()?.setOptions({headerShown: false});
    navigation.setOptions({title: 'Search'});
    return () => {
      navigation.getParent()?.setOptions({headerShown: true});
    };
  }, [navigation]);

  const renderSearchList = ({item}) => {
    const {title, overview, poster_path, vote_average, release_date} = item;
    return (
      <Card>
        <View style={styles.containerList}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: poster_path
                ? image500(poster_path)
                : 'placeholder_image_url',
            }}
            resizeMode="cover"
          />
          <View style={styles.textSection}>
            <Text style={styles.moviesTitle} numberOfLines={1}>
              {title || 'No Title Available'}
            </Text>
            <Text style={styles.moviesDescription} numberOfLines={5}>
              {overview || 'No description available.'}
            </Text>
            <View style={styles.bottomSection}>
              <Text style={styles.movieDate}>
                Date: {release_date || 'N/A'}
              </Text>
              <Text style={styles.movieRating}>
                IMDb rating: {vote_average ? vote_average.toFixed(1) : 'N/A'}
              </Text>
            </View>
            <View style={styles.buttonSection}>
              <Button
                title="Favorite"
                onPress={() => console.log('Favorite clicked')}>
                <FontAwesome name="bookmark-o" size={30} color="white" />
              </Button>
              <Button
                title="Heart"
                onPress={() => console.log('Heart clicked')}>
                <AntDesign name="hearto" size={30} color="red" />
              </Button>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="search" style={styles.searchIcon} size={20} color="#000" />
        <TextInput
          style={[styles.textInput, styles.shadowprop]}
          placeholder="Search Movies..."
          value={searchData}
          onChangeText={text => setSearchData(text)}
        />
      </View>
      <View>
        <VirtualizedList
          data={result || []}
          renderItem={renderSearchList}
          keyExtractor={(item, index) =>
            item?.id ? item.id.toString() : index.toString()
          }
          getItemCount={data => data.length}
          getItem={(data, index) => data[index] || null}
          contentContainerStyle={{marginVertical: 10}}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your watchlist is empty.</Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#312222',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fffcfc',
  },
  searchIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  //searchlist item css
  containerList: {
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
    backgroundColor: 'white',
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
    backgroundColor: '#d4c04d',
    color: 'black',
  },
  movieDate: {
    fontSize: 14,
    backgroundColor: 'black',
    color: '#c0a914',
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  //virtualizelist
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
});

export default SearchBar;
