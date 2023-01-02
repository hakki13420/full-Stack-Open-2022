import { createSlice } from '@reduxjs/toolkit'
//import blogs from '../services/blogs'
import blogServices from '../services/blogs'


const initialState=[]

const blogSlice=createSlice({
  name:'blogs',
  initialState,
  reducers:{
    getAllBlogs(state, action){
      return [...action.payload]
    },
    addBlog(state, action){
      return [...state,action.payload]
    },
    modifyBlog(state, action){
      console.log('payload     ',action.payload)
      const { id, blog }=action.payload
      console.log('AAAAAAAAAAAAA',id,blog)
      return [...state.map(el => el.id===id?blog:el)]
    },
    deleteBlog(state,action){
      const  id =action.payload
      return [...state.filter(el => el.id!==id)]
    },
    ascSort(state){
      return [...state.slice().sort((a,b) => a.likes<b.likes?-1:1)]
    },
    descSort(state){
      return [...state.slice().sort((a,b) => a.likes<b.likes?1:-1)]
    },
    commentBlog(state, action){
      console.log('action comment',action.payload)
      return [...state.map(el => el.id===action.payload.id?action.payload:el)]
    }
  }
})

export const initiliazeBlogs=() => {
  return async (dispatch) => {
    const blogs=await blogServices.getAll()
    console.log('blogs init', blogs)
    dispatch(getAllBlogs(blogs))
  }
}

export const appendBlog=(blog) => {
  return async (dispatch, getState) => {
    blogServices.setToken(getState().users.token)
    console.log('token from redux', getState().users.token)
    await blogServices.createBlog(blog)
    //dispatch(addBlog(newBlog))
    dispatch(initiliazeBlogs())
  }
}

export const updateBlog=({ id,blog }) => {
  return async (dispatch, getState) => {
    blogServices.setToken(getState().users.token)
    const updatedBlog=await blogServices.updateBlog(id, blog)
    console.log('updateBloçg ', updatedBlog)
    dispatch(modifyBlog({ id, blog:updatedBlog }))

  }
}

export const eraseBlog=(id) => {
  return (dispatch, getState) => {
    blogServices.setToken(getState().users.token)
    blogServices.removeBlog(id)
      .then((res) => dispatch(deleteBlog(id,res)))

  }
}

export const commentingBlog=(id,comment) => {
  return async (dispatch) => {
    console.log('comment reducer', id,comment)
    const blogCommented=await blogServices.commentBlog(id, comment)
    console.log('comment reducer 2', blogCommented)
    dispatch(commentBlog(blogCommented))
  }
}


export const { getAllBlogs, addBlog, modifyBlog, deleteBlog, ascSort, descSort, commentBlog } =blogSlice.actions
export default blogSlice.reducer
