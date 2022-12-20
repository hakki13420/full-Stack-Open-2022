import { createSlice } from '@reduxjs/toolkit'

const initialState={
  filter:''
}

const filterSlice=createSlice({
  name:'filter',
  initialState,
  reducers:{
    doFilter:(state, action) => {
      return {
        filter:action.payload
      }
    }
  }

})

export const{ doFilter }=filterSlice.actions
export default filterSlice.reducer