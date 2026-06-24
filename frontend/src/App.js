import Home from './Home.js';
import Nav from './Nav.js';
import Actions from './Actions.js';
import Submit from './Submit.js';
import Getticket from './Getticket.js';
import Updateticket from './Updateticket.js';
import {Routes,Route} from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [list,setList] = useState([]);
  
  const load = async () => {
    const res = await axios.get("http://localhost:5000/get");
    setList(res.data);
  }

  useEffect( () => {load()},[] );

  return (
    
    <>
    <Nav/>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/actions' element={<Actions/>}>
        <Route path='submit' element={<Submit list={list}  load={load}/>}/>
        <Route path='getticket' element={<Getticket list={list}  load={load}/>}/>
        <Route path='updateticket' element={<Updateticket list={list}  load={load}/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;
