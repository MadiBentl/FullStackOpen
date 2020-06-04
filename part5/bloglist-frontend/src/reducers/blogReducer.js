import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
  switch(action.type){
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return state
    case 'DELETE_BLOG':
      return state
    case 'UPVOTE_BLOG':
      return state
    default:
      return state
  }
}

export const getInitialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INIT_BLOGS', data: blogs })
  }
}
export default blogReducer
