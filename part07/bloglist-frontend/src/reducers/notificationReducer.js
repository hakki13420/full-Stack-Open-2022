import { createSlice } from '@reduxjs/toolkit'

const initialState={ success:'',errors:[] }

const notificationSlice= createSlice({
  name:'notification',
  initialState,
  reducers:{
    setSuccessNotif(state,action){
      return { ...state,success:action.payload }
    },
    setErrorNotif(state,action){
      return { ...state,error:[...action.payload] }
    },
    resetSuccessNotif(state){
      return { ...state,success:'' }
    },
    resetErrorNotif(state){
      return { ...state,errors:[] }
    }
  }
})


export default notificationSlice.reducer
export const { setErrorNotif, setSuccessNotif, resetSuccessNotif, resetErrorNotif } =notificationSlice.actions

