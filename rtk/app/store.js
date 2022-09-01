const { configureStore } = require("@reduxjs/toolkit")
const { createLogger } = require('redux-logger')
const PostReducer = require("../features/posts/postSlice")
const relatedFetchPostsReducer = require("../features/relatedPost/relatedPostSlice")

const logger = createLogger();
const store = configureStore({
  reducer: {
    post: PostReducer,
    relatedPosts: relatedFetchPostsReducer
  }
  // ,
  // middleware: (getDefaultmiddleware) => (
  //   getDefaultmiddleware().concat(logger)
  // )
})

module.exports = store