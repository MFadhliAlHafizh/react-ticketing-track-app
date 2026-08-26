import { Route, Routes } from "react-router-dom"
import { UserLayout } from "./layouts/UserLayout"
import { AdminLayout } from "./layouts/AdminLayout"
import { AuthLayout } from "./layouts/AuthLayout"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { AdminDashboard } from "./pages/admin/AdminDashboard"
import { UserDashboard } from "./pages/user/UserDashboard"
import { TicketList } from "./pages/admin/TicketList"
import { AdminTicketDetail } from "./pages/admin/AdminTicketDetail"
import { UserTicketDetail } from "./pages/user/UserTicketDetail"
import { TicketCreate } from "./pages/user/TicketCreate"
import { RoleRoute } from "./routes/roleRoute"

function App() {
  return (
    <div>
        <Routes>

            {/* Authentication Routes */}
            <Route element={<RoleRoute guestOnly />}>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Route>

            {/* User Routes */}
            <Route element={<RoleRoute allowedRole="user" />}>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<UserDashboard />} />
                    <Route path="ticket/:code" element={<UserTicketDetail />} />
                    <Route path="ticket/create" element={<TicketCreate />} />
                </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<RoleRoute allowedRole="admin" />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="ticket" element={<TicketList />} />
                    <Route path="ticket/:code" element={<AdminTicketDetail />} />
                </Route>
            </Route>

        </Routes>     
    </div>
  )
}

export default App
