import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = 'ee685f440549ded82e3e87a8eed2f321';
const BASE_URL = 'https://api.themoviedb.org/3';

//movies detail url api 
// https://api.themoviedb.org/3/movie/539972?language=en-US
// https://api.themoviedb.org/3/trending/movie/day?id=${}?api_key

export const image500 =path=>path?`https://image.tmdb.org/t/p/w500/${path}`:null

const trendingMoviesEndpoint= `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
const popularMoviesEndpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}` 


// trending movies page
// https://api.themoviedb.org/3/trending/movie/day?api_key=ee685f440549ded82e3e87a8eed2f321&page=2

const trendingMoviesPagesEndpoint= pages =>`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${pages}`
const moviesDetailsEndpoint =id => `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
const searchMovieEndpoint = params => `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${params}`

    // https://api.themoviedb.org/3/search/movie?api_key=ee685f440549ded82e3e87a8eed2f321&query=pu

// const searchMoviesEndpoint=`${BASE_URL}/search/movie?api_key=${API_KEY}`


// export const fetchPagesTrendingMovies =()=>{
//     async(pages)=>{
//         const response = await axios.get(trendingMoviesPagesEndpoint)
//         console.log(response.data.results)
//         return response.data.results
//     }
// }

//Fetching all the trending movies
export const fetchTrendingMovies = createAsyncThunk('movies/fetchTrendingMovies',
    async(pages = 1)=>{
        const response = await axios.get(trendingMoviesPagesEndpoint(pages));
        // console.log('Data fetched:', response.data, pages);
        return { movies: response.data.results, pages };    

    }

);


export const fetchPopularMovies = createAsyncThunk('movies/fetchPopularMovies',
    async()=>{
        const response = await axios.get(popularMoviesEndpoint);
        // console.log('popular movies fetch', response.data)
        return response.data.results;
    }
)


// export const addWatchListToAsyncStorage = createAsyncThunk('movies/addWatchListToAsyncStorage',
//     async (data)=>{
//         console.log('data addwatchlist',data)
//      try{
//         // const watchListData =
//          await AsyncStorage.setItem('watchList',JSON.stringify(data))
//             // console.log('---store watch data in action--',watchListData)
//         }catch(error){
//                 console.log(error)
//         }
//     }
// )

// export const fetchWatchListToAsyncStorage = createAsyncThunk('movies/fetchWatchListToAsyncStorage',
//     async()=>{
//         try {
//             const response = await AsyncStorage.getItem('watchList')
//             const data = JSON.parse(response)
//             // console.log('-----store data----',data)
//             return data
//             // if(!data){
               
//             // }            
//         } catch (error) {
//             console.log(error)
//         }

//     }
// )

export const fetchMoviesDetails = createAsyncThunk('movies/fetchMoviesDetails',
    async(id)=>{
        // console.log('add id for Movies details', id)
    
            const response = await axios.get(moviesDetailsEndpoint(id));
            // console.log('api fetch succesfully',response.data)
            return response.data
        
    }
)

export const searchMovies = createAsyncThunk('movies/searchMovies',
    async(params)=>{
        console.log(params)
        const response = await axios.get(searchMovieEndpoint(params))
        console.log(response.data)
        return response.data
    }
)



// ${BASE_URL}/trending/movie/${'today'}?api_key=${API_KEY}