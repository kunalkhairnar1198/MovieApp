import { createSlice } from "@reduxjs/toolkit"
import { fetchPopularMovies, fetchTrendingMovies } from "../Actions/movies-actions";

const initialState = {
    trendingMovies:[],
    popularMovies:[],
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
          console.log('popular movies fetch pending')
        })
        .addCase(fetchPopularMovies.fulfilled, (state,action)=>{
          state.loading = false;
          state.popularMovies = action.payload
          console.log('fetching succesfully popular movies data', state.popularMovies)
        })
        .addCase(fetchPopularMovies.rejected,(state,action)=>{
          state.loading = false;
          state.error = action.payload
          console.log('Fetching popular movies data')
        })

        
    },
  });

export const moviesActions = moviesSlice.actions;
export default moviesSlice.reducer