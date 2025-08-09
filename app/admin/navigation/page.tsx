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
    "type": "richtext",
    "required": true
  },
  {
    "key": "faq",
    "label": "FAQ",
    "type": "richtext",
    "required": true
  },
  {
    "key": "healthInfo",
    "label": "Health Info",
    "type": "richtext",
    "required": true
  },
  {
    "key": "about",
    "label": "About",
    "type": "richtext",
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
      modelName="điều hướng"
      modelPath="navigation"
      fields={fields}
    />
  )
}
