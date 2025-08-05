'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = [
  {
    "key": "id",
    "label": "ID",
    "type": "string"
  },
  {
    "key": "copyright",
    "label": "Bản quyền",
    "type": "richtext",
    "required": true
  },
  {
    "key": "createdAt",
    "label": "Thời gian tạo",
    "type": "datetime"
  },
  {
    "key": "updatedAt",
    "label": "Thời gian cập nhật",
    "type": "datetime"
  }
]

export default function AppDataPage() {
  return (
    <AdminCRUD
      modelName="App Data"
      modelPath="appdata"
      fields={fields}
    />
  )
}
