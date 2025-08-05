'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = [
  { key: 'id', label: 'ID', type: 'string' },
  { key: 'step', label: 'Step', type: 'number', required: true },
  { key: 'title', label: 'Title', type: 'string', required: true },
  { key: 'description', label: 'Description', type: 'string', required: true },
  { key: 'icon', label: 'Icon', type: 'string', required: true },
  { key: 'createdAt', label: 'Created At', type: 'datetime' },
  { key: 'updatedAt', label: 'Updated At', type: 'datetime' }
]

export default function ProcessPage() {
  return (
    <AdminCRUD
      modelName="Process"
      modelPath="process"
      fields={fields}
    />
  )
}