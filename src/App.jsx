import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Register from "./pages/Register"
import Repair from "./pages/HomeRepair"
import UserRepair from "./pages/UserRepair"
import AdminCreateUser from "./pages/admin/AdminCreateUser"
import UserTable from "./pages/admin/UserTable"
import Dashboard from "./pages/admin/Dashboard"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="register" element={ <Register /> } />
        <Route path="repair" element={ <Repair /> } />
        <Route path="user-repair" element={ <UserRepair /> } />
        <Route path="admin" element={ <UserTable /> } />
        <Route path="admin/create-user" element={ <AdminCreateUser /> } />
        <Route path="admin/dashboard" element={ <Dashboard /> } />
      </Routes>
    </BrowserRouter>
  )
}
export default App