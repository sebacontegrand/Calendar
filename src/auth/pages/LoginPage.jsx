

import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';
const loginFormFields={
    loginEmail:'',
    loginPassword:''
}
const registerFormFields={ 
    registerName:'',
    registerEmail:'',
    registerPassword:'',
    registerPassword2:''
}

export const LoginPage = () => {
    const{startLogin, errorMessage, startRegisterLogin} = useAuthStore();

    const{loginEmail,loginPassword, onInputChange:onLoginInputChange} = useForm(loginFormFields);
    const{registerName,registerEmail,registerPassword,registerPassword2, onInputChange:onRegisterInputChange}=useForm(registerFormFields)
    
    const loginSubmit=(event)=>{
        event.preventDefault();
        startLogin({email:loginEmail,password:loginPassword});
    }
    const registerSubmit=(event)=>{
        event.preventDefault();
         if(registerPassword !== registerPassword2){
            Swal.fire('Error de authenticacion', 'las contrasenas deben coincidir','error');
            return;}
            startRegisterLogin({name:registerName, email:registerEmail, password:registerPassword, password2:registerPassword2})
    }

    useEffect(() => {
      if(errorMessage !==undefined)
      Swal.fire('Error en la autenticacion',errorMessage,'error');
    }, [errorMessage])

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="currentpassword"
                                className="form-control"
                                placeholder="current-password"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="newpassword"
                                className="form-control"
                                placeholder="new-password" 
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="newpassword"
                                className="form-control"
                                placeholder="repite new-password"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterInputChange} 
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}