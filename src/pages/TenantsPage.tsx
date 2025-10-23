// src/pages/TenantsPage.tsx - STEP 3.2 & 3.3: Search, Filters & Create Modal

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Table, Tag, Button, Space, Tooltip, Dropdown, Input, Select, Modal, message, Typography } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  CheckOutlined,
  PauseOutlined,
  ReloadOutlined,
  DeleteOutlined,
  MoreOutlined,
  SearchOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import { PageHeader } from '../components/PageHeader';
import { CreateTenantModal } from '../components/CreateTenantModal';
import { EditTenantModal } from '../components/EditTenantModal';
import { TenantsService, TenantResponse } from '../api';
import type { ColumnType } from 'antd/es/table';

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

export const TenantsPage: React.FC = () => {
  // State
  const [tenants, setTenants] = useState<TenantResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });

  // ✅ STEP 3.2: Filters state
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // ✅ STEP 3.3: Modal state
  const [createModalVisible, setCreateModalVisible] = useState(false);

  // ✅ STEP 3.4: Edit modal state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<TenantResponse | null>(null);

  /**
   * Fetch tenants from API
   */
  const fetchTenants = useCallback(async (page = 0, size = 20) => {
    setLoading(true);
    try {
      const data = await TenantsService.getAllTenants(
        page,
        size,
        'createdAt',
        'DESC',
      );

      setTenants(data.tenants || []);
      setPagination(prev => ({
        ...prev,
        total: data.total || 0,
        current: page + 1,
      }));
    } catch (error) {
      console.error('Failed to fetch tenants:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load tenants on mount
   */
  useEffect(() => {
    fetchTenants(0, pagination.pageSize);
  }, [fetchTenants, pagination.pageSize]);

  /**
   * ✅ STEP 3.2: Filter tenants based on search text and status
   */
  const filteredTenants = useMemo(() => {
    let filtered = [...tenants];

    // Filter by search text (code, name, email)
    if (searchText) {
      const search = searchText.toLowerCase();
      filtered = filtered.filter(tenant => 
        tenant.code?.toLowerCase().includes(search) ||
        tenant.name?.toLowerCase().includes(search) ||
        tenant.email?.toLowerCase().includes(search)
      );
    }

    // Filter by status
    if (statusFilter && statusFilter !== 'ALL') {
      filtered = filtered.filter(tenant => tenant.status === statusFilter);
    }

    return filtered;
  }, [tenants, searchText, statusFilter]);

  /**
   * Handle table pagination change
   */
  const handleTableChange: TableProps<TenantResponse>['onChange'] = (paginationConfig) => {
    const page = (paginationConfig.current || 1) - 1;
    const size = paginationConfig.pageSize || 20;
    
    setPagination({
      current: paginationConfig.current || 1,
      pageSize: size,
      total: pagination.total,
    });
    
    fetchTenants(page, size);
  };

  /**
   * ✅ STEP 3.2: Handle search change
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    // Reset pagination to first page when searching
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  /**
   * ✅ STEP 3.2: Handle status filter change
   */
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    // Reset pagination to first page when filtering
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  /**
   * ✅ STEP 3.2: Clear all filters
   */
  const handleClearFilters = () => {
    setSearchText('');
    setStatusFilter('ALL');
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  /**
   * Get status tag color
   */
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'ACTIVE':
        return 'green';
      case 'TRIAL':
        return 'blue';
      case 'PENDING':
        return 'blue';
      case 'SUSPENDED':
        return 'orange';
      case 'CANCELLED':
        return 'red';
      default:
        return 'default';
    }
  };

  /**
   * Get subscription tag (placeholder for now)
   */
  const getSubscriptionTag = (tenant: TenantResponse) => {
    const status = String(tenant.status ?? '');
    if (status === 'TRIAL' || status === 'PENDING') {
      return <Tag color="orange">Trial</Tag>;
    }
    if (status === 'ACTIVE') {
      return <Tag color="green">Active</Tag>;
    }
    return <Tag color="default">-</Tag>;
  };

  /**
   * Actions menu for each row
   */
  const getActionsMenu = (tenant: TenantResponse): MenuProps => ({
    items: [
      {
        key: 'view',
        icon: <EyeOutlined />,
        label: 'View Details',
        onClick: () => handleViewDetails(tenant),
      },
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Edit',
        onClick: () => handleEdit(tenant),
      },
      {
        type: 'divider',
      },
      ...(tenant.status === 'PENDING' ? [{
        key: 'activate',
        icon: <CheckOutlined />,
        label: 'Activate',
        onClick: () => handleActivate(tenant),
      }] : []),
      ...(tenant.status === 'ACTIVE' ? [{
        key: 'suspend',
        icon: <PauseOutlined />,
        label: 'Suspend',
        onClick: () => handleSuspend(tenant),
      }] : []),
      ...(tenant.status === 'SUSPENDED' ? [{
        key: 'reactivate',
        icon: <CheckOutlined />,
        label: 'Reactivate',
        onClick: () => handleActivate(tenant),
      }] : []),
      {
        type: 'divider',
      },
      {
        key: 'delete',
        icon: <DeleteOutlined />,
        label: 'Delete',
        danger: true,
        onClick: () => handleDelete(tenant),
      },
    ],
  });

  // Action handlers (placeholders)
  const handleViewDetails = (tenant: TenantResponse) => {
    console.log('View Details:', tenant);
  };

  const handleEdit = (tenant: TenantResponse) => {
    setSelectedTenant(tenant);
    setEditModalVisible(true);
  };

  /**
   * ✅ STEP 3.4: Handle edit modal close
   */
  const handleEditModalClose = () => {
    setEditModalVisible(false);
    setSelectedTenant(null);
  };

  /**
   * ✅ STEP 3.4: Handle successful tenant update
   */
  const handleEditModalSuccess = () => {
    // Refresh the table after updating a tenant
    fetchTenants(pagination.current - 1, pagination.pageSize);
  };

  const handleActivate = (tenant: TenantResponse) => {
    Modal.confirm({
      title: 'Activate Tenant',
      content: (
        <div>
          <p>
            Are you sure you want to activate tenant <strong>{tenant.name}</strong> ({tenant.code})?
          </p>
          <p style={{ marginTop: '8px', color: '#666' }}>
            This will change the status from {tenant.status} to ACTIVE and make the tenant operational.
          </p>
        </div>
      ),
      okText: 'Activate',
      okType: 'primary',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await TenantsService.activateTenant(tenant.id!);
          message.success(`✅ Tenant ${tenant.code} activated successfully!`);
          fetchTenants(pagination.current - 1, pagination.pageSize);
        } catch (error: any) {
          console.error('Failed to activate tenant:', error);
          if (error?.body?.message) {
            message.error(`Error: ${error.body.message}`);
          } else {
            message.error('Failed to activate tenant. Please try again.');
          }
        }
      },
    });
  };

  const handleSuspend = (tenant: TenantResponse) => {
    let suspendReason = '';

    Modal.confirm({
      title: '⏸️ Suspend Tenant',
      content: (
        <div>
          <p>
            Are you sure you want to suspend tenant <strong>{tenant.name}</strong> ({tenant.code})?
          </p>
          <p style={{ marginTop: '8px', color: '#666' }}>
            This will temporarily disable tenant access.
          </p>
          <div style={{ marginTop: '16px' }}>
            <Text strong>Reason for suspension: <span style={{ color: 'red' }}>*</span></Text>
            <Input.TextArea
              rows={3}
              placeholder="e.g., Payment overdue, Terms violation, Customer request..."
              onChange={(e) => (suspendReason = e.target.value)}
              style={{ marginTop: '8px' }}
            />
          </div>
        </div>
      ),
      okText: 'Suspend',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        if (!suspendReason || suspendReason.trim().length === 0) {
          message.error('Please provide a reason for suspension');
          return Promise.reject();
        }

        try {
          await TenantsService.suspendTenant(tenant.id!, suspendReason);
          message.warning(`⏸️ Tenant ${tenant.code} suspended`);
          fetchTenants(pagination.current - 1, pagination.pageSize);
        } catch (error: any) {
          console.error('Failed to suspend tenant:', error);
          if (error?.body?.message) {
            message.error(`Error: ${error.body.message}`);
          } else {
            message.error('Failed to suspend tenant. Please try again.');
          }
          return Promise.reject();
        }
      },
    });
  };

  const handleDelete = (tenant: TenantResponse) => {
    let deleteReason = '';

    Modal.confirm({
      title: '🗑️ Delete Tenant',
      content: (
        <div>
          <p style={{ color: 'red', fontWeight: 600 }}>
            ⚠️ WARNING: This action is irreversible!
          </p>
          <p>
            Are you sure you want to permanently delete tenant <strong>{tenant.name}</strong> ({tenant.code})?
          </p>
          <p style={{ marginTop: '8px', color: '#666' }}>
            This will:
          </p>
          <ul style={{ marginTop: '8px', color: '#666' }}>
            <li>Cancel the subscription</li>
            <li>Set tenant status to CANCELLED</li>
            <li>Disable all tenant access</li>
            <li>Preserve data for audit purposes</li>
          </ul>
          <div style={{ marginTop: '16px' }}>
            <Text strong>Reason for deletion: <span style={{ color: 'red' }}>*</span></Text>
            <Input.TextArea
              rows={3}
              placeholder="e.g., Customer request, Business closure, Contract termination..."
              onChange={(e) => (deleteReason = e.target.value)}
              style={{ marginTop: '8px' }}
            />
          </div>
        </div>
      ),
      okText: 'Delete Tenant',
      okType: 'danger',
      okButtonProps: { danger: true },
      cancelText: 'Cancel',
      onOk: async () => {
        if (!deleteReason || deleteReason.trim().length === 0) {
          message.error('Please provide a reason for deletion');
          return Promise.reject();
        }

        try {
          await TenantsService.cancelTenant(tenant.id!, deleteReason);
          message.success(`🗑️ Tenant ${tenant.code} deleted successfully`);
          fetchTenants(pagination.current - 1, pagination.pageSize);
        } catch (error: any) {
          console.error('Failed to delete tenant:', error);
          if (error?.body?.message) {
            message.error(`Error: ${error.body.message}`);
          } else {
            message.error('Failed to delete tenant. Please try again.');
          }
          return Promise.reject();
        }
      },
    });
  };

  const handleNewTenant = () => {
    setCreateModalVisible(true);
  };

  /**
   * ✅ STEP 3.3: Handle modal close
   */
  const handleModalClose = () => {
    setCreateModalVisible(false);
  };

  /**
   * ✅ STEP 3.3: Handle successful tenant creation
   */
  const handleModalSuccess = () => {
    // Refresh the table after creating a tenant
    fetchTenants(pagination.current - 1, pagination.pageSize);
  };

  /**
   * Table columns
   */
  const columns: ColumnType<TenantResponse>[] = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: 150,
      fixed: 'left',
      render: (code: string) => (
        <span style={{ fontWeight: 600, color: '#722ed1' }}>
          {code}
        </span>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 250,
      ellipsis: {
        showTitle: false,
      },
      render: (email: string) => (
        <Tooltip placement="topLeft" title={email}>
          {email}
        </Tooltip>
      ),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: 150,
      render: (city: string) => city || '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Subscription',
      key: 'subscription',
      width: 120,
      render: (_: any, tenant: TenantResponse) => getSubscriptionTag(tenant),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date: string) => new Date(date).toLocaleDateString('it-IT'),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      fixed: 'right',
      render: (_: any, tenant: TenantResponse) => (
        <Dropdown menu={getActionsMenu(tenant)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title="Tenants Management"
      />

      {/* ✅ STEP 3.2: Search & Filters Bar */}
      <div style={{ marginBottom: 16 }}>
        <Space size="middle" style={{ width: '100%', justifyContent: 'space-between' }}>
          {/* Left: Search Bar */}
          <Space>
            <Input
              placeholder="Search by code, name or email..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearchChange}
              style={{ width: 300 }}
              allowClear
            />
            
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              style={{ width: 150 }}
            >
              <Option value="ALL">All Status</Option>
              <Option value="PENDING">🔵 Pending</Option>
              <Option value="TRIAL">🟡 Trial</Option>
              <Option value="ACTIVE">🟢 Active</Option>
              <Option value="SUSPENDED">🟠 Suspended</Option>
              <Option value="CANCELLED">🔴 Cancelled</Option>
            </Select>

            {(searchText || statusFilter !== 'ALL') && (
              <Button 
                icon={<ClearOutlined />}
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            )}
          </Space>

          {/* Right: Actions */}
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => fetchTenants(pagination.current - 1, pagination.pageSize)}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleNewTenant}
            >
              New Tenant
            </Button>
          </Space>
        </Space>
      </div>

      {/* ✅ Table with filtered data */}
      <div className="platform-table">
        <Table
          columns={columns}
          dataSource={filteredTenants}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} tenants`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 1200 }}
        />
      </div>

      {/* ✅ STEP 3.3: Create Tenant Modal */}
      <CreateTenantModal
        visible={createModalVisible}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
      />

      {/* ✅ STEP 3.4: Edit Tenant Modal */}
      <EditTenantModal
        visible={editModalVisible}
        tenant={selectedTenant}
        onClose={handleEditModalClose}
        onSuccess={handleEditModalSuccess}
      />
    </div>
  );
};