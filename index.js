const express = require('express');
const sendDailyNotification = require("./sendDailyNotification");
require("./cron");

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

app.get('/health-check', (req, res) => {
  res.json({ message: 'API is healthy!' });
});

app.post('/advice', (req, res) => {
  const { birthdate } = req.body;

  if (!birthdate) {
    return res.status(400).json({ error: 'Missing birthdate' });
  }

  // Tạo một ngày tháng năm sinh từ chuỗi đầu vào
  const [day, month, year] = birthdate.split('/').map(Number);
  const dateOfBirth = new Date(year, month - 1, day);

  // Xác định số ngày đã trôi qua kể từ sinh nhật đến hôm nay
  const today = new Date();
  const timeDifference = today - dateOfBirth;
  const ageInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Tạo một lời khuyên ngẫu nhiên dựa trên số ngày đã trôi qua
  let advice = '';
  if (ageInDays % 3 === 0) {
    advice = 'Hôm nay là lúc tuyệt đối không bỏ cuộc!';
  } else if (ageInDays % 5 === 0) {
    advice = 'Chúc bạn một ngày tốt lành!';
  } else {
    advice = 'Đừng quên giữ sức khỏe!';
  }

  res.json({ dateOfBirth, today, advice });
});


app.post("/send-notification", async (req, res) => {
  try {
    await sendDailyNotification();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
});