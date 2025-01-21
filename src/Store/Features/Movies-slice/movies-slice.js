import { createSlice } from "@reduxjs/toolkit"
import { addWatchListToAsyncStorage, fetchMoviesDetails, fetchPopularMovies, fetchTrendingMovies, fetchWatchListToAsyncStorage } from "../Actions/movies-actions";

const initialState = {
    trendingMovies:[],
    popularMovies:[],
    movieWatchList:[],
    favoriteMovieList:[],
    moviesDetailList:'',
    loading:'false',
    error:null,
}

const moviesSlice = createSlice({
    name:'movies',
    initialState,   
    reducers:{

    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTrendingMovies.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
          state.loading = false;
          state.trendingMovies = action.payload;
        })
        .addCase(fetchTrendingMovies.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        
        .addCase(fetchPopularMovies.pending, (state)=>{
          state.loading = true
          state.error = null
          // console.log('popular movies fetch pending')
        })
        .addCase(fetchPopularMovies.fulfilled, (state,action)=>{
          state.loading = false;
          state.popularMovies = action.payload
          console.log('fetching succesfully popular movies data', state.popularMovies)
        })
        .addCase(fetchPopularMovies.rejected,(state,action)=>{
          state.loading = false;
          state.error = action.payload
          // console.log('Fetching popular movies data')
        })

        //watchlistFetch
        .addCase(fetchWatchListToAsyncStorage.pending,(state)=>{
          state.loading = true
          state.error = null
        })
        .addCase(fetchWatchListToAsyncStorage.fulfilled,(state, action)=>{
          state.loading = false
          state.movieWatchList = action.payload

          console.log('state watchlist', state.movieWatchList)
        })
        .addCase(fetchWatchListToAsyncStorage.rejected,(state, action)=>{
          state.loading = false
          state.error = action.payload
        })
        .addCase(addWatchListToAsyncStorage.fulfilled,(state, action)=>{
          state.loading=false
          // const updatedWatchList = [...state.movieWatchList, action.payload]
          // state.movieWatchList.push(action.payload)
          // console.log('--add to async storage-', action.payload)
        })

        //fetch movie details
        .addCase(fetchMoviesDetails.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchMoviesDetails.fulfilled, (state, action) => {
          state.loading = false; 
          state.moviesDetailList =action.payload; 
        })
        .addCase(fetchMoviesDetails.rejected, (state, action) => {
          state.loading = false; 
          state.error = action.error.message; 
        });
        
    },
  });

export const moviesActions = moviesSlice.actions;
export default moviesSlice.reducer