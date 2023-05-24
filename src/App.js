import { Route, Routes } from 'react-router-dom';
import { useMode } from './utils/theme';
import { ThemeProvider } from '@mui/material';

import { departmentAccess, documentAccess, groupAccess, normalAccess, userAccess } from './utils/accessControl';

import RequireAuth from './utils/RequireAuth';
import Login from './pages/auth/Login';
import NotFound from './pages/NotFound';

// all
import MyRequests from './pages/me/MyRequests';
import MyRequestDetail from './pages/me/MyRequestDetail';
import CreateRequest from './pages/me/CreateRequest';

// admin
import AllRequests from './pages/admin/AllRequests';
import RequestDetail from './pages/admin/RequestDetail';
import EditRequest from './pages/admin/EditRequest';

// superadmin
import Users from './pages/superadmin/users/Users';
import UserDetail from './pages/superadmin/users/UserDetail';
import Groups from './pages/superadmin/groups/Groups';
import GroupDetail from './pages/superadmin/groups/GroupDetail';
import RightDrawer from './components/mains/RightDrawer';
import ToAcknowledge from './pages/admin/ToAcknowledge';
import Inbox from './pages/admin/Inbox';
import Departments from './pages/superadmin/departments/Departments';

function App() {
  const [theme] = useMode()

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* BASIC */}
        <Route path='/' element={<RequireAuth allowedRoles={normalAccess} />}>
          <Route path='' element={<MyRequests />} />
          <Route path=':id' element={<MyRequestDetail />} />
          <Route path='create' element={<CreateRequest />} />
        </Route>

        <Route path='/to-acknowledge' element={<RequireAuth allowedRoles={normalAccess} />}>
          <Route path='' element={<ToAcknowledge />} />
          <Route path=':id' element={<RequestDetail path={'/to-acknowledge'} />} />
          <Route path='edit/:id' element={<EditRequest status="PREPARED" path={'/to-acknowledge'} />} />
          <Route path='revise/:id' element={<EditRequest status="REVISED" path={'/to-acknowledge'} />} />
        </Route>

        {/* AUTHORIZED */}
        <Route path='/all' element={<RequireAuth allowedRoles={documentAccess} />}>
          <Route path='' element={<AllRequests />} />
          <Route path=':id' element={<RequestDetail path={'/all'} />} />
          <Route path='edit/:id' element={<EditRequest status="PREPARED" path={'/all'} />} />
          <Route path='revise/:id' element={<EditRequest status="REVISED" path={'/all'} />} />
        </Route>

        <Route path='/inbox' element={<RequireAuth allowedRoles={documentAccess} />}>
          <Route path='' element={<Inbox />} />
          <Route path=':id' element={<RequestDetail path={'/inbox'} />} />
          <Route path='edit/:id' element={<EditRequest status="PREPARED" path={'/inbox'} />} />
          <Route path='revise/:id' element={<EditRequest status="REVISED" path={'/inbox'} />} />
        </Route>

        {/* SUPERADMIN */}
        <Route path='/users' element={<RequireAuth allowedRoles={userAccess} />}>
          <Route path='' element={<Users />} />
          <Route path=':id' element={<UserDetail />} />
        </Route>

        <Route path='/work-flows' element={<RequireAuth allowedRoles={groupAccess} />}>
          <Route path='' element={<Groups />} />
          <Route path=':id' element={<GroupDetail />} />
        </Route>

        <Route path='/departments' element={<RequireAuth allowedRoles={departmentAccess} />}>
          <Route path='' element={<Departments />} />
          {/* <Route path=':id' element={<GroupDetail />} /> */}
        </Route>

        <Route path='/login' element={<Login />} />

        <Route path='/test/drawer' element={<RightDrawer />} />

        <Route path='*' element={<NotFound />} />

      </Routes>
    </ThemeProvider>
  );
}

export default App;
