import { uiSlice } from "./ui/uiSlice";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { calendarSlice } from "./calendar/CalendarSlice";

export const store = configureStore({
    reducer:{
        ui:uiSlice.reducer,
        calendar:calendarSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})