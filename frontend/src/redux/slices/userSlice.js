import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosRequest, getConfig } from "../../helpers/config"

const initialState = {
    isLoggedIn: false,
    token: '',
    user: null,
    chosenPlan: null
}

//decrement user hearts
export const decrementUserHearts = createAsyncThunk (
    'decrement/hearts',
    async (token) => {
        const response = await axiosRequest.get('decrement/user/hearts', getConfig(token))
        return response.data.user
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.user = action.payload
        },
        setLoggedInOut(state, action) {
            state.isLoggedIn = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        },
        setChosenPlan(state, action) {
            state.chosenPlan = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(decrementUserHearts.pending, () => {
            console.log('trying to decrement user hearts')
        })
        builder.addCase(decrementUserHearts.fulfilled, (state, action) => {
          state.user = action.payload
        })
        builder.addCase(decrementUserHearts.rejected, () => {
          console.log('decrement hearts rejected')
        })
    },
})

const userReducer = userSlice.reducer

export const { setCurrentUser, setLoggedInOut, setToken, setChosenPlan } = userSlice.actions

export default userReducer