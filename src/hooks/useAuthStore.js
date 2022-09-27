import { useDispatch, useSelector } from "react-redux"
import calendarAPI from "../api/calendarAPi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {

    
    const{status, user, errorMessage}=useSelector(state=>state.auth)
    const dispatch= useDispatch();
    const startLogin = async({email,password})=>{
        dispatch(onChecking())
        try {
            const {data}= await calendarAPI.post('/auth',{email,password})
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date',new Date().getTime())
            dispatch(onLogin({name:data.name, uid:data.uid}))
           
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || ''))
            
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
        
    }
    const startRegisterLogin = async({name,email,password,password2})=>{
        dispatch(onChecking())
        try {
            const {data}= await calendarAPI.post('/auth/new',{name,email,password,password2})
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date',new Date().getTime())
            dispatch(onLogin({name:data.name, uid:data.uid}))
           
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }

    }

    return{
        status, 
        user, 
        errorMessage,
        startLogin,
        startRegisterLogin

    }
}