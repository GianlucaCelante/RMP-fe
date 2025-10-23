// src/components/PageHeader.tsx

import React from 'react';
import { Space, Typography } from 'antd';

const { Title, Text } = Typography;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  extra?: React.ReactNode;
}

/**
 * Reusable page header component
 * Shows title, optional subtitle, and action buttons
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  extra,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
      }}
    >
      <div>
        <Title level={2} style={{ margin: 0, color: '#1a1f36' }}>
          {title}
        </Title>
        {subtitle && (
          <Text style={{ color: '#697386', fontSize: 14 }}>
            {subtitle}
          </Text>
        )}
      </div>
      {extra && (
        <Space size="middle">
          {extra}
        </Space>
      )}
    </div>
  );
};