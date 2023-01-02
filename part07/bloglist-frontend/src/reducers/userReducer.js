import { createSlice } from '@reduxjs/toolkit'
import userServices from '../services/user'

const initialState={}

const userSlice=createSlice({
  name:'users',
  initialState,
  reducers:{
    doLogin(state,action){
      return action.payload
    },
    getLoginUser(state){
      return state
    }

  }
})

export const login=(credential) => {
  return async (dispatch) => {
    console.log('credential', credential)
    const user=await userServices.login(credential)
    dispatch(doLogin(user))
    //blogService.setToken(userLogin.token)
    window.localStorage.setItem('user',JSON.stringify(user))
  }
}

export default userSlice.reducer
export const { doLogin, getLoginUser } = userSlice.actions