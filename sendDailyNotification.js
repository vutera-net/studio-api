// sendDailyNotification.js
const admin = require('./firebase');

async function sendDailyNotification() {
  // Danh sách nội dung random
  const notifications = [
    {
      title: '🌞 Thông tin hôm nay',
      body: 'Thông tin hôm nay của bạn đã sẵn sàng',
    },
    {
      title: '✨ Năng lượng ngày mới',
      body: 'Xem năng lượng ngày hôm nay trước khi bắt đầu nhé',
    },
    {
      title: '🔮 Dự đoán hôm nay',
      body: 'Hôm nay có điều gì đang chờ bạn?',
    },
    {
      title: '🚀 Chào ngày mới',
      body: 'Bắt đầu ngày mới với thật nhiều cảm hứng!',
    },
  ];

  // Random 1 thông báo
  const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];

  const message = {
    topic: 'daily',
    notification: {
      title: randomNotification.title,
      body: randomNotification.body,
    },
    data: {
      type: 'daily',
    },
  };

  try {
    await admin.messaging().send(message);
    console.log('Daily notification sent:', randomNotification);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

module.exports = sendDailyNotification;
