import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../redux/store'
import type { Location } from '../types/Location'

interface LocationResult {
  info: {
    count: number
    next: String
    pages: number
    prev?: String
  }
  results: Array<Location>
}

export interface LocationState {
  locationData: LocationResult | null
}

const initialState: LocationState = {
  locationData: null
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.locationData = action.payload
    }
  }
})

export const { setLocation } = locationSlice.actions

export const selectLocation = (state: RootState) => state.location.locationData
export default locationSlice.reducer
