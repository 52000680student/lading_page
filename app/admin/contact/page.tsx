'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = [
  { key: 'id', label: 'ID', type: 'string' },
  { key: 'hotline', label: 'Hotline', type: 'string', required: true },
  { key: 'email', label: 'Email', type: 'string', required: true },
  { key: 'workingDays', label: 'Working Days', type: 'string', required: true },
  { key: 'workingTime', label: 'Working Time', type: 'string', required: true },
  { key: 'createdAt', label: 'Created At', type: 'datetime' },
  { key: 'updatedAt', label: 'Updated At', type: 'datetime' }
]

export default function ContactPage() {
  return (
    <AdminCRUD
      modelName="Contact"
      modelPath="contact"
      fields={fields}
    />
  )
}