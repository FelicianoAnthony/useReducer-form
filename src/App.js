import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import Routes from './components/Routes/Routes'
import './App.css'; 


function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <Router> 
          <Routes/>  
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App