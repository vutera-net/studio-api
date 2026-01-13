// sendDailyNotification.js
const admin = require("./firebase");

async function sendDailyNotification() {
  const message = {
    topic: "daily",
    notification: {
      title: "Thông báo hằng ngày",
      body: "Chúc bạn một ngày làm việc hiệu quả 🚀",
    },
    data: {
      type: "daily",
    },
  };

  try {
    await admin.messaging().send(message);
    console.log("Daily notification sent");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

module.exports = sendDailyNotification;
