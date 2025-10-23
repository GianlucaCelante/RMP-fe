// src/components/CreateTenantModal.tsx - STEP 3.3

import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Divider,
  message,
  Spin,
  Typography,
} from 'antd';
import {
  SubscriptionPlansService,
  TenantsService,
  SubscriptionPlanResponse,
  CreateTenantRequest,
} from '../api';

const { Option } = Select;
const { Text } = Typography;

interface CreateTenantModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateTenantModal: React.FC<CreateTenantModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<SubscriptionPlanResponse[]>([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanResponse | null>(null);
  const [selectedCycle, setSelectedCycle] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY');

  /**
   * Fetch subscription plans on mount
   */
  useEffect(() => {
    if (visible) {
      fetchPlans();
    }
  }, [visible]);

  /**
   * Fetch available subscription plans
   */
  const fetchPlans = async () => {
    setPlansLoading(true);
    try {
      const response = await SubscriptionPlansService.getActivePlans();
      
      // API returns single response or array - handle both
      const plansArray = Array.isArray(response) ? response : [response];
      setPlans(plansArray);
      
      // Auto-select first plan if available
      if (plansArray.length > 0) {
        form.setFieldsValue({ planCode: plansArray[0].code });
        setSelectedPlan(plansArray[0]);
      }
    } catch (error) {
      console.error('Failed to fetch plans:', error);
      message.error('Failed to load subscription plans');
    } finally {
      setPlansLoading(false);
    }
  };

  /**
   * Handle plan selection change
   */
  const handlePlanChange = (planCode: string) => {
    const plan = plans.find(p => p.code === planCode);
    setSelectedPlan(plan || null);
  };

  /**
   * Handle billing cycle change
   */
  const handleCycleChange = (cycle: 'MONTHLY' | 'YEARLY') => {
    setSelectedCycle(cycle);
  };

  /**
   * Get price based on selected cycle
   */
  const getSelectedPrice = (): number | undefined => {
    if (!selectedPlan) return undefined;
    return selectedCycle === 'MONTHLY' 
      ? selectedPlan.priceMonthly 
      : selectedPlan.priceYearly;
  };

  /**
   * Handle form submit
   */
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Transform form values to CreateTenantRequest
      const request: CreateTenantRequest = {
        code: values.code.toUpperCase(), // Ensure uppercase
        name: values.name,
        email: values.email,
        planCode: values.planCode,
        billingCycle: values.billingCycle,
        // Optional fields
        legalName: values.legalName || undefined,
        vatNumber: values.vatNumber || undefined,
        fiscalCode: values.fiscalCode || undefined,
        phone: values.phone || undefined,
        address: values.address || undefined,
        city: values.city || undefined,
        province: values.province || undefined,
        postalCode: values.postalCode || undefined,
        country: values.country || 'IT',
        timezone: values.timezone || 'Europe/Rome',
        locale: values.locale || 'it_IT',
        currency: values.currency || 'EUR',
      };

      await TenantsService.createTenant(request);

      message.success('✅ Tenant created successfully!');
      form.resetFields();
      onSuccess(); // Trigger parent refresh
      onClose();
    } catch (error: any) {
      console.error('Failed to create tenant:', error);
      
      // Handle validation errors
      if (error?.body?.validationErrors) {
        const errors = error.body.validationErrors.map((e: any) => 
          `${e.field}: ${e.message}`
        ).join(', ');
        message.error(`Validation error: ${errors}`);
      } else if (error?.body?.message) {
        message.error(`Error: ${error.body.message}`);
      } else {
        message.error('Failed to create tenant. Please try again.');
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
    setSelectedPlan(null);
    setSelectedCycle('MONTHLY');
    onClose();
  };

  return (
    <Modal
      title="Create New Tenant"
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      width={800}
      okText="Create Tenant"
      cancelText="Cancel"
      destroyOnClose
    >
      <Spin spinning={plansLoading}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            country: 'IT',
            timezone: 'Europe/Rome',
            locale: 'it_IT',
            currency: 'EUR',
            billingCycle: 'MONTHLY',
          }}
        >
          <Divider orientation="left">Basic Information</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="code"
                label="Tenant Code"
                rules={[
                  { required: true, message: 'Code is required' },
                  { min: 3, max: 50, message: 'Code must be 3-50 characters' },
                  { 
                    pattern: /^[A-Z0-9_]+$/, 
                    message: 'Only uppercase letters, numbers and underscores' 
                  },
                ]}
                tooltip="Unique identifier (uppercase, e.g., PIZZABELLA)"
              >
                <Input 
                  placeholder="PIZZABELLA" 
                  maxLength={50}
                  onChange={(e) => {
                    // Auto-convert to uppercase
                    form.setFieldsValue({ 
                      code: e.target.value.toUpperCase() 
                    });
                  }}
                />
              </Form.Item>
            </Col>

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

          <Divider orientation="left">Legal Information</Divider>

          <Row gutter={16}>
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

            <Col span={12}>
              <Form.Item
                name="vatNumber"
                label="VAT Number"
                rules={[
                  { max: 50, message: 'VAT number cannot exceed 50 characters' },
                  {
                    pattern: /^[A-Z]{2}[0-9]{11}$/,
                    message: 'Format: IT + 11 digits (e.g., IT12345678901)',
                  },
                ]}
                tooltip="Partita IVA (format: IT12345678901)"
              >
                <Input placeholder="IT12345678901" maxLength={50} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fiscalCode"
                label="Fiscal Code"
                rules={[
                  { max: 50, message: 'Fiscal code cannot exceed 50 characters' },
                ]}
                tooltip="Codice Fiscale"
              >
                <Input placeholder="RSSMRA80A01H501U" maxLength={50} />
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

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="country"
                label="Country"
                rules={[
                  { len: 2, message: 'Country must be 2 characters (ISO-2)' },
                ]}
              >
                <Select>
                  <Option value="IT">🇮🇹 Italy</Option>
                  <Option value="FR">🇫🇷 France</Option>
                  <Option value="DE">🇩🇪 Germany</Option>
                  <Option value="ES">🇪🇸 Spain</Option>
                  <Option value="CH">🇨🇭 Switzerland</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="timezone" label="Timezone">
                <Select>
                  <Option value="Europe/Rome">Europe/Rome</Option>
                  <Option value="Europe/Paris">Europe/Paris</Option>
                  <Option value="Europe/Berlin">Europe/Berlin</Option>
                  <Option value="Europe/Madrid">Europe/Madrid</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="locale" label="Locale">
                <Select>
                  <Option value="it_IT">🇮🇹 Italiano</Option>
                  <Option value="en_US">🇺🇸 English</Option>
                  <Option value="fr_FR">🇫🇷 Français</Option>
                  <Option value="de_DE">🇩🇪 Deutsch</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Subscription</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="planCode"
                label="Subscription Plan"
                rules={[{ required: true, message: 'Plan is required' }]}
              >
                <Select 
                  loading={plansLoading}
                  onChange={handlePlanChange}
                  placeholder="Select a plan"
                >
                  {plans.map(plan => (
                    <Option key={plan.code} value={plan.code}>
                      <div>
                        <strong>{plan.name}</strong>
                        <div style={{ fontSize: '12px', color: '#888' }}>
                          {plan.description}
                        </div>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="billingCycle"
                label="Billing Cycle"
                rules={[{ required: true, message: 'Billing cycle is required' }]}
              >
                <Select onChange={handleCycleChange}>
                  <Option value="MONTHLY">💳 Monthly</Option>
                  <Option value="YEARLY">💰 Yearly (Save ~17%)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Price Preview */}
          {selectedPlan && (
            <div
              style={{
                background: '#f0f2f5',
                padding: '16px',
                borderRadius: '8px',
                marginTop: '16px',
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>Selected Plan:</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text>{selectedPlan.name}</Text>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      • {selectedPlan.maxUsers} users
                      {' • '}
                      {selectedPlan.maxBranches} branch(es)
                      {' • '}
                      {selectedPlan.maxOrdersMonthly?.toLocaleString()} orders/month
                    </div>
                    {selectedPlan.trialDays && selectedPlan.trialDays > 0 && (
                      <div style={{ fontSize: '12px', color: '#52c41a', marginTop: '4px' }}>
                        ✨ {selectedPlan.trialDays} days free trial
                      </div>
                    )}
                  </div>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Text strong>Price:</Text>
                  <div style={{ fontSize: '24px', color: '#1890ff', marginTop: '8px' }}>
                    €{getSelectedPrice()?.toFixed(2)}
                    <span style={{ fontSize: '14px', color: '#666' }}>
                      /{selectedCycle === 'MONTHLY' ? 'month' : 'year'}
                    </span>
                  </div>
                  {selectedCycle === 'YEARLY' && selectedPlan.priceMonthly && (
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                      (€{(getSelectedPrice()! / 12).toFixed(2)}/month)
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          )}

          <Form.Item name="currency" label="Currency" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};