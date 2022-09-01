const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')
const { default: fetch } = require('node-fetch')


const initialState = {
  posts: [],
  loading: false,
  error: ""
}

//create Async Thunk
const fetchRelatedPosts = createAsyncThunk("relatedPosts/fetchRelatedPosts", async (query) => {
  const url = 'https://jsonplaceholder.typicode.com/posts?title_like=' + query
  const response = await fetch(url)
  const relatedPosts = await response.json();
  // console.log(relatedPosts)
  return relatedPosts
})

const relatedPostSlice = createSlice({
  name: 'relatedPosts',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedPosts.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    })
    builder.addCase(fetchRelatedPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.posts = action.payload;
    })
    builder.addCase(fetchRelatedPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.posts = "";
    })
  }

})

module.exports = relatedPostSlice.reducer;
module.exports.fetchRelatedPosts = fetchRelatedPosts;