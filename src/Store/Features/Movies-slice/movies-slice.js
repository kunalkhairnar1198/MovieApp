import { createSlice } from "@reduxjs/toolkit"
import { addWatchListToAsyncStorage, fetchMoviesDetails, fetchPopularMovies, fetchTrendingMovies, fetchWatchListToAsyncStorage } from "../Actions/movies-actions";

const initialState = {
    trendingMovies:[],
    popularMovies:[],
    movieWatchList:[],
    favoriteMovieList:[],
    moviesDetailList:'',
    pages:1,
    watchRead:0,
    FavRead:0,
    loading:'false',
    error:null,
}

const moviesSlice = createSlice({
    name:'movies',
    initialState,   
    reducers:{
      addMoviesToWatchList(state, action) {

        const existingMovie = state.movieWatchList.find((item) => item.id === action.payload.id);
        
        if (!existingMovie) {
            state.movieWatchList = [...state.movieWatchList, action.payload];

            state.watchRead = state.watchRead + 1;
            console.log('updated movieWatchlist list',state.movieWatchList)
        }

       },
       removeWatchlist(state, action){
        const indexToRemove = state.movieWatchList.findIndex(obj => obj.id === action.payload)
        state.movieWatchList.splice(indexToRemove ,1 )
        // console.log(state.movieWatchList)
        //   console.log(action.payload)
       },
       addMoviesToFavoriteList(state, action){
        const existingMovie = state.favoriteMovieList.find((item) => item.id === action.payload.id);
        
        if (!existingMovie) {
            state.favoriteMovieList = [...state.favoriteMovieList, action.payload];

            state.FavRead = state.FavRead + 1;
            console.log('updated list', state.favoriteMovieList)
        }
       },
       removeToFavList(state, action){
        const indexToRemove = state.favoriteMovieList.findIndex(obj => obj.id === action.payload)
        state.favoriteMovieList.splice(indexToRemove ,1 )
        // console.log(state.favoriteMovieList)
        //   console.log(action.payload)
       },

      clearWathlistItem(state, action){
        state.movieWatchList=[]
        state.favoriteMovieList=[]
        state.trendingMovies=[]
        state.FavRead = 0;
        state.watchRead = 0
      }


    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTrendingMovies.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
          state.loading = false;
          // state.trendingMovies = action.payload;
          // console.log(action.payload)
          // state.trendingMovies =[...state.trendingMovies, action.payload]
          if(action.payload.pages == 1){
            state.trendingMovies = action.payload.movies
          }else{
            state.loading = false
            state.trendingMovies=[
              ...state.trendingMovies,
              ...action.payload.movies
            ]
            // console.log('merge', state.trendingMovies)
          }
          state.pages = action.payload.pages
          state.loading = false
            // console.log('trending movies', state.trendingMovies)
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

        //fetch movie details
        .addCase(fetchMoviesDetails.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchMoviesDetails.fulfilled, (state, action) => {
          state.loading = false; 
          state.moviesDetailList =action.payload;
          state.watchRead = 0 ;
          state.FavRead = 0;
        })
        .addCase(fetchMoviesDetails.rejected, (state, action) => {
          state.loading = false; 
          state.error = action.error.message; 
        });
        
    },
  });

export const moviesActions = moviesSlice.actions;
export default moviesSlice.reducer