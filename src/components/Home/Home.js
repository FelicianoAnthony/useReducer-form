// import React, { useContext, useEffect } from 'react';
import React from 'react';
import {SidebarContext} from '../../contexts/SidebarContext';
// import {AuthContext} from '../../contexts/AuthContext';
import Home2 from './Home2'
import './Home.css'



class Home extends React.Component {

  // static contextType can ONLY be used in class component 
  /* goes "up the component tree" to find a Provider and get data in value property from Provider that was found ... 
  and attaches it to a context property inside this component
  */
  // static contextType = SidebarContext;
      
    
  render() {
    // const  { sidebar } = this.context;
    return (
      <SidebarContext.Consumer>
        {(sidebarContext) => {
          return (
            // <div className={sidebar ? 'home-menu active' : 'home-menu'}>
            <div className={sidebarContext.sidebar ? 'home-menu active' : 'home-menu'}>
              <h1 className='home-header'> This is Home component </h1>
              <Home2/>
            </div>
          )
        }}
      </SidebarContext.Consumer>  
    );
  }
}
export default Home



// const Home = (props) => {

//   console.log('inside home')

//   const {sidebar} = useContext(SidebarContext)

//   // const {auth, readCookie} = useContext(AuthContext)


//   // React.useEffect(() => {
//   //   console.log(`Home.js - inside useEffect  auth=${auth}`)
//   //   readCookie();
//   // })


//   return (
//     <div className={sidebar ? 'home-menu active' : 'home-menu'}>
//       <h1> this is home component </h1>
//       <Home2/>
//   </div>
//   ) 
// }

// export default Home;
