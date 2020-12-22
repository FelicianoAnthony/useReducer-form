import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../../components/Home/Home';
import Pmm from '../../components/Pmm/Pmm';
import Val from '../../components/Val/Val';
import Navbar from '../../components/Navbar/Navbar';
import LoginForm from '../Form';

import SidebarContextProvider from '../../contexts/SidebarContext';
import {AuthContext} from '../../contexts/AuthContext';



const Routes = () => {

  const {readCookie,form} = React.useContext(AuthContext)
  const auth = form.loggedIn

  console.log('inside routes no cookie')

  React.useEffect(() => {
    console.log('inside routes readCookie')
    readCookie();
  },[])

  return (
    <Switch>
        <ProtectedLogin path='/login' component={LoginForm} auth={auth}/> 
        <SidebarContextProvider>
          <Navbar/>
          <ProtectedRoute path='/home' component={Home} auth={auth}/>
          <ProtectedRoute path='/pmm' component={Pmm} auth={auth}/>
          <ProtectedRoute path='/val' component={Val} auth={auth}/>
        </SidebarContextProvider>
    </Switch>
  )
}


const ProtectedRoute = ({auth, component: Component,...rest}) => {

  // console.log(`auth protected route ${JSON.stringify(auth)}`)
  return  (
  <Route
    {...rest}
    render= {() => auth ?(
      <Component/>
    ) :
      (
        <Redirect to='/login'/>
      )
    }
  />
  )
}


const ProtectedLogin = ({auth, component: Component,...rest}) => {

  // const history = useHistory()

  // console.log(`auth protected route ${JSON.stringify(auth)}`)
  return  (
  <Route
    {...rest}
    render= {() => !auth ?(
      <Component/>
    ) :
      (
        <Redirect to='/home'/>
      )

    }
  />
  )
}

export default Routes
