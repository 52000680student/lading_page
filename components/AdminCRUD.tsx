'use client'

import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import RichTextEditor from './RichTextEditor'

interface AdminCRUDProps {
  modelName: string
  modelPath: string
  fields: { key: string; label: string; type: string; required?: boolean }[]
}

export default function AdminCRUD({ modelName, modelPath, fields }: AdminCRUDProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/admin/${modelPath}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
      } else {
        showMessage('error', 'Không thể tải dữ liệu')
      }
    } catch (error) {
      showMessage('error', 'Lỗi khi tải dữ liệu')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleCreate = () => {
    setEditingItem(null)
    setFormData({})
    setShowModal(true)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setFormData(item)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa mục này không?')) return

    try {
      const response = await fetch(`/api/admin/${modelPath}?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        showMessage('success', 'Xóa mục thành công')
        fetchData()
      } else {
        showMessage('error', 'Không thể xóa mục')
      }
    } catch (error) {
      showMessage('error', 'Lỗi khi xóa mục')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = `/api/admin/${modelPath}`
      const method = editingItem ? 'PUT' : 'POST'
      const body = editingItem ? { ...formData, id: editingItem.id } : formData
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      
      if (response.ok) {
        showMessage('success', `${editingItem ? 'Cập nhật' : 'Tạo'} mục thành công`)
        setShowModal(false)
        fetchData()
      } else {
        showMessage('error', `Không thể ${editingItem ? 'cập nhật' : 'tạo'} mục`)
      }
    } catch (error) {
      showMessage('error', `Lỗi khi ${editingItem ? 'cập nhật' : 'tạo'} mục`)
    }
  }

  const decodeHtmlEntities = (text: string) => {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = text
    return textarea.value
  }

  const renderFieldValue = (item: any, field: any) => {
    const value = item[field.key]
    if (field.type === 'boolean') {
      return value ? 'Có' : 'Không'
    }
    if (field.type === 'datetime') {
      return value ? new Date(value).toLocaleString() : ''
    }
    // For rich text fields, strip HTML tags and decode HTML entities for table display
    if (field.type === 'richtext' || field.key.toLowerCase().includes('description') || field.key.toLowerCase().includes('content') || field.key.toLowerCase().includes('detail')) {
      if (!value) return ''
      const strippedHtml = value.replace(/<[^>]*>/g, '')
      const decodedText = decodeHtmlEntities(strippedHtml)
      return decodedText.substring(0, 100) + (decodedText.length > 100 ? '...' : '')
    }
    return value || ''
  }

  return (
    <AdminLayout title={`Quản lý ${modelName}`}>
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Quản lý {modelName}</h2>
              <p className="text-sm text-gray-600 mt-1">Thêm, sửa, xóa và quản lý dữ liệu {modelName.toLowerCase()}</p>
            </div>
            <button
              onClick={handleCreate}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Thêm {modelName}</span>
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`px-8 py-4 border-l-4 ${message.type === 'success' ? 'bg-green-50 text-green-800 border-green-400' : 'bg-red-50 text-red-800 border-red-400'}`}>
            <div className="flex items-center">
              {message.type === 'success' ? (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <div className="text-gray-600">Đang tải dữ liệu...</div>
              </div>
            </div>
          ) : data.length === 0 ? (
            <div className="p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="text-gray-500">Chưa có dữ liệu nào</div>
                <button
                  onClick={handleCreate}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Thêm mục đầu tiên
                </button>
              </div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  {fields.map((field, index) => (
                    <th key={field.key} className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                      field.key === 'id' ? 'w-20' : 
                      field.key === 'name' ? 'w-48' :
                      field.key === 'url' ? 'w-64' :
                      field.key === 'description' ? 'w-80' :
                      'w-32'
                    }`}>
                      {field.label}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {data.map((item, index) => (
                  <tr key={item.id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    {fields.map((field) => (
                      <td key={field.key} className="px-6 py-4 text-sm text-gray-900 truncate">
                        <div className="truncate" title={renderFieldValue(item, field)}>
                          {renderFieldValue(item, field)}
                        </div>
                      </td>
                    ))}
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-150"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-150"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative mx-auto max-w-4xl w-full bg-white rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingItem ? 'Chỉnh sửa' : 'Thêm mới'} {modelName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {editingItem ? 'Cập nhật thông tin' : 'Điền thông tin để tạo mới'}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {fields.filter(f => f.key !== 'id' && f.key !== 'createdAt' && f.key !== 'updatedAt').map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'boolean' ? (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData[field.key] || false}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.checked })}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="ml-2 text-sm text-gray-600">{formData[field.key] ? 'Có' : 'Không'}</span>
                      </div>
                    ) : field.type === 'number' ? (
                      <input
                        type="number"
                        value={formData[field.key] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.key]: parseInt(e.target.value) || 0 })}
                        required={field.required}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                      />
                    ) : field.type === 'richtext' || field.key.toLowerCase().includes('description') || field.key.toLowerCase().includes('content') || field.key.toLowerCase().includes('detail') ? (
                      <RichTextEditor
                        value={formData[field.key] || ''}
                        onChange={(content) => setFormData({ ...formData, [field.key]: content })}
                        placeholder={`Nhập ${field.label.toLowerCase()}...`}
                        height={250}
                      />
                    ) : (
                      <input
                        type="text"
                        value={formData[field.key] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        required={field.required}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                      />
                    )}
                  </div>
                ))}
                
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-150"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-150 shadow-lg hover:shadow-xl"
                  >
                    {editingItem ? 'Cập nhật' : 'Tạo mới'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}