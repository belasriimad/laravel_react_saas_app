import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    wordDetails: null,
    message: ''
}

export const wordDetailsSlice = createSlice({
    name: 'wordDetails',
    initialState,
    reducers: {
        setWordDetails(state, action) {
            state.wordDetails = action.payload
        },
        setMessage(state, action) {
            state.message = action.payload
        }
    }
})

const wordDetailsReducer = wordDetailsSlice.reducer

export const { setWordDetails, setMessage } = wordDetailsSlice.actions

export default wordDetailsReducer