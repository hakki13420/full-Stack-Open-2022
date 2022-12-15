import axios from 'axios'
const baseUrl = '/api/blogs'
let token=null

const setToken=(newToken) => {
  token=`bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog=async (blog) => {
  console.log('token   ', token)
  const options={
    headers:{
      Authorization:token
    }
  }
  const res=await axios.post('http://localhost:3001/api/blogs',blog, options)
  return res.data
}

const updateBlog=async (id,blog) => {
  const options={
    headers:{
      Authorization:token
    }
  }
  const res=await axios.put(`http://localhost:3001/api/blogs/${id}`,blog,options)
  return res.data
}

const removeBlog=async (id) => {

  const options={
    headers:{
      Authorization:token
    }
  }

  const res=await axios.delete(`http://localhost:3001/api/blogs/${id}`,options)
  return res.data
}

export default { getAll, createBlog, setToken, updateBlog, removeBlog }