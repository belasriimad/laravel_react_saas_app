import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import userReducer from '../slices/userSlice'
import wordDetailsReducer from '../slices/wordDetailsSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

//create the route reducer
const rootReducer = combineReducers({
    word: wordDetailsReducer,
    user: userReducer
})

//create the persist config
const persistConfig = {
    key: 'root',
    storage,
}

//create the persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

//create the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})

//create the persistor
const persistor = persistStore(store)

//export the persistor and the store
export {
    store,
    persistor
}