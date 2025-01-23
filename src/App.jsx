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
// import MyRequestsPage from './pages/MyRequestsPage';
import InboxPage from './pages/InboxPage';
import DepartmentsPage from './pages/DepartmentsPage';
import WorkFlowsPage from './pages/WorkFlowsPage';
import DocumentDetailPage from './pages/DocumentDetailPage';
import EditRequestPage from './pages/EditRequestPage';
import CreateRequestPage from './pages/CreateRequestPage';
import WorkflowDetailPage from './pages/WorkflowDetailPage';
import UserDetailPage from './pages/UserDetailPage';
import AddRemarkPage from './pages/AddRemarkPage';
import ErrorBoundary from './pages/ErrorBoundary';
import AddMentionPage from './pages/AddMentionPage';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CreateWorkflow, EditWorkflow } from '@/features/workflow';
import PurchaseRequestPage from './pages/PurchaseRequestPage';
import PurchaseOrderPage from './pages/PurchaseOrderPage';
import CreateOrderPage from './pages/CreateOrderPage';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastContainer />
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <DndProvider backend={HTML5Backend}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Protected>
                      <Layout />
                    </Protected>
                  }
                >
                  <Route path="" element={<InboxPage />} />
                  <Route path="all" element={<AllRequestsPage />} />
                  <Route
                    path="purchase-request"
                    element={<PurchaseRequestPage />}
                  />
                  <Route
                    path="purchase-order"
                    element={<PurchaseOrderPage />}
                  />
                  <Route
                    path="purchase-request/create"
                    element={<CreateRequestPage />}
                  />
                  <Route
                    path="purchase-order/create"
                    element={<CreateOrderPage />}
                  />
                  <Route path="detail/:id" element={<DocumentDetailPage />} />
                  <Route path="edit/:id" element={<EditRequestPage />} />
                  <Route path="remark/:id" element={<AddRemarkPage />} />
                  <Route path="mention/:id" element={<AddMentionPage />} />

                  {/* FOR SUPERADMIN */}
                  <Route path="departments" element={<DepartmentsPage />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="users/:id" element={<UserDetailPage />} />
                  <Route path="workflows" element={<WorkFlowsPage />} />
                  <Route path="workflows/create" element={<CreateWorkflow />} />
                  <Route path="workflows/edit/:id" element={<EditWorkflow />} />
                  <Route
                    path="workflows/:id"
                    element={<WorkflowDetailPage />}
                  />
                </Route>
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </DndProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
