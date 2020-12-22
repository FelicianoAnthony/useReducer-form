import React, { useContext } from 'react';
import {AuthContext} from '../../contexts/AuthContext'
import './Home2.css'

const Home3 = (props) => {

  const { form } = useContext (AuthContext)

  return (
    <div>
      <h6 className='home2-header'> This component (Home3) is nested in Home2 </h6>
      <p className='home3-p'> Username from AuthContext Provider in Home3 - {form.username}
      </p>
  </div>
  ) 
}

export default Home3;