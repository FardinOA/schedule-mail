import axios from "axios";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
import readXlsxFile from "read-excel-file";
export default function Home() {
    const [excelData, setExcelData] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        readXlsxFile(file).then((rows) => {
            const headers = rows[0];
            const jsonData = [];
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                const item = {};
                for (let j = 0; j < row.length; j++) {
                    item[headers[j]] = row[j];
                }
                jsonData.push(item);
            }
            setExcelData(jsonData);
        });
    };

    const submitHandeler = async (e) => {
        e.preventDefault();

        const res = await axios.post("/api/sendEmail", excelData);
        console.log(res);
        alert("All Email are Scheduled");
        setExcelData([]);
    };

    return (
        <main className="  w-full h-screen flex justify-center items-center  ">
            <form
                onSubmit={submitHandeler}
                action=""
                className=" flex flex-col space-y-6   "
            >
                <input
                    onChange={handleFileUpload}
                    type="file"
                    className="  file-input file-input-bordered file-input-accent   focus:outline-none w-full max-w-xs"
                />
                <button
                    type="submit"
                    className=" bg-[#37CDBE] py-2 rounded-md focus:outline-none w-full max-w-xs"
                >
                    Submit
                </button>
            </form>
        </main>
    );
}
