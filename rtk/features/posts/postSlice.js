const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')
const { default: fetch } = require('node-fetch')
const { fetchRelatedPosts } = require('../relatedPost/relatedPostSlice')


const initialState = {
  post: {},
  loading: false,
  error: ""
}

//create Async Thunk
const fetchPosts = createAsyncThunk("post/fetchPosts", async (dispatch) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  const post = await response.json();
  const query = post.title.replaceAll(' ', '&title_like=');
  dispatch(fetchRelatedPosts(query))
  return post
})

const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.post = action.payload;
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.post = "";
    })
  }

})




module.exports = postSlice.reducer;
module.exports.fetchPosts = fetchPosts;