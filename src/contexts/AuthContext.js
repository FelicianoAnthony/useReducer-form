// import React, {createContext, useState} from 'react';  
// import Cookies from 'js-cookie';


// export const AuthContext = createContext();

// const AuthContextProvider = (props) => {

//   const [user, setUser] = useState('');
//   const [password, setPassword] = useState('');

//   const handleUserChange = (e) => {
//     setUser(e.target.value)
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value)
//   };

//   const [auth, setAuth] = React.useState(false);
//   const readCookie = () => {
//     const user = Cookies.get('user'); 
//     if (user) {
//       setAuth(true)
//     }
//   }

//   const handleLogout = () => {
//     Cookies.remove('user')
//     setAuth(false)
//   }


//   const handleLogin = (e) => {
//     e.preventDefault()
//     Cookies.set('user', user)
//     setAuth(true)

//   };

//   return (
//     <AuthContext.Provider value={{ user, password, handleUserChange, handlePasswordChange, handleLogin, auth, readCookie, handleLogout}}> 
//       {props.children} 
//     </AuthContext.Provider>
//   );
// }

// export default AuthContextProvider 


import React, {createContext, useReducer} from 'react'
import {authReducer} from '../reducers/authReducer'
import Cookies from 'js-cookie';
import * as authReducerConstants from '../constants';

export const AuthContext = createContext() 

const initialState = {
  username: '', 
  password: '', 
  loggedIn: false
}

const AuthContextProvider = ( props ) => {

  const [form, dispatch] = useReducer(authReducer, initialState)
  
  console.log(`inside AuthContextProvider - ${JSON.stringify(form)}`)

  const readCookie = () => {
    const user = Cookies.get('user'); 
    if (user) {
      dispatch({type: authReducerConstants.LOGIN, loggedIn: true})
    }
  }

  return (
    <AuthContext.Provider value={{form, dispatch, readCookie}}> 
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider 
