import { combineReducers } from 'redux'
import posts from 'posts'
import signin from 'signin'
import user from 'user'
import toast from 'toast'
import createPost from 'createPost'
import highlightPost from 'highlightPost'
import progressBar from 'progressBar'

export default combineReducers({
  posts,
  signin,
  user,
  toast,
  createPost,
  highlightPost,
  progressBar
})
