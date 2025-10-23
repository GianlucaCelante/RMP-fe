// src/components/EditTenantModal.tsx - STEP 3.4

import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  Divider,
  message,
  Typography,
  Tag,
} from 'antd';
import {
  TenantsService,
  TenantResponse,
  UpdateTenantRequest,
} from '../api';

const { Text } = Typography;

interface EditTenantModalProps {
  visible: boolean;
  tenant: TenantResponse | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditTenantModal: React.FC<EditTenantModalProps> = ({
  visible,
  tenant,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  /**
   * Populate form when tenant changes
   */
  useEffect(() => {
    if (visible && tenant) {
      form.setFieldsValue({
        name: tenant.name,
        legalName: tenant.legalName,
        email: tenant.email,
        phone: tenant.phone,
        address: tenant.address,
        city: tenant.city,
        province: tenant.province,
        postalCode: tenant.postalCode,
      });
    }
  }, [visible, tenant, form]);

  /**
   * Get status color for display
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
   * Handle form submit
   */
  const handleSubmit = async () => {
    if (!tenant?.id) {
      message.error('Tenant ID is missing');
      return;
    }

    try {
      const values = await form.validateFields();
      setLoading(true);

      // Build update request with only changed fields
      const request: UpdateTenantRequest = {
        name: values.name,
        legalName: values.legalName || undefined,
        email: values.email,
        phone: values.phone || undefined,
        address: values.address || undefined,
        city: values.city || undefined,
        province: values.province || undefined,
        postalCode: values.postalCode || undefined,
      };

      await TenantsService.updateTenant(tenant.id, request);

      message.success('✅ Tenant updated successfully!');
      onSuccess(); // Trigger parent refresh
      onClose();
    } catch (error: any) {
      console.error('Failed to update tenant:', error);
      
      // Handle validation errors
      if (error?.body?.validationErrors) {
        const errors = error.body.validationErrors.map((e: any) => 
          `${e.field}: ${e.message}`
        ).join(', ');
        message.error(`Validation error: ${errors}`);
      } else if (error?.body?.message) {
        message.error(`Error: ${error.body.message}`);
      } else {
        message.error('Failed to update tenant. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle modal cancel
   */
  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  if (!tenant) {
    return null;
  }

  return (
    <Modal
      title="Edit Tenant"
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      width={700}
      okText="Update Tenant"
      cancelText="Cancel"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
      >
        {/* Read-only info section */}
        <div
          style={{
            background: '#f0f2f5',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Text type="secondary">Tenant Code:</Text>
              <div style={{ marginTop: '4px' }}>
                <Text strong style={{ fontSize: '16px', color: '#722ed1' }}>
                  {tenant.code}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <Text type="secondary">Status:</Text>
              <div style={{ marginTop: '4px' }}>
                <Tag color={getStatusColor(tenant.status || '')}>
                  {tenant.status}
                </Tag>
              </div>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: '12px' }}>
            <Col span={12}>
              <Text type="secondary">Created:</Text>
              <div style={{ marginTop: '4px' }}>
                <Text>
                  {tenant.createdAt 
                    ? new Date(tenant.createdAt).toLocaleDateString('it-IT')
                    : '-'
                  }
                </Text>
              </div>
            </Col>
            {tenant.vatNumber && (
              <Col span={12}>
                <Text type="secondary">VAT Number:</Text>
                <div style={{ marginTop: '4px' }}>
                  <Text>{tenant.vatNumber}</Text>
                </div>
              </Col>
            )}
          </Row>
        </div>

        <Divider orientation="left">Editable Information</Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tenant Name"
              rules={[
                { required: true, message: 'Name is required' },
                { max: 255, message: 'Name cannot exceed 255 characters' },
              ]}
            >
              <Input placeholder="Pizza Bella Restaurant" maxLength={255} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="legalName"
              label="Legal Name"
              rules={[
                { max: 255, message: 'Legal name cannot exceed 255 characters' },
              ]}
              tooltip="Ragione sociale completa"
            >
              <Input placeholder="Pizza Bella S.r.l." maxLength={255} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Please enter a valid email' },
                { max: 255, message: 'Email cannot exceed 255 characters' },
              ]}
            >
              <Input placeholder="info@pizzabella.it" maxLength={255} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { max: 50, message: 'Phone cannot exceed 50 characters' },
              ]}
            >
              <Input placeholder="+39 02 1234567" maxLength={50} />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Address</Divider>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="address"
              label="Street Address"
              rules={[
                { max: 500, message: 'Address cannot exceed 500 characters' },
              ]}
            >
              <Input placeholder="Via Roma 123" maxLength={500} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="city"
              label="City"
              rules={[
                { max: 100, message: 'City cannot exceed 100 characters' },
              ]}
            >
              <Input placeholder="Milano" maxLength={100} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="province"
              label="Province"
              rules={[
                { max: 50, message: 'Province cannot exceed 50 characters' },
              ]}
            >
              <Input placeholder="MI" maxLength={50} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="postalCode"
              label="Postal Code"
              rules={[
                { max: 20, message: 'Postal code cannot exceed 20 characters' },
              ]}
            >
              <Input placeholder="20100" maxLength={20} />
            </Form.Item>
          </Col>
        </Row>

        {/* Info about non-editable fields */}
        <div
          style={{
            background: '#e6f7ff',
            border: '1px solid #91d5ff',
            borderRadius: '4px',
            padding: '12px',
            marginTop: '16px',
          }}
        >
          <Text type="secondary" style={{ fontSize: '12px' }}>
            ℹ️ <strong>Note:</strong> Code, Status, VAT Number, Fiscal Code, Country, and Subscription 
            cannot be modified here. Use dedicated actions for status changes or contact support 
            for other modifications.
          </Text>
        </div>
      </Form>
    </Modal>
  );
};