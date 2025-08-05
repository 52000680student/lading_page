'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = [
  {
    "key": "id",
    "label": "ID",
    "type": "string"
  },
  {
    "key": "platform",
    "label": "Platform",
    "type": "richtext",
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

export default function SocialMediaPage() {
  return (
    <AdminCRUD
      modelName="Social Media"
      modelPath="socialmedia"
      fields={fields}
    />
  )
}
