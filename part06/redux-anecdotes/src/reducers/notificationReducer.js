import { createSlice } from '@reduxjs/toolkit'

const initialState={
  message:'',
  time:0
}

const notificationSlice=createSlice({
  name:'notification',
  initialState,
  reducers:{
    putMessage:(state, action) => {
      console.log('action notifffffff---',action)
      return {
        message:action.payload.message,
        time:action.payload.time
      }
    }
  }
})

export const { putMessage }=notificationSlice.actions
export default notificationSlice.reducer