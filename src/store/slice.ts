import { createSlice, configureStore } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name:'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: state => {
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})

//生成action的方法
export const { incremented, decremented } = counterSlice.actions
//对应action的reducer
export default counterSlice.reducer
