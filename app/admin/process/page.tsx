'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = [
  { key: 'id', label: 'ID', type: 'string' },
  { key: 'step', label: 'Bước', type: 'number', required: true },
  { key: 'title', label: 'Tên', type: 'richtext', required: true },
  { key: 'description', label: 'Mô tả', type: 'richtext', required: true },
  { key: 'icon', label: 'Icon', type: 'string', required: true },
  { key: 'createdAt', label: 'Thời gian tạo', type: 'datetime' },
  { key: 'updatedAt', label: 'Thời gian cập nhật', type: 'datetime' }
]

export default function ProcessPage() {
  return (
    <AdminCRUD
      modelName="Quy trình"
      modelPath="process"
      fields={fields}
    />
  )
}