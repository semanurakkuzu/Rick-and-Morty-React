import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './locationSlice'
import charactersReducer from './charactersSlice'
import characterReducer from './characterDetailSlice'

export const store = configureStore({
  reducer: {
    location: locationReducer,
    characters: charactersReducer,
    characterDetail: characterReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
