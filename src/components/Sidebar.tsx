// src/components/Sidebar.tsx

import React, { useMemo } from 'react';
import { Layout, Menu, Badge } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  ShopOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  UserOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: number;
  roles: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  /**
   * Menu items configuration
   * Each item has roles array to control visibility
   */
  const allMenuItems: MenuItem[] = useMemo(() => [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/dashboard',
      roles: ['SUPER_ADMIN', 'ADMIN', 'SUPPORT', 'VIEWER'],
    },
    {
      key: 'tenants',
      icon: <ShopOutlined />,
      label: 'Tenants',
      path: '/tenants',
      badge: 0, // TODO: Fetch from API
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      key: 'subscriptions',
      icon: <CreditCardOutlined />,
      label: 'Subscriptions',
      path: '/subscriptions',
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      key: 'billing',
      icon: <FileTextOutlined />,
      label: 'Billing',
      path: '/billing',
      badge: 0, // TODO: Fetch overdue invoices count
      roles: ['SUPER_ADMIN', 'ADMIN', 'SUPPORT'],
    },
    {
      key: 'plans',
      icon: <AppstoreOutlined />,
      label: 'Plans',
      path: '/subscription-plans',
      roles: ['SUPER_ADMIN'],
    },
    {
      key: 'divider-1',
      icon: null,
      label: '',
      path: '',
      roles: ['SUPER_ADMIN', 'ADMIN', 'SUPPORT'],
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Platform Users',
      path: '/users',
      roles: ['SUPER_ADMIN'],
    },
    {
      key: 'audit',
      icon: <AuditOutlined />,
      label: 'Audit Logs',
      path: '/audit-logs',
      roles: ['SUPER_ADMIN', 'ADMIN', 'SUPPORT'],
    },
  ], []);

  /**
   * Filter menu items based on user role
   */
  const menuItems = useMemo(() => {
    if (!user || !user.role) return [];

    return allMenuItems
      .filter(item => item.roles.includes(user.role!))
      .map(item => {
        // Divider
        if (item.key.startsWith('divider')) {
          return {
            type: 'divider' as const,
            key: item.key,
          };
        }

        // Menu item with optional badge
        return {
          key: item.key,
          icon: item.icon,
          label: item.badge && item.badge > 0 ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{item.label}</span>
              <Badge 
                count={item.badge} 
                style={{ backgroundColor: '#df1b41' }}
                size="small"
              />
            </div>
          ) : item.label,
          onClick: () => navigate(item.path),
        };
      });
  }, [user, allMenuItems, navigate]);

  /**
   * Get current selected menu key from location
   */
  const selectedKey = useMemo(() => {
    const path = location.pathname;
    const item = allMenuItems.find(item => item.path === path);
    return item ? [item.key] : ['dashboard'];
  }, [location.pathname, allMenuItems]);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={240}
      collapsedWidth={80}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 64,
        bottom: 0,
        background: '#ffffff',
        borderRight: '1px solid #e3e8ee',
        transition: 'all 0.2s',
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={selectedKey}
        items={menuItems}
        style={{
          height: '100%',
          borderRight: 0,
          paddingTop: 16,
        }}
      />
    </Sider>
  );
};