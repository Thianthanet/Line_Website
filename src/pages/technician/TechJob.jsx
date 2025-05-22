import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TechJob = () => {
    const { auth } = useAuth()
    const [userId, setUserId] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [customerName, setCustomerName] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [timestamp, setTimestamp] = useState('')
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const navigete = useNavigate()

    useEffect(() => {
        if (auth?.userId) {
            handleGetUser()
        }
    }, [auth?.userId])

    const handleGetUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/getUser/${auth.userId}`)
            setUserId(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleGetAllUser()
    }, [])

    const handleGetAllUser = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/allUsers`)
            setAllUsers(res.data)
            setFilteredUsers(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleCustomerNameChange = (e) => {
        const value = e.target.value
        setCustomerName(value)
        
        if (value.length > 0) {
            const filtered = allUsers.filter(user => 
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredUsers(filtered)
            setShowSuggestions(true)
        } else {
            setFilteredUsers(allUsers)
            setShowSuggestions(false)
        }
    }

    const selectCustomer = (user) => {
        setCustomerName(`${user.firstName} ${user.lastName}`)
        setShowSuggestions(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const rawTimestamp = timestamp
        const formattedTimestamp = rawTimestamp.replace("T", " ")
        const formData = new FormData()
        formData.append('userId', auth?.userId)
        formData.append('customerName', customerName)
        formData.append('type', type)
        formData.append('description', description)
        formData.append('location', location)
        formData.append('timestamp', formattedTimestamp)
        formData.append('image1', image1)
        formData.append('image2', image2)

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/job-tech`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log('Submit success:', response.data)
            alert(`📌 เปิดใบงานสำเร็จ`)
            navigete('/technician')
        } catch (error) {
            console.error('Submit error:', error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-yellow-100 p-4">
            <div className="max-w-md mx-auto bg-white/90 rounded-2xl shadow-xl p-6 border border-yellow-300">
                <h1 className="text-2xl font-bold text-yellow-600 text-center mb-6">📋 เปิดใบงาน</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ชื่อลูกค้า"
                            value={customerName}
                            onChange={handleCustomerNameChange}
                            onFocus={() => customerName && setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            autoComplete="off"
                        />
                        {showSuggestions && filteredUsers.length > 0 && (
                            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                {filteredUsers.map(user => (
                                    <li 
                                        key={user.id}
                                        className="px-4 py-2 hover:bg-yellow-50 cursor-pointer"
                                        onClick={() => selectCustomer(user)}
                                    >
                                        {user.firstName} {user.lastName} 
                                        <span className="text-xs text-gray-500 ml-2">({user.phone})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-yellow-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700"
                    >
                        <option value="">-- เลือกประเภทงาน --</option>
                        <option value="ไฟฟ้า">ไฟฟ้า</option>
                        <option value="ประปา">ประปา</option>
                        <option value="อาคาร">อาคาร</option>
                        <option value="ทั่วไป">ทั่วไป</option>
                    </select>

                    <textarea
                        placeholder="รายละเอียดงาน"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />

                    <div className="space-y-1">
                        <p className="font-semibold text-yellow-700">สถานที่:</p>
                        {['Gaysorn Tower', 'Gaysorn Center', 'Gaysorn Amarin'].map((loc) => (
                            <label key={loc} className="flex items-center space-x-2 text-sm text-gray-700">
                                <input
                                    type="radio"
                                    name="location"
                                    value={loc}
                                    checked={location === loc}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="text-yellow-500 focus:ring-yellow-400"
                                />
                                <span>{loc}</span>
                            </label>
                        ))}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-yellow-700 mb-1">
                            📅 เลือกวันและเวลาแจ้งดำเนินการ
                        </label>
                        <input
                            type="datetime-local"
                            value={timestamp}
                            onChange={(e) => setTimestamp(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            ตัวอย่าง: 2025-05-20 เวลา 11:25
                        </p>
                    </div>
                    <label className="block text-sm font-medium text-yellow-700">แนบรูปภาพ 1</label>
                    <input
                        type="file"
                        onChange={(e) => setImage1(e.target.files[0])}
                        className="w-full"
                    />
                    <label className="block text-sm font-medium text-yellow-700">แนบรูปภาพ 2</label>
                    <input
                        type="file"
                        onChange={(e) => setImage2(e.target.files[0])}
                        className="w-full"
                    />

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
                    >
                        ✅ ส่งใบงาน
                    </button>
                </form>
            </div>
        </div>
    )
}

export default TechJob