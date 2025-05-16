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
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">ประวัติการแจ้งซ่อม</h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-500">ยังไม่มีประวัติการแจ้งซ่อม</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-2 border">ID</th>
                <th className="py-2 px-2 border">รหัสงาน</th>
                <th className="py-2 px-2 border">ประเภท</th>
                <th className="py-2 px-2 border">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => {
                const status = translateStatus(item.status)
                return (
                  <tr key={item.id} className="text-center border-t hover:bg-gray-50">
                    <td className="py-2 px-2 border">{item.id}</td>
                    <td className="py-2 px-2 border">{item.jobId}</td>
                    <td className="py-2 px-2 border">{item.type}</td>
                    <td className="py-2 px-2 border">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.text}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default HistoryUser
