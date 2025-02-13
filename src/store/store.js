import { configureStore } from '@reduxjs/toolkit'

import filtersReducer from './reducers/filters/filtersSlice'
import sortReducer from './reducers/sort/sortSlice'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    sort: sortReducer,
  },
})
