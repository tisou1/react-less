import {  configureStore, Store } from '@reduxjs/toolkit'
// import counterReducer from './reducers/counterSlice'
import { 
  counterReducer,
  booleanSlice
} from './reducers'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    booleaner: booleanSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store
// store.subscribe(( ) => console.log(store.getState()))


// store.dispatch(incremented())

// store.dispatch(incremented())

// store.dispatch(decremented())


