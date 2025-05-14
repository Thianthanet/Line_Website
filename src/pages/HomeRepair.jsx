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
            const res = await axios.get('http://localhost:5002/api/getUser/' + auth.userId)
            setUserData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="grid grid-cols-1 place-items-center mt-10">
            <div className="text-center p-6 border rounded-md shadow-md w-full max-w-md">
                <h1 className="font-bold text-2xl mb-4">ข้อมูลผู้ใช้งาน</h1>
                <div>
                    {userData && (
                        <div>
                            <h1> {userData.firstName} {userData.lastName}</h1>
                            <h1>{userData.phone}</h1>
                            <h1>{userData.location}</h1>
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <a href="/user-repair" className="bg-red-500 text-white px-4 py-2 rounded-md text-center hover:bg-red-600">
                            แจ้งซ่อม
                        </a>
                        <a href="/history-repair" className="bg-blue-500 text-white px-4 py-2 rounded-md text-center hover:bg-blue-600">
                            ประวัติ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Repair