// src/pages/DashboardPage.tsx
import React from 'react';
import { Card, Row, Col, Statistic, Button } from 'antd';
import {
  UserOutlined,
  ShopOutlined,
  DollarOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 24, minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          {user && (
            <p style={{ margin: 0, color: '#666' }}>
              Welcome back, {user.username}!
            </p>
          )}
        </div>
        <Button icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Tenants"
              value={45}
              prefix={<ShopOutlined />}
              valueStyle={{ color: '#635bff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Active Users"
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#635bff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Monthly Revenue"
              value={12450}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#00d924' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Card title="Recent Activity" style={{ marginTop: 24 }}>
        <p>No recent activity</p>
      </Card>
    </div>
  );
};
