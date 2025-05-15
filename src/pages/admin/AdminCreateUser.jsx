import React, { useState } from 'react'
import AdminLayout from './AdminLayout'
import axios from 'axios'

const AdminCreateUser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/create`, formData)
      alert('สร้างผู้ใช้งานสำเร็จ')
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        location: '',
      })
      console.log(res)
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error)
      alert('เกิดข้อผิดพลาดในการสร้างผู้ใช้')
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 bg-white shadow-lg rounded-xl max-w-lg mx-auto mt-10">
        <h1 className="font-bold text-4xl text-gray-700 text-center">เพิ่มผู้ใช้งานใหม่</h1>

        <div className="mt-8">
          <form className="space-y-6" onSubmit={handleSubmitForm}>
            {/* ชื่อ */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                ชื่อ
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ชื่อ"
              />
            </div>

            {/* นามสกุล */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                นามสกุล
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="นามสกุล"
              />
            </div>

            {/* เบอร์โทรศัพท์ */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                เบอร์โทรศัพท์
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="เบอร์โทรศัพท์"
              />
            </div>

            {/* สถานที่/แผนก */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                สถานที่/แผนก
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="สถานที่/แผนก"
              />
            </div>

            {/* ปุ่มบันทึก */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminCreateUser
