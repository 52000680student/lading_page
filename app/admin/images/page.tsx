'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = [
  {
    "key": "id",
    "label": "ID",
    "type": "string"
  },
  {
    "key": "banner",
    "label": "Banner",
    "type": "string",
    "required": true
  },
  {
    "key": "aboutBanner",
    "label": "About Banner",
    "type": "string",
    "required": true
  },
  {
    "key": "facility",
    "label": "Facility",
    "type": "string",
    "required": true
  },
  {
    "key": "mainImage",
    "label": "Main Image",
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

export default function ImagesPage() {
  return (
    <AdminCRUD
      modelName="Images"
      modelPath="images"
      fields={fields}
    />
  )
}
