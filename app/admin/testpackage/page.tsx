'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = [
  { key: 'id', label: 'ID', type: 'string' },
  { key: 'name', label: 'Name', type: 'string', required: true },
  { key: 'category', label: 'Category', type: 'string', required: true },
  { key: 'gender', label: 'Gender', type: 'string', required: true },
  { key: 'price', label: 'Price', type: 'number', required: true },
  { key: 'indicators', label: 'Indicators', type: 'number', required: true },
  { key: 'resultTime', label: 'Result Time', type: 'string', required: true },
  { key: 'icon', label: 'Icon', type: 'string', required: true },
  { key: 'featured', label: 'Featured', type: 'boolean' },
  { key: 'image', label: 'Image', type: 'string', required: true },
  { key: 'createdAt', label: 'Created At', type: 'datetime' },
  { key: 'updatedAt', label: 'Updated At', type: 'datetime' }
]

export default function TestPackagePage() {
  return (
    <AdminCRUD
      modelName="Test Package"
      modelPath="testpackage"
      fields={fields}
    />
  )
}