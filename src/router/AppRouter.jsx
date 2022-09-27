import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { CalendarPage } from "../calendar/pages/CalendarPage"
import 'react-big-calendar/lib/css/react-big-calendar.css'
export const AppRouter = () => {
  
  const authStatus = 'Not-authenticated'
    return (
        <Routes>
                {(authStatus === 'Not-authenticated')
                ?<Route path="/auth/*" element={<LoginPage/>}/>
                :<Route path="/*" element={<CalendarPage/>}/>
                }
                <Route path="/*" element={<Navigate to='/auth/login'/>}/>
        </Routes>
  )
}
