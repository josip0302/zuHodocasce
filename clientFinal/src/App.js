import React from 'react';
import { useEffect,useState } from 'react';
import {BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom';
import ZapocniPrijavu from './components/zapocniPrijavu';
import Admin from './components/admin';
import './App.css';
function App(){
  const [backendData,setBackendData]=useState([{}])

 
  return(
    <React.StrictMode>
    <div className="App">
        <header className="App-header">
            <h1>Prijava na Hodočašće</h1>
            <Router>
             <Routes>
               <Route path='/korisnik' element = {<ZapocniPrijavu />}></Route>
               <Route path='/admin' element = {<Admin />}></Route>
             </Routes>
            </Router>
        </header>
    </div>
    </React.StrictMode>
  )
}

export default App;