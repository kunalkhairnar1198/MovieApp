import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = 'ee685f440549ded82e3e87a8eed2f321';
const BASE_URL = 'https://api.themoviedb.org/3';

//movies detail url api 
// https://api.themoviedb.org/3/movie/539972?language=en-US

export const image500 =path=>path?`https://image.tmdb.org/t/p/w500/${path}`:null

const trendingMoviesEndpoint= `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
const popularMoviesEndpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}` 

const moviesDetailsEndpoint =id => `${BASE_URL}/movie/${id}?api_key=${API_KEY}`

//Fetching all the trending movies
export const fetchTrendingMovies = createAsyncThunk('movies/fetchTrendingMovies',
    async()=>{
        const response = await axios.get(trendingMoviesEndpoint);
        // console.log('Data fetched:', response.data);
        return response.data.results;
    }

);


export const fetchPopularMovies = createAsyncThunk('movies/fetchPopularMovies',
    async()=>{
        const response = await axios.get(popularMoviesEndpoint);
        // console.log('popular movies fetch', response.data)
        return response.data.results;
    }
)


export const addWatchListToAsyncStorage = createAsyncThunk('movies/addWatchListToAsyncStorage',
    async (data)=>{
        console.log('data addwatchlist',data)
     try{
        // const watchListData =
         await AsyncStorage.setItem('watchList',JSON.stringify(data))
            // console.log('---store watch data in action--',watchListData)
        }catch(error){
                console.log(error)
        }
    }
)

export const fetchWatchListToAsyncStorage = createAsyncThunk('movies/fetchWatchListToAsyncStorage',
    async()=>{
        try {
            const response = await AsyncStorage.getItem('watchList')
            const data = JSON.parse(response)
            // console.log('-----store data----',data)
            return data
            // if(!data){
               
            // }            
        } catch (error) {
            console.log(error)
        }

    }
)

export const fetchMoviesDetails = createAsyncThunk('movies/fetchMoviesDetails',
    async(id)=>{
        // console.log('add id for Movies details', id)
    
            const response = await axios.get(moviesDetailsEndpoint(id));
            // console.log('api fetch succesfully',response.data)
            return response.data
        
    }
)



// ${BASE_URL}/trending/movie/${'today'}?api_key=${API_KEY}