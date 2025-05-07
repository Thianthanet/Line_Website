import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Register from "./pages/Register"
import Repair from "./pages/HomeRepair"
import UserRepair from "./pages/UserRepair"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="register" element={ <Register /> } />
        <Route path="repair" element={ <Repair /> } />
        <Route path="user-repair" element={ <UserRepair /> } />
      </Routes>
    </BrowserRouter>
  )
}
export default App