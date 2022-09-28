import { parseISO } from "date-fns";

export const convertEventsToDateEvents = (events=[])=>{
    
    return events.map(event=>{
        event.finalDate=parseISO(event.finalDate);
        event.initialDate=parseISO(event.initialDate)
    return event
    })
    ;
}