import React, {useContext} from 'react';
import './Val.css'


import {SidebarContext} from '../../contexts/SidebarContext';

function Val() {

  const {sidebar} = useContext(SidebarContext)

  return (
    <div className={sidebar ? 'val-menu active' : 'val-menu'}> 
      <h1 className="val-header"> Virtual Application Lever </h1>
    </div>
  )
} 

export default Val