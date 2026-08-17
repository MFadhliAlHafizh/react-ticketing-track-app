import { Route, Routes } from "react-router-dom"
import { UserLayout } from "./layouts/UserLayout"
import { AdminLayout } from "./layouts/AdminLayout"
import { AuthLayout } from "./layouts/AuthLayout"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { AdminDashboard } from "./pages/admin/AdminDashboard"
import { UserDashboard } from "./pages/user/UserDashboard"

function App() {
  return (
    <div>
      <Routes>

        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

      </Routes>      
    </div>
  )
}

export default App
