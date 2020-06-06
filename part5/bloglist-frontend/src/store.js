import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  login: loginReducer,
  blogs: blogReducer
})
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

console.log('store', store.getState())

export default store
