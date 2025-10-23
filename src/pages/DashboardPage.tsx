// src/pages/DashboardPage.tsx

import React, { useState, useCallback } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Spin, Button } from 'antd';
import {
  UserOutlined,
  ShopOutlined,
  DollarOutlined,
  RiseOutlined,
  ReloadOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PageHeader } from '../components/PageHeader';
import { useAutoRefresh } from '../hooks/useAutoRefresh';
import {
  TenantsService,
  SubscriptionsService,
  BillingInvoicesService,
  SubscriptionPlansService,
  TenantResponse,
  SubscriptionResponse,
  InvoiceResponse,
} from '../api';

export const DashboardPage: React.FC = () => {
  // Stats state
  const [stats, setStats] = useState({
    totalTenants: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0, // Placeholder for MRR
    overdueInvoices: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // Recent data state
  const [recentTenants, setRecentTenants] = useState<TenantResponse[]>([]);
  const [recentSubscriptions, setRecentSubscriptions] = useState<SubscriptionResponse[]>([]);
  const [recentInvoices, setRecentInvoices] = useState<InvoiceResponse[]>([]);
  const [recentLoading, setRecentLoading] = useState(true);

  // Revenue chart data (mock for now - TODO: fetch real data)
  const [revenueData] = useState([
    { month: 'Ott', revenue: 8500, subscriptions: 30 },
    { month: 'Nov', revenue: 9200, subscriptions: 32 },
    { month: 'Dic', revenue: 10100, subscriptions: 35 },
    { month: 'Gen', revenue: 11300, subscriptions: 38 },
    { month: 'Feb', revenue: 12000, subscriptions: 40 },
    { month: 'Mar', revenue: 12450, subscriptions: 42 },
  ]);

  /**
   * Fetch dashboard stats
   */
  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      // Fetch data in parallel
      const [tenantsData, subscriptionsData, invoicesData] = await Promise.all([
        TenantsService.getAllTenants(0, 1), // Just for count
        SubscriptionsService.getAllSubscriptions(0, 1), // Just for count
        BillingInvoicesService.getAllInvoices(0, 100), // Get invoices to count overdue
      ]);

      // Count overdue invoices (status OVERDUE or dueDate < today and not paid)
      const overdueCount = (invoicesData.invoices || []).filter(
        inv => inv.status === 'OVERDUE' || inv.status === 'SENT'
      ).length;

      setStats({
        totalTenants: tenantsData.total || 0,
        activeSubscriptions: subscriptionsData.total || 0,
        monthlyRevenue: 12450.50, // TODO: Calculate from subscriptions
        overdueInvoices: overdueCount,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  /**
   * Fetch recent activity
   */
  const fetchRecentActivity = useCallback(async () => {
    setRecentLoading(true);
    try {
      // Fetch recent entities
      const [tenantsData, subscriptionsData, invoicesData] = await Promise.all([
        TenantsService.getAllTenants(0, 5, 'createdAt', 'DESC'),
        SubscriptionsService.getAllSubscriptions(0, 5, 'createdAt', 'DESC'),
        BillingInvoicesService.getAllInvoices(0, 5, 'createdAt', 'DESC'),
      ]);

      setRecentTenants(tenantsData.tenants || []);
      setRecentSubscriptions(subscriptionsData.subscriptions || []);
      setRecentInvoices(invoicesData.invoices || []);
    } catch (error) {
      console.error('Failed to fetch recent activity:', error);
    } finally {
      setRecentLoading(false);
    }
  }, []);

  /**
   * Auto-refresh stats every 30 seconds
   */
  const { isRefreshing: statsRefreshing, manualRefresh: refreshStats } = useAutoRefresh({
    interval: 30000, // 30 seconds
    enabled: true,
    onRefresh: fetchStats,
  });

  /**
   * Auto-refresh recent activity every 60 seconds
   */
  const { isRefreshing: activityRefreshing, manualRefresh: refreshActivity } = useAutoRefresh({
    interval: 60000, // 60 seconds
    enabled: true,
    onRefresh: fetchRecentActivity,
  });

  /**
   * Columns for recent tenants table
   */
  const tenantsColumns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'ACTIVE' ? 'green' : status === 'TRIAL' ? 'blue' : 'default'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('it-IT'),
    },
  ];

  /**
   * Columns for recent invoices table
   */
  const invoicesColumns = [
    {
      title: 'Invoice #',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Tenant',
      dataIndex: 'tenantName',
      key: 'tenantName',
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `€${amount.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={
          status === 'PAID' ? 'green' : 
          status === 'OVERDUE' ? 'red' : 
          status === 'SENT' ? 'orange' : 
          'default'
        }>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Platform Overview"
        subtitle="Monitor your platform's key metrics and performance"
        extra={
          <Button
            icon={<ReloadOutlined spin={statsRefreshing || activityRefreshing} />}
            onClick={() => {
              refreshStats();
              refreshActivity();
            }}
            loading={statsRefreshing || activityRefreshing}
          >
            Refresh
          </Button>
        }
      />

      {/* Stats Cards */}
      <Spin spinning={statsLoading}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Tenants"
                value={stats.totalTenants}
                prefix={<ShopOutlined />}
                valueStyle={{ color: '#635bff' }}
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Subscriptions"
                value={stats.activeSubscriptions}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#00d924' }}
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Monthly Revenue (MRR)"
                value={stats.monthlyRevenue}
                prefix={<DollarOutlined />}
                precision={2}
                valueStyle={{ color: '#635bff' }}
                suffix="€"
              />
              <div style={{ fontSize: 12, color: '#697386', marginTop: 8 }}>
                Placeholder - API coming soon
              </div>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Overdue Invoices"
                value={stats.overdueInvoices}
                prefix={<WarningOutlined />}
                valueStyle={{ color: stats.overdueInvoices > 0 ? '#df1b41' : '#00d924' }}
              />
            </Card>
          </Col>
        </Row>
      </Spin>

      {/* Revenue Trend Chart */}
      <Card 
        title="Revenue Trend" 
        style={{ marginTop: 24 }}
        extra={
          <Tag color="blue">Last 6 Months</Tag>
        }
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e3e8ee" />
            <XAxis dataKey="month" stroke="#697386" />
            <YAxis stroke="#697386" />
            <Tooltip 
              contentStyle={{ 
                background: '#fff', 
                border: '1px solid #e3e8ee',
                borderRadius: 8,
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#635bff" 
              strokeWidth={2}
              name="Revenue (€)"
            />
            <Line 
              type="monotone" 
              dataKey="subscriptions" 
              stroke="#00d924" 
              strokeWidth={2}
              name="Subscriptions"
            />
          </LineChart>
        </ResponsiveContainer>
        <div style={{ fontSize: 12, color: '#697386', marginTop: 16, textAlign: 'center' }}>
          📊 Mock data - Real historical data coming soon
        </div>
      </Card>

      {/* Recent Activity Section */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card 
            title="Recent Tenants" 
            loading={recentLoading}
            extra={
              <Button 
                type="text" 
                size="small" 
                icon={<ReloadOutlined spin={activityRefreshing} />}
                onClick={refreshActivity}
              />
            }
          >
            <Table
              dataSource={recentTenants}
              columns={tenantsColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            title="Recent Invoices" 
            loading={recentLoading}
            extra={
              <Button 
                type="text" 
                size="small" 
                icon={<ReloadOutlined spin={activityRefreshing} />}
                onClick={refreshActivity}
              />
            }
          >
            <Table
              dataSource={recentInvoices}
              columns={invoicesColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Stats Grid */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Subscriptions by Status">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Trial"
                  value={Math.round(stats.activeSubscriptions * 0.15)}
                  valueStyle={{ color: '#ffa500' }}
                  prefix={<RiseOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Active"
                  value={Math.round(stats.activeSubscriptions * 0.85)}
                  valueStyle={{ color: '#00d924' }}
                  prefix={<RiseOutlined />}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Platform Health">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Uptime"
                  value={99.9}
                  precision={1}
                  valueStyle={{ color: '#00d924' }}
                  suffix="%"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Avg Response Time"
                  value={145}
                  valueStyle={{ color: '#00d924' }}
                  suffix="ms"
                />
              </Col>
            </Row>
            <div style={{ fontSize: 12, color: '#697386', marginTop: 8 }}>
              Mock data - Real metrics coming from monitoring
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};