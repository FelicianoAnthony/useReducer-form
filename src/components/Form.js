import React, { useContext } from 'react'; 
import { AuthContext } from '../contexts/AuthContext'
import Cookies from 'js-cookie';
import * as authReducerConstants from '../constants';


const LoginForm = () => {

  const { form, dispatch } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()
    Cookies.set('user', form.username)
    dispatch({type: authReducerConstants.LOGIN, loggedIn: true})
  }

  return (
      <form style={{
        maxWidth: '500px',
        minWidth: '300px',
        maxHeight: '700px',
        width: '30%',
        height: '60%',
        margin: '100px auto',
        // backgroundColor: '#1ac2ff',
        backgroundColor: '#3f51b5',
        borderRadius: '25px'
      }} onSubmit={handleLogin}>
        <FormHeader/>
        <Form/>
      </form>
  )
}

const FormHeader = () => (
  <h2 style={{
    textAlign: 'center',
    fontFamily: 'open sans, sans-serif',
    padding: '2rem 0',
    margin: '0',
    fontSize: '2rem',
  }}>Login</h2>
)

const Form = () => {

  const { dispatch } = useContext(AuthContext)

  const handleUsernameChange = (e) => {
    dispatch({type: authReducerConstants.CHANGE_USERNAME, username: e.target.value})
  }

  const handlePasswordChange = (e) => {
    dispatch({type: authReducerConstants.CHANGE_PASSWORD, password: e.target.value})
  }

  return (
    <div>
      <FormInput description="Username" placeholder="Enter your username" type="text" onChange={handleUsernameChange}/>
      <FormInput description="Password" placeholder="Enter your password" type="password" onChange={handlePasswordChange}/>
      <FormButton title="Login"/>
    </div>
  )
}

const FormInput = props => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2rem',
    maxWidth: '100%',
  }}>
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} onChange={props.onChange}/>
  </div>  
);

const FormButton = props => (
  <div style={{

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '2rem',
      maxWidth: '100%',
      paddingBottom: '1.5rem'
  }}>
    <button>{props.title}</button>
  </div>
);

export default LoginForm