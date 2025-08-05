const fs = require('fs')
const path = require('path')

// Model definitions with their fields
const models = [
  {
    name: 'Location',
    path: 'location',
    fields: [
      { key: 'id', label: 'ID', type: 'string' },
      { key: 'address', label: 'Address', type: 'string', required: true },
      { key: 'hours', label: 'Hours', type: 'string', required: true },
      { key: 'contactId', label: 'Contact ID', type: 'string', required: true }
    ]
  },
  {
    name: 'Test Category',
    path: 'testcategory',
    fields: [
      { key: 'id', label: 'ID', type: 'string' },
      { key: 'name', label: 'Name', type: 'string', required: true },
      { key: 'url', label: 'URL', type: 'string', required: true },
      { key: 'description', label: 'Description', type: 'string' },
      { key: 'createdAt', label: 'Created At', type: 'datetime' },
      { key: 'updatedAt', label: 'Updated At', type: 'datetime' }
    ]
  },
  {
    name: 'Advantage',
    path: 'advantage',
    fields: [
      { key: 'id', label: 'ID', type: 'string' },
      { key: 'title', label: 'Title', type: 'string', required: true },
      { key: 'icon', label: 'Icon', type: 'string', required: true },
      { key: 'order', label: 'Order', type: 'number', required: true },
      { key: 'createdAt', label: 'Created At', type: 'datetime' },
      { key: 'updatedAt', label: 'Updated At', type: 'datetime' }
    ]
  },
  {
    name: 'Navigation',
    path: 'navigation',
    fields: [
      { key: 'id', label: 'ID', type: 'string' },
      { key: 'testPackages', label: 'Test Packages', type: 'string', required: true },
      { key: 'faq', label: 'FAQ', type: 'string', required: true },
      { key: 'healthInfo', label: 'Health Info', type: 'string', required: true },
      { key: 'about', label: 'About', type: 'string', required: true },
      { key: 'createdAt', label: 'Created At', type: 'datetime' },
      { key: 'updatedAt', label: 'Updated At', type: 'datetime' }
    ]
  },
  {
    name: 'FAQ Category',
    path: 'faqcategory',
    fields: [
      { key: 'id', label: 'ID', type: 'string' },
      { key: 'name', label: 'Name', type: 'string', required: true },
      { key: 'url', label: 'URL', type: 'string', required: true },
      { key: 'createdAt', label: 'Created At', type: 'datetime' },
      { key: 'updatedAt', label: 'Updated At', type: 'datetime' }
    ]
  },
  {
    name: 'Health Info Category',
    path: 'healthinfocategory',
    fields: [
      { key: 'id', label: 'ID', type: 'string' },
      { key: 'name', label: 'Name', type: 'string', required: true },
      { key: 'url', label: 'URL', type: 'string', required: true },
      { key: 'createdAt', label: 'Created At', type: 'datetime' },
      { key: 'updatedAt', label: 'Updated At', type: 'datetime' }
    ]
  },
  {
    name: 'Social Media',
    path: 'socialmedia',
    fields: [
      { key: 'id', label: 'ID', type: 'string' },
      { key: 'platform', label: 'Platform', type: 'string', required: true },
      { key: 'url', label: 'URL', type: 'string', required: true },
      { key: 'createdAt', label: 'Created At', type: 'datetime' },
      { key: 'updatedAt', label: 'Updated At', type: 'datetime' }
    ]
  },
  {
    name: 'Legal Page',
    path: 'legalpage',
    fields: [
      { key: 'id', label: 'ID', type: 'string' },
      { key: 'name', label: 'Name', type: 'string', required: true },
      { key: 'url', label: 'URL', type: 'string', required: true },
      { key: 'createdAt', label: 'Created At', type: 'datetime' },
      { key: 'updatedAt', label: 'Updated At', type: 'datetime' }
    ]
  },
  {
    name: 'Images',
    path: 'images',
    fields: [
      { key: 'id', label: 'ID', type: 'string' },
      { key: 'banner', label: 'Banner', type: 'string', required: true },
      { key: 'aboutBanner', label: 'About Banner', type: 'string', required: true },
      { key: 'facility', label: 'Facility', type: 'string', required: true },
      { key: 'mainImage', label: 'Main Image', type: 'string', required: true },
      { key: 'createdAt', label: 'Created At', type: 'datetime' },
      { key: 'updatedAt', label: 'Updated At', type: 'datetime' }
    ]
  },
  {
    name: 'App Data',
    path: 'appdata',
    fields: [
      { key: 'id', label: 'ID', type: 'string' },
      { key: 'copyright', label: 'Copyright', type: 'string', required: true },
      { key: 'createdAt', label: 'Created At', type: 'datetime' },
      { key: 'updatedAt', label: 'Updated At', type: 'datetime' }
    ]
  }
]

// Template for admin page
const pageTemplate = (modelName, modelPath, fields) => `'use client'

import AdminCRUD from '@/components/AdminCRUD'

const fields = ${JSON.stringify(fields, null, 2)}

export default function ${modelName.replace(/\s+/g, '')}Page() {
  return (
    <AdminCRUD
      modelName="${modelName}"
      modelPath="${modelPath}"
      fields={fields}
    />
  )
}
`

// Generate pages
models.forEach(model => {
  const dirPath = path.join(__dirname, '..', 'app', 'admin', model.path)
  const filePath = path.join(dirPath, 'page.tsx')
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
  
  // Write the page file
  const content = pageTemplate(model.name, model.path, model.fields)
  fs.writeFileSync(filePath, content)
  
  console.log(`Generated: ${filePath}`)
})

console.log('All admin pages generated successfully!')