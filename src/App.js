import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Admin from './pages/Admin';
import Missing from './pages/Missing';
import Unauthorized from './pages/Unauthorized';
import RequireAuth from './pages/RequireAuth';
import Users from './pages/Users';
import Profile from './pages/Profile';
import ConfirmEmail from './pages/ConfirmEmail';
import { Routes, Route } from 'react-router-dom';
import Quiniela from './pages/Quiniela';


const ROLES = {
  'User': 'User',
  'Admin': 'Admin'
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="confirmEmail" element={<ConfirmEmail />} />
        <Route path="quiniela" element={<Quiniela />} />

        {/* restricted routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.SAdmin]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin, ROLES.SAdmin]} />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.SAdmin]} />}>
          <Route path="users" element={<Users />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;