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
    "label": "Địa chỉ",
    "type": "richtext",
    "required": true
  },
  {
    "key": "hours",
    "label": "Giờ",
    "type": "richtext",
    "required": true
  },
  {
    "key": "contactId",
    "label": "ID liên hệ",
    "type": "string",
    "required": true
  }
]

export default function LocationPage() {
  return (
    <AdminCRUD
      modelName="địa điểm"
      modelPath="location"
      fields={fields}
    />
  )
}
