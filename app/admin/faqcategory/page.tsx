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
    "label": "Tên danh mục",
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

export default function FAQCategoryPage() {
  return (
    <AdminCRUD
      modelName="FAQ Category"
      modelPath="faqcategory"
      fields={fields}
    />
  )
}
