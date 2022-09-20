import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
        _id:new Date().getTime(),
        title:'cumple jefe',
        notes:'comprar pastel',
        start: new Date(),
        end: addHours(new Date(),2),
        bgColor: '#a2d2ff',
        user:{
          _id:'123',
          name:'Seba'
        }
      
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events:[tempEvent],
        activeEvent:null
    },
    reducers: {
        onSetActiveEvent:(state,{payload})=>{
          state.activeEvent=payload;
        }
    }
});


export const { onSetActiveEvent } = calendarSlice.actions