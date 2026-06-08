import { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"

import HomePage from "../src/Page/HomePage/Home"
import EditPage from "../src/Page/HomePage/Edit/EditPage"
import CreatePage from "../src/Page/HomePage/Create/CreatePage"

export default function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/home-page" element={<HomePage/>}/>
          <Route path="/create-page" element={<CreatePage/>}/>
          <Route path="/edit-page/:id" element={<EditPage/>}/>
        </Routes>
      </div>
    </>
  )
}
