// cron.js
const cron = require("node-cron");
const sendDailyNotification = require("./sendDailyNotification");

// Chạy mỗi ngày lúc 10:00 sáng
cron.schedule("0 10 * * *", () => {
  console.log("Running daily notification job");
  sendDailyNotification();
});

console.log("Has schedule daily notification job");