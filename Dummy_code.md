import React from 'react';
import { Card } from '@/components/ui/card';

// Component
const TableCard = ({ tableName, columns }) => (

  <div className="border rounded-lg p-4 bg-white shadow-sm w-64">
    <h3 className="font-bold text-lg border-b pb-2 mb-2">{tableName}</h3>
    <div className="space-y-1">
      {columns.map((col, i) => (
        <div key={i} className="flex items-center text-sm">
          <span className={`${col.key === 'PK' ? 'font-bold' : ''} ${col.key === 'FK' ? 'text-blue-600' : ''}`}>
            {col.name}
          </span>
          <span className="text-gray-500 ml-2">({col.type})</span>
          {col.key && (
            <span className="ml-2 text-xs px-1 rounded bg-gray-100">
              {col.key}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

//Model
const SchemaViewer = () => {
const tables = {
customers: [
{ name: 'id', type: 'INT', key: 'PK' },
{ name: 'name', type: 'VARCHAR(100)' },
{ name: 'email', type: 'VARCHAR(100)' },
{ name: 'created_at', type: 'TIMESTAMP' }
],
orders: [
{ name: 'id', type: 'INT', key: 'PK' },
{ name: 'customer_id', type: 'INT', key: 'FK' },
{ name: 'category_id', type: 'INT', key: 'FK' },
{ name: 'total_amount', type: 'DECIMAL(10,2)' },
{ name: 'order_date', type: 'TIMESTAMP' }
],
products: [
{ name: 'id', type: 'INT', key: 'PK' },
{ name: 'name', type: 'VARCHAR(50)' },
{ name: 'price', type: 'FLOAT' }
],
categories: [
{ name: 'id', type: 'INT', key: 'PK' },
{ name: 'name', type: 'VARCHAR(50)' }
],
product_categories: [
{ name: 'product_id', type: 'INT', key: 'PK,FK' },
{ name: 'category_id', type: 'INT', key: 'PK,FK' }
]
};

//HTML or JSX if React
return (
<Card className="p-6 bg-gray-50">
<h2 className="text-2xl font-bold mb-6">Database Schema</h2>
<div className="flex flex-wrap gap-6">
{Object.entries(tables).map(([tableName, columns]) => (
<TableCard key={tableName} tableName={tableName} columns={columns} />
))}
</div>
<div className="mt-6 text-sm text-gray-600">
<p>Legend:</p>
<ul className="list-disc ml-4">
<li><strong>PK</strong> - Primary Key</li>
<li><span className="text-blue-600">FK</span> - Foreign Key</li>
</ul>
</div>
</Card>
);
};

export default SchemaViewer;
