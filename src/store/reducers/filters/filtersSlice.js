import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  all: true,
  noStops: true,
  oneStop: true,
  twoStops: true,
  threeStops: true,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleFilter(state, action) {
      state[action.payload] = !state[action.payload]
      if (action.payload !== 'all') {
        state.all = Object.keys(state)
            .filter((key) => key !== 'all')
            .every((key) => state[key])
      }
    },
    toggleAllFilters(state) {
      const allFiltersOn = Object.values(state).every(Boolean)
      Object.keys(state).forEach((key) => {
        state[key] = !allFiltersOn
      })
    },
  },
})

export const { toggleFilter, toggleAllFilters } = filtersSlice.actions
export default filtersSlice.reducer
