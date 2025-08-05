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
    "label": "Hình ảnh banner",
    "type": "richtext",
    "required": true
  },
  {
    "key": "aboutBanner",
    "label": "Hình ảnh giới thiệu",
    "type": "richtext",
    "required": true
  },
  {
    "key": "facility",
    "label": "Hình ảnh dịch vụ",
    "type": "richtext",
    "required": true
  },
  {
    "key": "mainImage",
    "label": "Hình ảnh chính",
    "type": "richtext",
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

export default function ImagesPage() {
  return (
    <AdminCRUD
      modelName="Images"
      modelPath="images"
      fields={fields}
    />
  )
}
