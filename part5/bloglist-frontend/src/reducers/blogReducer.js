import blogService from '../services/blogs'

const sortBlogs = (a,b) => {
  if (a.likes > b.likes){
    return -1
  } else if (a.likes > b.likes){
    return 1
  }
  return 0
}

const blogReducer = (state=[], action) => {
  switch(action.type){
    case 'INIT_BLOGS':
      return action.data.blogs.sort(sortBlogs)
    case 'CREATE_BLOG':
      return state.concat(action.data.blog)
    case 'DELETE_BLOG':
      return state.filter(blog => {
        return blog.id !== action.data.id
      })
    case 'UPVOTE_BLOG':
      return state.map(blog => {
        if (blog.id === action.data.id){
          return { ...blog, id: blog.id +1 }
        }else{
          return blog
        }
      })
    default:
      return state
  }
}

export const getInitialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INIT_BLOGS', data: { blogs } })
  }
}

export const voteBlog = (blog) => {
  return async dispatch => {
    await blogService.incrementLikes(blog)
    dispatch({ type: 'UPVOTE_BLOG', data: { id: blog.id } })
    dispatch({ type: 'SET_NOTIFICATION', data:{ msg:'you liked a blog', style:'good-notification' } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    const blogs = await blogService.removeBlog(blog)
    console.log('blogs from dispatch', blogs)
    dispatch({ type: 'DELETE_BLOG', data: { id: blog.id } })
  }
}

export const addBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({ type: 'CREATE_BLOG', data: { blog: newBlog } })
  }
}
export default blogReducer
