import React from 'react'
import Login from './Login'
import Task from './Task'
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Task/>}></Route>
      </Routes>
    </Router>
  )
}

export default App