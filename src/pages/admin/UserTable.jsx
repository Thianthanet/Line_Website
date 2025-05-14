import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'


const UserTable = () => {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        handleGetUser()
    }, [])

    const handleGetUser = async () => {
        try {
            const res = await axios.get('http://localhost:5002/api/allUsers')
            console.log(res.data)
            setUserData(res.data)
        } catch (error) {
            console.error("Error", error)
        }
    }
    return (
        <AdminLayout>
            <div className="overflow-x-auto p-4">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6">ID</th>
                            <th className="py-3 px-6">Firstname</th>
                            <th className="py-3 px-6">Lastname</th>
                            <th className="py-3 px-6">Phone</th>
                            <th className="py-3 px-6">Role</th>
                            <th className="py-3 px-6">Location</th>
                            <th className="py-3 px-6">UserID</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {userData?.map((item) => (
                            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-2 px-6">{item.id}</td>
                                <td className="py-2 px-6">{item.firstName}</td>
                                <td className="py-2 px-6">{item.lastName}</td>
                                <td className="py-2 px-6">{item.phone}</td>
                                <td className="py-2 px-6">{item.role}</td>
                                <td className="py-2 px-6">{item.location}</td>
                                <td className="py-2 px-6 break-all">{item.userId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>

    )
}

export default UserTable