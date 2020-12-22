import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
  import React, {createContext, useState, useContext} from 'react';
  import { useHistory } from "react-router-dom";
  
  
  // Each logical "route" has two components, one for
  // the sidebar and one for the main area. We want to
  // render both of them in different places when the
  // path matches the current URL.
  
  // We are going to use this route config in 2
  // spots: once for the sidebar and once in the main
  // content section. All routes are in the same
  // order they would appear in a <Switch>.
  const routes = [
    {
      path: "/home",
      exact: true,
      main: () => <Home/>
    },
    {
      path: "/bubblegum",
      main: () => <Bubblegum/>
    },
    {
      path: "/shoelaces",
      main: () => <Shoelaces/>
    }
  ];
  
  const Home = () => {
    return (
      <h2>Home</h2>
    )
  }
  
  const Bubblegum = () => {
    return (
    <h2>Bubblegum</h2>
    )
  }
  
  const Shoelaces = () => {
    return (
    <h2>Shoelaces</h2>
    )
  }
  
  
  
  
  
  
  
  export default function SidebarExample() {
    return (
  
    
      <Router>
        <div style={{ display: "flex" }}>
          <div
            style={{
              padding: "10px",
              width: "40%",
              background: "#f0f0f0"
            }}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/bubblegum">Bubblegum</Link>
              </li>
              <li>
                <Link to="/shoelaces">Shoelaces</Link>
              </li>
            </ul>
  
            <Switch>
              {routes.map((route, index) => (
                // You can render a <Route> in as many places
                // as you want in your app. It will render along
                // with any other <Route>s that also match the URL.
                // So, a sidebar or breadcrumbs or anything else
                // that requires you to render multiple things
                // in multiple places at the same URL is nothing
                // more than multiple <Route>s.
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  // children={<route.sidebar />}
                />
              ))}
            </Switch>
          </div>
  
          <div style={{ flex: 1, padding: "10px" }}>
            <Switch>
              {routes.map((route, index) => (
                // Render more <Route>s with the same paths as
                // above, but different components this time.
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main />}
                />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
  
  
  // form 
  
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
  