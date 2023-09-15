import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider } from 'react-query';
import { theme } from './assets/theme/theme';
import { queryClient } from './lib/react-query';
import AuthProvider from './providers/AuthProvider';
import { ToastContainer } from 'react-toastify';
import UsersPage from './pages/UsersPage';
import Protected from './components/Protected';
import Layout from './components/Layout';
import AllRequestsPage from './pages/AllRequestsPage';
import MyRequestsPage from './pages/MyRequestsPage';
import InboxPage from './pages/InboxPage';
import DepartmentsPage from './pages/DepartmentsPage';
import WorkFlowsPage from './pages/WorkFlowsPage';
import CreateWorkflowPage from './pages/CreateWorkflowPage';
import CreateRequest from './pages/CreateRequest';
import DocumentDetail from './pages/DocumentDetail';

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              path="/"
              element={
                <Protected>
                  <Layout />
                </Protected>
              }
            >
              <Route path="all" element={<AllRequestsPage />} />
              <Route path="my-requests" element={<MyRequestsPage />} />
              <Route path="my-requests/create" element={<CreateRequest />} />
              <Route path="inbox" element={<InboxPage />} />
              <Route path="detail/:id" element={<DocumentDetail />} />

              {/* FOR SUPERADMIN */}
              <Route path="departments" element={<DepartmentsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="workflows" element={<WorkFlowsPage />} />
              <Route path="workflows/create" element={<CreateWorkflowPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
