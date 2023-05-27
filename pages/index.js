import axios from "axios";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
import readXlsxFile from "read-excel-file";
export default function Home() {
    const [excelData, setExcelData] = useState(null);
    const router = useRouter();
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
    console.log(excelData);
    const submitHandeler = async (e) => {
        e.preventDefault();
        const res = await axios.post("/api/sendEmail", excelData);
        console.log(res);
        alert("All Email are Scheduled");
        setExcelData(null);
    };

    return (
        <main className="h-screen bg-gray-300   ">
            <div className="  w-full  h-full flex space-y-4 flex-col justify-center items-center  ">
                <div className="   ">
                    <div className=" ">
                        <table className="  table text-[10px] ">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className=" p-0 text-center "></th>
                                    <th className=" p-0">EmailSubject</th>
                                    <th className=" p-0 text-center ">
                                        EmailBody
                                    </th>
                                    <th className=" p-0 text-center ">Email</th>
                                    <th className=" p-0 text-center ">
                                        SendDate
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className=" p-0 text-center ">1</th>
                                    <td>Test subject</td>
                                    <td>Test body</td>
                                    <td>test@gmail.com</td>
                                    <td>1 1 20 27 5 *</td>
                                </tr>
                                <tr>
                                    <th className=" p-0 text-center ">1</th>
                                    <td>Test subject</td>
                                    <td>Test body</td>
                                    <td>test@gmail.com</td>
                                    <td>1 1 20 27 5 *</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <img src="/dateFormat.png" alt="" className=" h-[15rem] " />
                </div>
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
                        disabled={excelData ? false : true}
                        className={` ${
                            !excelData && " hover:cursor-wait "
                        } bg-[#37CDBE] py-2 rounded-md focus:outline-none w-full max-w-xs transition-all hover:text-white hover:bg-[#218679] `}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </main>
    );
}
