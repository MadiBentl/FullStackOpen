import blogService from '../services/blogs'

const commentsReducer = (state=[], action) => {
  switch(action.type){
    case 'GET_COMMENTS':
      return action.data.comments
    default:
      return state
  }
}

export const getComments = (blog) => {
  return async dispatch => {
    const comments = await blogService.getComments(blog)
    dispatch({ type: 'GET_COMMENTS', data: { comments } })
  }
}

export default commentsReducer
