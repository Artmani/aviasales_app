import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchSearchId = createAsyncThunk(
    'tickets/fetchSearchId',
    async () => {
        const response = await axios.get('https://aviasales-test-api.kata.academy/search')
        return response.data.searchId
    }
)

export const fetchTickets = createAsyncThunk(
    'tickets/fetchTickets',
    async (searchId, { dispatch }) => {
        let stop = false
        let allTickets = []
        // Счетчик для генерации уникальных id, если их нет
        let uniqueIdCounter = 0

        while (!stop) {
            try {
                const response = await axios.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
                const newTickets = response.data.tickets.map((ticket) => {
                    // Если id отсутствует, назначаем его
                    if (ticket.id === undefined) {
                        return { ...ticket, id: uniqueIdCounter++ }
                    }
                    return ticket
                })
                allTickets = [...allTickets, ...newTickets]
                stop = response.data.stop
                // Обновляем state с полученными билетами
                dispatch(setTickets(allTickets))
            } catch (error) {
                console.error('Error fetching tickets:', error)
                // При ошибке ждем 500 мс и пробуем снова
                await new Promise((resolve) => setTimeout(resolve, 500))
            }
        }

        return allTickets
    }
)

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        tickets: [],
        status: 'idle',
        error: null,
        allLoaded: false, // Флаг, что все данные загружены
    },
    reducers: {
        setTickets(state, action) {
            state.tickets = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchId.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchSearchId.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(fetchSearchId.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchTickets.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTickets.fulfilled, (state) => {
                state.status = 'succeeded'
                state.allLoaded = true // Все данные получены
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export const { setTickets } = ticketsSlice.actions
export default ticketsSlice.reducer
