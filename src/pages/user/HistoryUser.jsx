import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const HistoryUser = () => {
  const { auth } = useAuth()
  const [history, setHistory] = useState([])

  useEffect(() => {
    handleGetHistory()
  }, [])

  const handleGetHistory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/history-repair/${auth.userId}`)
      setHistory(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const translateStatus = (status) => {
    switch (status) {
      case 'PENDING':
        return { text: 'รอรับเรื่อง', color: 'text-white bg-red-500' }
      case 'IN_PROGRESS':
        return { text: 'กำลังดำเนินการ', color: 'text-white bg-yellow-500' }
      case 'COMPLETED':
        return { text: 'เสร็จสิ้นแล้ว', color: 'text-white bg-green-500' }
      default:
        return { text: status, color: 'text-gray-600 bg-gray-100' }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-yellow-50 p-4">
      <div className="max-w-xl mx-auto bg-white bg-opacity-70 rounded-xl shadow-lg p-4 backdrop-blur-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-yellow-700 mb-4 text-center border-b border-yellow-300 pb-2">
          ประวัติการแจ้งซ่อม
        </h1>

        {history.length === 0 ? (
          <p className="text-center text-gray-500">ยังไม่มีประวัติการแจ้งซ่อม</p>
        ) : (
          <div className="space-y-4">
            {history.map((item) => {
              const status = translateStatus(item.status)
              return (
                <div
                  key={item.id}
                  className="border border-yellow-200 rounded-lg p-4 bg-white bg-opacity-90 shadow-md"
                >
                  <div className="mb-2 text-sm text-gray-600">
                    <strong className="text-yellow-700">ID:</strong> {item.id}
                  </div>
                  <div className="mb-2 text-sm text-gray-600">
                    <strong className="text-yellow-700">รหัสงาน:</strong> {item.jobId}
                  </div>
                  <div className="mb-2 text-sm text-gray-600">
                    <strong className="text-yellow-700">ประเภท:</strong> {item.type}
                  </div>
                  <div className="text-sm">
                    <strong className="text-yellow-700">สถานะ:</strong>{' '}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      {status.text}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryUser
