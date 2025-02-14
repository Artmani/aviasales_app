import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import filtersReducer from './reducers/filters/filtersSlice'
import sortReducer from './reducers/sort/sortSlice'
import ticketsReducer from './reducers/tickets/ticketsSlice'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    sort: sortReducer,
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
})
