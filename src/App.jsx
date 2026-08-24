import { Route, Routes } from "react-router-dom"
import { UserLayout } from "./layouts/UserLayout"
import { AdminLayout } from "./layouts/AdminLayout"
import { AuthLayout } from "./layouts/AuthLayout"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { AdminDashboard } from "./pages/admin/AdminDashboard"
import { UserDashboard } from "./pages/user/UserDashboard"
import { GuestRoute } from "./routes/GuestRoute"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { AdminRoute } from "./routes/AdminRoute"
import { TicketList } from "./pages/admin/TicketList"
import { TicketDetail } from "./pages/admin/TicketDetail"
import { UserTicketDetail } from "./pages/user/UserTicketDetail"

function App() {
  return (
    <div>
        <Routes>

            {/* Guest Routes */}
            <Route element={<GuestRoute />}>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Route>

            {/* User Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<UserDashboard />} />
                    <Route path="ticket/:code" element={<UserTicketDetail />} />
                </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="ticket" element={<TicketList />} />
                    <Route path="ticket/:code" element={<TicketDetail />} />
                </Route>
            </Route>

        </Routes>     
    </div>
  )
}

export default App
