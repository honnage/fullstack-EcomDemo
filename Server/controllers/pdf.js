const { SerialPort } = require("serialport");
const iconv = require("iconv-lite"); // ใช้ iconv-lite เพื่อแปลงภาษาไทย

exports.pdf = async (req, res) => {
    try {
        // ตั้งค่าพอร์ตของเครื่องพิมพ์ (เปลี่ยนเป็นพอร์ตที่ใช้งานจริง)
        const printerPort = new SerialPort({
            path: "COM3",
            baudRate: 9600,
            autoOpen: true, // เปิดพอร์ตอัตโนมัติ เพื่อลดดีเลย์
        });

        // ESC/POS Commands: ตั้งค่าภาษาไทย + จัดรูปแบบตัวหนา
        const escposCommands = Buffer.from([
            0x1B, 0x61, 0x01, // จัดชื่อร้านค้าให้อยู่ตรงกลาง
            0x1B, 0x45, 0x01, // เปิดตัวหนา
        ]);

        // ฟังก์ชันจัดสินค้าให้ซ้ายสุดและราคาขวาสุด (กำหนดความกว้าง 32 ตัวอักษร)
        const formatItem = (name, price) => {
            const maxWidth = 32; // ความกว้างของบรรทัดในเครื่องพิมพ์ (เปลี่ยนได้ตามเครื่อง)
            const nameWidth = maxWidth - price.length; // ปรับช่องว่างอัตโนมัติ
            return name.padEnd(nameWidth, " ") + price.padStart(price.length, " ");
        };

        // ข้อความใบเสร็จ (เพิ่มพื้นที่ด้านล่าง)
        const receiptText = `
            ร้านค้า ABC
            \x1B\x61\x00------------------------------
            ${formatItem("Prod A", "10.00")}
            ${formatItem("ขนมปัง", "20.00")}
            ------------------------------
            \x1B\x45\x01${formatItem("รวมทั้งสิ้น", "30.00 บาท")}\x1B\x45\x00
            ขอบคุณที่ใช้บริการ
            \n\n\n\n\x1B\x64\x05`.replace(/^\s+/gm, ""); // ลบช่องว่างหน้าบรรทัดทั้งหมด

        // แปลงข้อความเป็น CP874 โดยใช้ iconv-lite
        const encodedText = iconv.encode(receiptText, "win874");

        // รวม ESC/POS Command กับข้อความที่แปลงแล้ว
        const finalData = Buffer.concat([escposCommands, encodedText]);

        // ส่งข้อมูลไปที่เครื่องพิมพ์ (เร็วขึ้น)
        printerPort.write(finalData, (err) => {
            if (err) {
                console.error("Error ส่งข้อมูลไปเครื่องพิมพ์:", err);
                return res.status(500).json({ message: `Error: ${err.message}` });
            }

            console.log("พิมพ์ใบเสร็จสำเร็จ!");
            res.status(200).json({ message: "พิมพ์ใบเสร็จสำเร็จ!" });

            // ปิดพอร์ตหลังพิมพ์เสร็จ เพื่อลดการใช้ทรัพยากร
            setTimeout(() => printerPort.close(), 500);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `Server Error: ${err}` });
    }
};
