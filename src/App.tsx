// src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './layouts/DashboardLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { antdTheme } from './theme/antd-theme';
import { TenantsPage } from './pages/TenantsPage';

// Placeholder per future pages
// import { SubscriptionsPage } from './pages/SubscriptionsPage';
// import { BillingPage } from './pages/BillingPage';
// import { SubscriptionPlansPage } from './pages/SubscriptionPlansPage';
// import { UsersPage } from './pages/UsersPage';
// import { AuditLogsPage } from './pages/AuditLogsPage';

const App: React.FC = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes - use DashboardLayout */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Dashboard pages */}
              <Route path="/dashboard" element={<DashboardPage />} />
              
              {/* Future routes - uncomment when pages are created */}
              { <Route path="/tenants" element={<TenantsPage />} /> }
              {/* <Route path="/subscriptions" element={<SubscriptionsPage />} /> */}
              {/* <Route path="/billing" element={<BillingPage />} /> */}
              {/* <Route path="/subscription-plans" element={<SubscriptionPlansPage />} /> */}
              {/* <Route path="/users" element={<UsersPage />} /> */}
              {/* <Route path="/audit-logs" element={<AuditLogsPage />} /> */}
            </Route>

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* 404 - Not found */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;