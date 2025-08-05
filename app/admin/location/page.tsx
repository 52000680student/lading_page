'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = [
  {
    "key": "id",
    "label": "ID",
    "type": "string"
  },
  {
    "key": "address",
    "label": "Address",
    "type": "string",
    "required": true
  },
  {
    "key": "hours",
    "label": "Hours",
    "type": "string",
    "required": true
  },
  {
    "key": "contactId",
    "label": "Contact ID",
    "type": "string",
    "required": true
  }
]

export default function LocationPage() {
  return (
    <AdminCRUD
      modelName="Location"
      modelPath="location"
      fields={fields}
    />
  )
}
