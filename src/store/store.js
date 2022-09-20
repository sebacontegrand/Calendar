import { uiSlice } from "./ui/uiSlice";
import {configureStore} from '@reduxjs/toolkit'
import { calendarSlice } from "./calendar/CalendarSlice";

export const store = configureStore({
    reducer:{
        ui:uiSlice.reducer,
        calendar:calendarSlice.reducer
    }
})