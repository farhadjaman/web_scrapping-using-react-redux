
const store = require('./app/store')
const { fetchPosts } = require('./features/posts/postSlice');
const { fetchRelatedPosts } = require('./features/relatedPost/relatedPostSlice');

// subscribe to state changes
store.subscribe(() => {
  console.log("<-----User Asked post------>")
  console.log(store.getState().post);
  console.log("<----Related Post----->")
  store.getState().relatedPosts.posts.forEach((item) => {
    console.log(item)
  })
});

store.dispatch(fetchPosts(store.dispatch));
