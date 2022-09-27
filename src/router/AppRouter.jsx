import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { CalendarPage } from "../calendar/pages/CalendarPage"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useAuthStore } from "../hooks/useAuthStore"
import { useEffect } from "react"

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }
  return (
    <Routes>
      {(status ==='Not authenticated')
        ? (
          <>   
            <Route path="/auth/*" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to='/auth/login' />} />
          </>
        )
        : (
          <>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/*" element={<Navigate to='/' />} />
          </>)
      }

    </Routes>
  )
}
