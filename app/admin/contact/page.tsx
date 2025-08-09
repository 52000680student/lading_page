'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = [
  { key: 'id', label: 'ID', type: 'string' },
  { key: 'hotline', label: 'Số điện thoại', type: 'string', required: true },
  { key: 'email', label: 'Email', type: 'string', required: true },
  { key: 'workingDays', label: 'Cung cấp dịch vụ', type: 'richtext', required: true },
  { key: 'workingTime', label: 'Thời gian làm việc', type: 'richtext', required: true },
  { key: 'createdAt', label: 'Thời gian tạo', type: 'datetime' },
  { key: 'updatedAt', label: 'Thời gian cập nhật', type: 'datetime' }
]

export default function ContactPage() {
  return (
    <AdminCRUD
      modelName="liên hệ"
      modelPath="contact"
      fields={fields}
    />
  )
}