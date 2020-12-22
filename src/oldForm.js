import React, {createContext, useState, useContext} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";



const NavBar = (props) => {

  return (
    <header style={{
      display: 'flex', 
      alignItems: 'center',
      background: 'rebeccapurple', 
      color: 'white',
      fontFamily: 'Helvetica',
      fontWeight: 300,
      paddingLeft:'10px'
    }}>
        <div style={{
          marginRight: 'auto', 
          fontSize: '150%', 
          verticalAligh: 'middle'
        }}>Logged in User - {props.location.state.username}</div>
        <Route path="/dashboard/about" component={About} exact />
        {/* <About/> */}
        <Contact/>
        <Help/> 
    </header>
  )
};

const NavBarContext = createContext();
const NavBarContextProvider = (props) => {

  const user = props.children.props.location.state.username
  console.log(props)

  
  return (
    <NavBarContext.Provider value={{ user }}> 
    {props.children} 
    {/* displays any children that ThemeContext wraps */}
    </NavBarContext.Provider>
);

}

const NavBarWithProvider = (props) => (
  <NavBarContextProvider>
    <NavBar {...props}/>
  </NavBarContextProvider>
)

const About = () => {

return (
  <div style={{
    padding: '16px 16px',
    cursor: 'pointer',
    verticalAlign: 'middle'
  }}>About Us
    <div> 

      stuff
    </div>
  </div>
)
}

const Contact = () =>  {

return (
  <div style={{
    padding: '16px 16px',
    cursor: 'pointer',
    verticalAlign: 'middle'
  }}>Contact</div>
)
}

const Help = () => {

return (
  <div style={{
    padding: '16px 16px',
    cursor: 'pointer',
    verticalAlign: 'middle'
  }}>Help</div> 
)
}



function App() {
  return (

  <div> 
    <Switch> 
      <Route path="/" component={LoginFormWithProvider} exact />
      <Route path="/dashboard" component={NavBarWithProvider} exact />
    </Switch>
  </div>

  );
}




const LoginFormWithProvider = (props) => (
  <LoginContextProvider>
    <LoginForm {...props}/>
  </LoginContextProvider>
)

const LoginContext = createContext();
const LoginContextProvider = (props) => {
/* 2. return a Context Provider that will eventually wrap child components, giving them access to 
State and any functions to manipulate State defined in Context */

const history = useHistory();

const [user, setUser] = useState('')
const [password, setPassword] = useState('')

const handleUserChange = (e) => {
setUser(e.target.value)
}

const handlePasswordChange = (e) => {
setPassword(e.target.value)
}

const handleSubmit = (e) => {
e.preventDefault()
console.log(user, password)
history.push({
  pathname: '/dashboard', 
  state: {username: user}
})
}


return (
<LoginContext.Provider value={{ user, password, handleUserChange, handlePasswordChange, handleSubmit}}> 
{props.children} 
{/* displays any children that ThemeContext wraps */}
</LoginContext.Provider>
);
}



const LoginForm = () => {

  const { handleSubmit} = useContext(LoginContext)

  return (
      <form style={{
        maxWidth: '500px',
        minWidth: '300px',
        maxHeight: '700px',
        width: '30%',
        height: '60%',
        margin: '100px auto',
        backgroundColor: '#1ac2ff',
        borderRadius: '25px'
      }} onSubmit={handleSubmit}>
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

  const { handlePasswordChange, handleUserChange } = useContext(LoginContext)
  return (
    <div>
      <FormInput description="Username" placeholder="Enter your username" type="text" onChange={handleUserChange}/>
      <FormInput description="Password" placeholder="Enter your password" type="password" onChange={handlePasswordChange}/>
      <FormButton title="Log in"/>
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




export default App;