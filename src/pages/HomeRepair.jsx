import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

const Repair = () => {
    const { auth } = useAuth()
    const [userData, setUserData] = useState([])

    useEffect(() => {
        if (auth?.userId) {
            handleGetUserId()
        }
    }, [auth.userId])

    const handleGetUserId = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/getUser/` + auth.userId)
            setUserData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-sky-200 flex items-center justify-center p-4">
            <div className="bg-white/70 backdrop-blur-lg border border-yellow-300 rounded-3xl shadow-xl p-8 w-full max-w-md text-gray-800">
                <h1 className="text-3xl font-semibold mb-6 text-center text-yellow-500">ข้อมูลผู้ใช้งาน</h1>
                <div className="space-y-2 text-lg font-medium">
                    {userData && (
                        <>
                            <p><span className="text-yellow-600">ชื่อ:</span> {userData.firstName} {userData.lastName}</p>
                            <p><span className="text-yellow-600">เบอร์โทร:</span> {userData.phone}</p>
                            <p><span className="text-yellow-600">ที่อยู่:</span> {userData.location}</p>
                        </>
                    )}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <a
                        href="/user-repair"
                        className="bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 text-white py-2 rounded-xl text-center shadow-md"
                    >
                        แจ้งซ่อม
                    </a>
                    <a
                        href="/history"
                        className="bg-sky-400 hover:bg-sky-500 transition-all duration-300 text-white py-2 rounded-xl text-center shadow-md"
                    >
                        ประวัติ
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Repair
