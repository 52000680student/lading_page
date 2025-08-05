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
    "label": "Title",
    "type": "string",
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
    "label": "Order",
    "type": "number",
    "required": true
  },
  {
    "key": "createdAt",
    "label": "Created At",
    "type": "datetime"
  },
  {
    "key": "updatedAt",
    "label": "Updated At",
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
