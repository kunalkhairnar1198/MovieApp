import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = 'ee685f440549ded82e3e87a8eed2f321';
const BASE_URL = 'https://api.themoviedb.org/3';
// https://api.themoviedb.org/3/movie/popular?api_key=ee685f440549ded82e3e87a8eed2f321
export const image500 =path=>path?`https://image.tmdb.org/t/p/w500/${path}`:null

const trendingMoviesEndpoint= `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
const popularMoviesEndpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}` 

//Fetching all the trending movies
export const fetchTrendingMovies = createAsyncThunk('movies/fetchTrendingMovies',
    async()=>{
        const response = await axios.get(trendingMoviesEndpoint);
        console.log('Data fetched:', response.data);
        return response.data.results;
    }

);


export const fetchPopularMovies = createAsyncThunk('movies/fetchPopularMovies',
    async()=>{
        const response = await axios.get(popularMoviesEndpoint);
        console.log('popular movies fetch', response.data)
        return response.data.results;
    }
)



// ${BASE_URL}/trending/movie/${'today'}?api_key=${API_KEY}