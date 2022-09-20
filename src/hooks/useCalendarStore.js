import { useSelector, useDispatch} from 'react-redux'
import { onSetActiveEvent } from '../store/calendar/CalendarSlice'


export const useCalendarStore = () => {
   const dispatch=useDispatch()
    const{events,activeEvent} = useSelector(state=>state.calendar)
    const setActiveEvent = (calendarEvent)=>{
      dispatch( onSetActiveEvent(calendarEvent))
    }

  return {
    events,
    activeEvent,
    setActiveEvent
  }
}
