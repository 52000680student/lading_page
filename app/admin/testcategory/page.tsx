'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = [
  {
    "key": "id",
    "label": "ID",
    "type": "string"
  },
  {
    "key": "name",
    "label": "Tên",
    "type": "richtext",
    "required": true
  },
  {
    "key": "url",
    "label": "Link",
    "type": "string",
    "required": true
  },
  {
    "key": "description",
    "label": "Mô tả",
    "type": "richtext"
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

export default function TestCategoryPage() {
  return (
    <AdminCRUD
      modelName="Test Category"
      modelPath="testcategory"
      fields={fields}
    />
  )
}
