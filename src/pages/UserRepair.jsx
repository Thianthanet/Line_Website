import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRepair = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [type, setType] = useState('')
     const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [userData, setUserData] = useState(null);
    const [description, setDescription] = useState('')
    const [error, setError] = useState('');

    useEffect(() => {
        handleGetUser();
    }, []);


    const handleGetUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5002/api/getUser/${auth.userId}`);
            setUserData(response.data);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            setError("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('userId', userData?.data.userId)
        formData.append('type', type)
        formData.append('description', description)
        formData.append('image1', image1)
        formData.append('image2', image2)
        formData.append('location', userData?.data?.location)

        try {
            await axios.post('http://localhost:5002/api/job', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            alert("📌 แจ้งซ่อมเรียบร้อยแล้ว")
            navigate('/repair')
        } catch (error) {
            console.error(error)
            alert("❌ แจ้งซ่อมไม่สำเร็จ")
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-6">แจ้งซ่อม</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">ประเภทปัญหา</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="border p-2 w-full rounded"
                    >
                        <option value="">-- กรุณาเลือกประเภท --</option>
                        <option value="ไฟฟ้า">ไฟฟ้า</option>
                        <option value="ประปา">ประปา</option>
                        <option value="อาคาร">อาคาร</option>
                        <option value="ทั่วไป">ทั่วไป</option>
                    </select>
                </div>


                <div>
                    <label className="block font-medium">รายละเอียด</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="border p-2 w-full rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium">แนบรูปภาพที่ 1</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage1(e.target.files[0])}
                        required
                        className="border p-2 w-full rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium">แนบรูปภาพที่ 2</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage2(e.target.files[0])}
                        required
                        className="border p-2 w-full rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    ส่งแจ้งซ่อม
                </button>
            </form>
        </div>
    );
};

export default UserRepair;