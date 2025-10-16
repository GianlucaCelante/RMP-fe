// src/pages/TenantsPage.tsx
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { TenantsService } from '../api/generated';

export const TenantsPage: React.FC = () => {
  const [tenants, setTenants] = useState<any[]>([]);  // ✅ Usa any[] per ora
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    setLoading(true);
    try {
      const data = await TenantsService.getAllTenants();
      
      // ✅ Il data potrebbe essere un oggetto con una proprietà content/data
      // Controlla la struttura del response
      console.log('Tenants response:', data);
      
      // Se data è un array
      if (Array.isArray(data)) {
        setTenants(data);
      }
      // Se data ha una proprietà content/items/data
      else if (data && typeof data === 'object') {
        setTenants((data as any).content || (data as any).data || []);
      }
    } catch (error) {
      console.error('Failed to load tenants', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Tenants</h1>
      <Table
        dataSource={tenants}
        loading={loading}
        rowKey="id"
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Code', dataIndex: 'code', key: 'code' },
          { title: 'Status', dataIndex: 'status', key: 'status' },
        ]}
      />
    </div>
  );
};