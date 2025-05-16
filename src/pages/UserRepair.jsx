import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRepair = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [type, setType] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [userData, setUserData] = useState(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        handleGetUser();
    }, []);

    const handleGetUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/getUser/${auth.userId}`);
            setUserData(response.data);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            setError("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!type || !image1 || !image2 || !description || !userData) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        const formData = new FormData();
        formData.append("userId", userData?.data.userId);
        formData.append("type", type);
        formData.append("description", description);
        formData.append("image1", image1);
        formData.append("image2", image2);
        formData.append("location", userData?.data?.location);

        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/job`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("📌 แจ้งซ่อมเรียบร้อยแล้ว");
            navigate("/repair");
        } catch (error) {
            console.error(error);
            alert("❌ แจ้งซ่อมไม่สำเร็จ");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">📋 แจ้งซ่อม</h2>
                {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
                {userData ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium text-sm mb-1">ประเภทปัญหา</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">-- กรุณาเลือกประเภท --</option>
                                <option value="ไฟฟ้า">ไฟฟ้า</option>
                                <option value="ประปา">ประปา</option>
                                <option value="อาคาร">อาคาร</option>
                                <option value="ทั่วไป">ทั่วไป</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium text-sm mb-1">รายละเอียด</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="3"
                                placeholder="กรอกรายละเอียดเพิ่มเติม..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-sm mb-1">แนบรูปภาพที่ 1</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage1(e.target.files[0])}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-sm mb-1">แนบรูปภาพที่ 2</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage2(e.target.files[0])}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 active:scale-95 mt-5"
                            style={{ touchAction: "manipulation", cursor: "pointer" }}
                        >
                            ✅ ส่งแจ้งซ่อม
                        </button>
                    </form>
                ) : (
                    <p className="text-center text-gray-500">กำลังโหลดข้อมูลผู้ใช้...</p>
                )}
            </div>
        </div>
    );
};

export default UserRepair;
