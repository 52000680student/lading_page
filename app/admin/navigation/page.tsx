'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = [
  {
    "key": "id",
    "label": "ID",
    "type": "string"
  },
  {
    "key": "testPackages",
    "label": "Test Packages",
    "type": "string",
    "required": true
  },
  {
    "key": "faq",
    "label": "FAQ",
    "type": "string",
    "required": true
  },
  {
    "key": "healthInfo",
    "label": "Health Info",
    "type": "string",
    "required": true
  },
  {
    "key": "about",
    "label": "About",
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

export default function NavigationPage() {
  return (
    <AdminCRUD
      modelName="Navigation"
      modelPath="navigation"
      fields={fields}
    />
  )
}
