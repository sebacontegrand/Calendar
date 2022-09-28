import { useSelector, useDispatch} from 'react-redux'
import Swal from 'sweetalert2'
import calendarApi from '../api/calendarApi'
import { convertEventsToDateEvents } from '../helpers/convertEventToDate'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/CalendarSlice'


export const useCalendarStore = () => {
   const dispatch=useDispatch()
   const{events,activeEvent} = useSelector(state=>state.calendar)
   const {user}=useSelector(state=>state.auth)

    const setActiveEvent = (calendarEvent)=>{
      dispatch( onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent=async(calendarEvent)=>{
    console.log("calendarEvent",{calendarEvent})

    try {
      if(calendarEvent.id){
        await calendarApi.put(`/events/${calendarEvent.id}`,calendarEvent)
        dispatch(onUpdateEvent({...calendarEvent,user}))
        return;
      }
      const {data}= await calendarApi.post('/events',calendarEvent)
        console.log({data})
        dispatch(onAddNewEvent({...calendarEvent,id:data.evento.id,user}))
    } catch (error) {
      console.log(error);
      Swal.fire('error al guardar',error.response.data.msg, 'Error')
    }
      
    }     
    const startDeletingEvent=()=>{
      dispatch(onDeleteEvent())
    }

const startLoadingEvents=async ()=>{
  try {
    const {data}=await calendarApi.get('/events')
    const events = convertEventsToDateEvents(data.eventos)
    dispatch(onLoadEvents(events))
    console.log(events)
  } catch (error) {
    console.log('error cargando eventos')
    console.log(error)
  }
}

  return {
    events,
    activeEvent,
    hasEventSelected:!!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
    

  }
}
