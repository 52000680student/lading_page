'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = [
  {
    "key": "id",
    "label": "ID",
    "type": "string"
  },
  {
    "key": "title",
    "label": "Tiêu đề",
    "type": "richtext",
    "required": true
  },
  {
    "key": "icon",
    "label": "Icon",
    "type": "string",
    "required": true
  },
  {
    "key": "order",
    "label": "Thứ tự",
    "type": "number",
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

export default function AdvantagePage() {
  return (
    <AdminCRUD
      modelName="Advantage"
      modelPath="advantage"
      fields={fields}
    />
  )
}
