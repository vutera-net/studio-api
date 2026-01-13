// firebase.js
const admin = require('firebase-admin');
let serviceAccount;

if (process.env.FIREBASE_ADMIN_SDK) {
  // Production: đọc từ ENV
  serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);
} else {
  // Development: đọc từ file json cục bộ (không commit)
  serviceAccount = require('./serviceAccountKey.json');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
