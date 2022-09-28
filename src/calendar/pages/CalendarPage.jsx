import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { NavBar } from "../component/NavBar"
import { FabAddNew } from '../component/FabAddNew'
import { CalendarBox } from '../component/CalendarBox'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarModal } from '../component/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FabDelete } from '../component/FabDelete'
import { useAuthStore } from '../../hooks/useAuthStore'


const locales = {
  'en-US': enUS,
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})



export const CalendarPage = () => {
  const {user}=useAuthStore();
  const {events,setActiveEvent, startLoadingEvents} = useCalendarStore();
  const { openDateModal } = useUiStore()
  const [lastView,setLastView]=useState(localStorage.getItem('lastView')||'week');
  const eventStyleGetter=(event,initialDate,finalDate,isSelected)=>{
const isMyEvent =(user.uid ===event.user._id) || (user.uid ===event.user.uid)

    const style={
      backgroundColor: isMyEvent?'#347CF7':"",
      borderRadius:'0px',
      opacity:0.8,
      color:'white'
    }
    return{
      style
    }
    }
    
    const onDoubleClick=(event)=>{
console.log({doubleClick:event})
openDateModal()
    }
    const onSelect=(event)=>{
      console.log({click:event})
      setActiveEvent(event)
          }
    const onViewChange=(event)=>{
      localStorage.setItem('lastView',event)
      setLastView(event)
                }

    useEffect(() => {
      startLoadingEvents();
    }, [])
  return (
    <>
    <NavBar/>
    <Calendar
     localizer={localizer}
     events={events}
     defaultView={lastView}
     startAccessor="initialDate"
     endAccessor="finalDate"
     style={{ height:'calc(100vh - 80px)'}}
     eventPropGetter={eventStyleGetter}
     components={{event:CalendarBox}}
     onDoubleClickEvent={onDoubleClick}
     onSelectEvent={onSelect}
     onView={onViewChange}
   />
   <CalendarModal/>
   <FabDelete/>
   <FabAddNew/>
   
    </>
  )
}
