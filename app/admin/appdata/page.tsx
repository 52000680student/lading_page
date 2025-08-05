'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = [
  {
    "key": "id",
    "label": "ID",
    "type": "string"
  },
  {
    "key": "copyright",
    "label": "Copyright",
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

export default function AppDataPage() {
  return (
    <AdminCRUD
      modelName="App Data"
      modelPath="appdata"
      fields={fields}
    />
  )
}
