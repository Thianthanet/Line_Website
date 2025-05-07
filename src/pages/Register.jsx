import { useState } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

const Register = () => {
    const { auth } = useAuth()
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await axios.post('http://localhost:3001/api/register', {
                userId: auth.userId,
                token: auth.token,
                firstname,
                lastname,
                phone,
                location
            })
            console.log("Create user successed!", response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <div className="grid grid-cols-1 place-items-center mt-10">
            <div className="text-center p-6 border rounded-md shadow-md w-full max-w-md">
                <h1 className="font-bold text-2xl mb-4">ลงทะเบียน</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="ชื่อ"
                        className="border shadow-md rounded-md p-2"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="นามสกุล"
                        className="border shadow-md rounded-md p-2"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="เบอร์โทรศัพท์"
                        className="border shadow-md rounded-md p-2"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <textarea
                        placeholder="สถานที่/แผนก"
                        className="border shadow-md rounded-md p-2"
                        rows={3}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "กำลังส่ง..." : "ส่งข้อมูล"}
                    </button>
                </form>
            </div>
        </div>

    )
}
export default Register