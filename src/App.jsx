import {  Routes, Route } from "react-router-dom"

import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import Applications from "./Pages/Applications"
import AddApplication from "./Pages/AddApplication"
import ViewApplication from "./Pages/ViewApplication"
import EditApplication from "./Pages/EditApplication"
import Analytics from "./Pages/Analytics"

import "./App.css"

function App() {

  return (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<Home />} />
    <Route path="/applications" element={<Applications />} />
    <Route path="/add-application" element={<AddApplication />} />
    <Route path="/applications/:id" element={<ViewApplication />} />
    <Route path="/edit-application/:id" element={<EditApplication />} />
    <Route path="/analytics" element={<Analytics />} />
  </Routes>
)
  
}

export default App