import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../redux/store'
import type { Character } from '../types/Character'

export interface characterState {
  character: Character | null
}

const initialState: characterState = {
  character: null
}

export const characterDetailSlice = createSlice({
  name: 'characterDetail',
  initialState,
  reducers: {
    setCharacter: (state, action) => {
      state.character = action.payload
    },
    clearCharacter: (state) => {
      state.character = null
    }
  }
})

export const { setCharacter, clearCharacter } = characterDetailSlice.actions
export const selectCharacter = (state: RootState) => state.characterDetail.character
export default characterDetailSlice.reducer
