import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'booleaner',
  initialState: {
    value: false,
  },
  reducers: {
    change: (state) => {
      state.value = !state.value
    },
  },
})

// 生成action的方法
export const { change } = counterSlice.actions
// 对应action的reducer
export default counterSlice.reducer
