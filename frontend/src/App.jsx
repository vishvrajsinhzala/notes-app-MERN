import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateNote from "./pages/createNote"
import AllNotes from "./pages/allnotes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/all-notes" element={<AllNotes />} />
      </Routes>   
    </BrowserRouter>
  ) 
}

export default App
