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
          return { ...blog, likes: blog.likes +1 }
        }else{
          return blog
        }
      })
    case 'ADD_COMMENT':
      return state.map(blog => {
        if (blog.id === action.data.blog.id){
          return action.data.blog
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
    console.log('deleting..', blog)
    await blogService.removeBlog(blog)
    dispatch({ type: 'DELETE_BLOG', data: { id: blog.id } })
  }
}

export const addBlog = (blog, user) => {
  return async dispatch => {
    console.log(blog)
    const newBlog = await blogService.create(blog)
    newBlog.user = { id: newBlog.user, username: user }
    dispatch({ type: 'CREATE_BLOG', data: { blog: newBlog } })
  }
}

export const addComment = (blog, comment) => {
  console.log('BLOGGY', comment)
  return async dispatch => {
    const newBlog = { ...blog, comments: ['hello world']}
    console.log('reducer', newBlog)
    const updatedBlog = await blogService.createComment(newBlog)
    dispatch({ type: 'ADD_COMMENT', data: { blog: updatedBlog } })
  }
}
export default blogReducer
