// src/pages/LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const onFinish = async (values: LoginFormValues) => {
    try {
      // ✅ Usa il metodo login dall'AuthContext
      await login(values.username, values.password);
      
      message.success('Login effettuato con successo!');
      navigate('/dashboard');
    } catch (error: any) {
      // ✅ Errori gestiti automaticamente dall'errorInterceptor
      // Ma possiamo mostrare un messaggio custom se vogliamo
      message.error('Username o password non corretti');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5',
    }}>
      <Card title="RMP Platform Login" style={{ width: 400 }}>
        <Form<LoginFormValues>
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Inserisci username!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Username" 
              size="large" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Inserisci password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              block 
              size="large"
            >
              Accedi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};