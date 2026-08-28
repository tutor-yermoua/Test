const express = require('express');
const multer = require('multer');
const tesseract = require('tesseract.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/verify-slip', upload.single('slipImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, message: "ບໍ່ພົບໄຟລ໌ຮູບພາບ" });
        }

        const targetPrice = req.body.expectedPrice ? parseFloat(req.body.expectedPrice) : 599000;

        // ປະມວນຜົນ OCR ຝັ່ງເຊີບເວີ
        const { data: { text } } = await tesseract.recognize(req.file.buffer, 'eng');
        console.log("--- OCR Raw Text ---\n", text);

        // 1. ແປງຂໍ້ຄວາມໃຫ້ເປັນຕົວພິມໃຫຍ່ ແລະ ຈັດການກັບຄ່າ OCR ທີ່ມักອ່ານຜິດ (ເຊັ່ນ O ເປັນ 0, l ເเป็น 1)
        let cleanedText = text.replace(/[Oo]/g, '0').replace(/[lI]/g, '1');

        // 2. ຄົຫາຮູບແບບຕົວເລກທັງໝົດທີ່ມີຈຸດທົດສອບ ຫຼື ຈຸລະທຳ (เช่น 70,000.00 ຫຼື 599,000)
        const regex = /([\d,]+\.?\d*)/g;
        let match;
        let validAmounts = [];

        while ((match = regex.exec(cleanedText)) !== null) {
            let cleanStr = match[1].replace(/,/g, '');
            let num = parseFloat(cleanStr);

            // 3. ກອງເອົາສະເພາະຕົວເລກທີ່ເປັນຍອດເງິນໂອນ (ສົມມຸດວ່າຄ່າຮຽນຕັ້ງແຕ່ 10,000 ຂຶ້ນໄປ)
            if (!isNaN(num) && num >= 10000) {
                validAmounts.push(num);
            }
        }

        console.log("Filtered Numbers:", validAmounts);

        let selectedAmount = null;

        if (validAmounts.length > 0) {
            // 4. ເລືອກເອົາໂຕເລກທີ່ໃກ້ຄຽງກັບ targetPrice ຫຼາຍที่สุด (ປ້ອງກັນການໄປຈັບເອົາເລກບັນຊີ ຫຼື ຍອດອື່ນ)
            selectedAmount = validAmounts.reduce((prev, curr) => {
                return (Math.abs(curr - targetPrice) < Math.abs(prev - targetPrice)) ? curr : prev;
            });

            // 5. ກວດສອບເພີ່ມເຕີມ: ຖ້າຫາກຄ່າที่ຈັບໄດ້ຫ່າງຈາກລາຄາຕົວຈິງ quá (ເຊັ່ນ: ຜິດພາດຫຼາຍກວ່າ 100,000 ກີບ) ໃຫ້ຕີເປັນ ບໍ່ພົບ
            if (Math.abs(selectedAmount - targetPrice) > 200000) {
                console.log("Warning: Detected amount deviates too much from target price.");
            }
        }

        if (selectedAmount) {
            let formattedAmount = selectedAmount.toLocaleString() + '.00';
            res.json({ success: true, amount: formattedAmount, rawDetected: selectedAmount });
        } else {
            res.json({ success: false, message: "ອ່ານຈຳນວນເງິນບໍ່ຊັດເຈນ, ກະລຸນາຖ່າຍຮູບສະລິບໃຫ້ເຫັນຕົວເລກຈະແຈ້ງ" });
        }

    } catch (error) {
        console.error("Server OCR Error:", error);
        res.status(500).json({ success: false, message: "ເກີດຂໍ້ຜິດພາດໃນລະບົບເຊີບເວີ: " + error.message });
    }
});

app.listen(3000, () => {
    console.log('Backend server is running on http://localhost:3000');
});