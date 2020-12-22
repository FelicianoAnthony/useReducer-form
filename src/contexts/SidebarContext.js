import React, {createContext, useState} from 'react'; 


export const SidebarContext = createContext();

const SidebarContextProvider = (props) => {

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <SidebarContext.Provider value={{sidebar, showSidebar}}> 
      {props.children}
    </SidebarContext.Provider>
  )
}

export default SidebarContextProvider