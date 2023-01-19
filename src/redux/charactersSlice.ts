import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../redux/store'
import type { Character } from '../types/Character'

export interface charactersState {
  charactersData: Array<Character> | null
  filterCharacters: Array<Character> | null
}

const initialState: charactersState = {
  charactersData: null,
  filterCharacters: null
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      state.charactersData = action.payload
    },
    clearCharacters: (state) => {
      state.charactersData = null
    },

    setFilterCharacters: (state, action) => {
      state.filterCharacters = action.payload
    },
    clearFilterCharacters: (state) => {
      state.filterCharacters = null
    }
  }
})

export const { setCharacters, clearCharacters, setFilterCharacters, clearFilterCharacters } = charactersSlice.actions
export const selectCharacters = (state: RootState) => state.characters.charactersData
export const selectFilterCharacters = (state: RootState) => state.characters.filterCharacters
export default charactersSlice.reducer
