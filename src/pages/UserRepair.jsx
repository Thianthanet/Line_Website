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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 p-4 flex items-center justify-center">
            <div className="w-full max-w-md bg-white/60 backdrop-blur-md border border-yellow-200 rounded-3xl shadow-2xl p-6">
                <h2 className="text-3xl font-extrabold text-center text-yellow-600 mb-6 tracking-wide drop-shadow-sm">🛠️ แจ้งซ่อม</h2>
                {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
                {userData ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-yellow-800 mb-1">ประเภทปัญหา</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                                className="w-full bg-white border border-yellow-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner"
                            >
                                <option value="">-- กรุณาเลือกประเภท --</option>
                                <option value="ไฟฟ้า">ไฟฟ้า</option>
                                <option value="ประปา">ประปา</option>
                                <option value="อาคาร">อาคาร</option>
                                <option value="ทั่วไป">ทั่วไป</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-yellow-800 mb-1">รายละเอียด</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                placeholder="กรอกรายละเอียดเพิ่มเติม..."
                                className="w-full bg-white border border-yellow-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-yellow-800 mb-1">แนบรูปภาพที่ 1</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage1(e.target.files[0])}
                                required
                                className="w-full text-sm bg-white border border-yellow-300 rounded-xl px-4 py-2 shadow-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-yellow-800 mb-1">แนบรูปภาพที่ 2</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage2(e.target.files[0])}
                                required
                                className="w-full text-sm bg-white border border-yellow-300 rounded-xl px-4 py-2 shadow-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-3 rounded-2xl shadow-lg transition-transform transform active:scale-95 mt-3"
                        >
                            ✨ ส่งแจ้งซ่อม
                        </button>
                    </form>
                ) : (
                    <p className="text-center text-blue-500">กำลังโหลดข้อมูลผู้ใช้...</p>
                )}
            </div>
        </div>
    );
};

export default UserRepair;
