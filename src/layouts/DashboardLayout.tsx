// src/layouts/DashboardLayout.tsx

import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const { Content } = Layout;

/**
 * Main dashboard layout
 * Includes fixed header, collapsible sidebar, and content area
 */
export const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Fixed Header */}
      <Header collapsed={collapsed} onToggle={toggleCollapsed} />

      {/* Fixed Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main Content Area */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 240,
          marginTop: 64,
          transition: 'all 0.2s',
        }}
      >
        <Content
          style={{
            padding: 24,
            minHeight: 'calc(100vh - 64px)',
            background: '#f6f9fc',
          }}
        >
          {/* Outlet renders the matched child route */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};