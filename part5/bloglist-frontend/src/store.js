import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import commentsReducer from './reducers/commentsReducer'

const reducer = combineReducers({
  login: loginReducer,
  blogs: blogReducer,
  notification: notificationReducer,
  comments: commentsReducer
})
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

console.log('store', store.getState())

export default store
