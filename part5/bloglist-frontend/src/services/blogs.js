import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createComment = async (blog, comment) => {
  console.log(blog, comment)
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, { content: comment })
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const incrementLikes = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  blog.likes += 1
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const removeBlog = async(blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { getAll, createComment, create, removeBlog, incrementLikes, setToken }
