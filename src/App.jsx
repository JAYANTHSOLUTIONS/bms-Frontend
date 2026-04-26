import React from 'react'
import Home from './component/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditForm from './component/EditForm'
import EditCard from './component/EditCard'
import ProductFilter from './component/MovieFilter'
import MoviesPage from './component/MoviesPage'
import IPL from './component/IPL'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Stream from './component/stream/Stream'
import Video from './component/stream/Video'

export default function App() {
  return (
    <div>
       {/* <Navbar /> */}

      <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/edit/:id" element={<EditForm/>}/>
        <Route path="/video/:urlid" element={<Video/>}/>
        <Route path="/editall/:id" element={<EditCard/>}/>
        <Route path="/filter" element={<ProductFilter/>}/>
        <Route path="/explore/movies-chennai" element={<MoviesPage/>}/>
        <Route path="/explore/stream" element={<Stream/>}/>
        <Route path="/sports/tata-ipl-2026" element={<IPL/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
