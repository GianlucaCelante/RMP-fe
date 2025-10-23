// src/components/Header.tsx

import React from 'react';
import { Layout, Button, Dropdown, Avatar, Space, Breadcrumb, MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useLocation, Link } from 'react-router-dom';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  /**
   * User dropdown menu items
   */
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'user-info',
      label: (
        <div style={{ padding: '8px 0', borderBottom: '1px solid #e3e8ee' }}>
          <div style={{ fontWeight: 600, color: '#1a1f36' }}>
            {user?.firstName} {user?.lastName}
          </div>
          <div style={{ fontSize: 12, color: '#697386' }}>
            {user?.email}
          </div>
          <div style={{ fontSize: 11, color: '#8898aa', marginTop: 4 }}>
            {user?.role}
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => {
        // TODO: Navigate to settings
        console.log('Navigate to settings');
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: logout,
    },
  ];

  /**
   * Generate breadcrumbs from current path
   */
  const breadcrumbItems = React.useMemo(() => {
    const pathSnippets = location.pathname.split('/').filter(i => i);
    
    const items = [
      {
        title: <Link to="/dashboard">Home</Link>,
      },
    ];

    // Map path segments to readable names
    const pathNameMap: Record<string, string> = {
      'dashboard': 'Dashboard',
      'tenants': 'Tenants',
      'subscriptions': 'Subscriptions',
      'billing': 'Billing',
      'subscription-plans': 'Plans',
      'users': 'Platform Users',
      'audit-logs': 'Audit Logs',
    };

    pathSnippets.forEach((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const isLast = index === pathSnippets.length - 1;
      const title = pathNameMap[snippet] || snippet;

      items.push({
        title: isLast ? <span>{title}</span> : <Link to={url}>{title}</Link>,
      });
    });

    return items;
  }, [location.pathname]);

  return (
    <AntHeader
      style={{
        position: 'fixed',
        top: 0,
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#ffffff',
        borderBottom: '1px solid #e3e8ee',
        padding: '0 24px',
        height: 64,
      }}
    >
      {/* Left side: Toggle + Logo + Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          style={{
            fontSize: 18,
            width: 40,
            height: 40,
          }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: 20, 
            fontWeight: 700,
            color: '#635bff',
            letterSpacing: '-0.5px',
          }}>
            RMP Platform
          </h1>

          <Breadcrumb
            items={breadcrumbItems}
            style={{ marginLeft: 16 }}
            separator="/"
          />
        </div>
      </div>

      {/* Right side: User dropdown */}
      <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
        <Space style={{ cursor: 'pointer' }}>
          <Avatar
            icon={<UserOutlined />}
            style={{ backgroundColor: '#635bff' }}
          />
          <span style={{ color: '#1a1f36', fontWeight: 500 }}>
            {user?.firstName || user?.username}
          </span>
        </Space>
      </Dropdown>
    </AntHeader>
  );
};