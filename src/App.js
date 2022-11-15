import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Chatpage from './pages/Chatpage'
import Login from './pages/Login'
import Register from './pages/Register'
import Alluser from './pages/Allusers'

//import { Redirect } from 'react-router-dom'


const App = () => {
	return (
		<div>
      <BrowserRouter>
          <Routes>
            <Route path="/chat" element={<Chatpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/alluser" element={<Alluser />} />
         
          </Routes>
        </BrowserRouter>,
		</div>
	)
}

export default App

/*
<Redirect from="/" to="/login" />
*/