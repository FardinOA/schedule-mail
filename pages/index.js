import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import readXlsxFile from "read-excel-file";
export default function Home() {
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
            console.log(jsonData);
        });
    };
    return (
        <main className=" flex justify-center items-center h-screen ">
            <input
                onChange={handleFileUpload}
                type="file"
                className="file-input file-input-bordered file-input-accent   focus:outline-none w-full max-w-xs"
            />
        </main>
    );
}
