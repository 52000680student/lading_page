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
    "label": "Name",
    "type": "string",
    "required": true
  },
  {
    "key": "url",
    "label": "URL",
    "type": "string",
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

export default function HealthInfoCategoryPage() {
  return (
    <AdminCRUD
      modelName="Health Info Category"
      modelPath="healthinfocategory"
      fields={fields}
    />
  )
}
