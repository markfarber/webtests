importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAe2AQgp3soMCBHX5uCtDuYRDdFAwondVU",
    authDomain: "tyg-stage-b8e16.firebaseapp.com",
    projectId: "tyg-stage-b8e16",
    storageBucket: "tyg-stage-b8e16.appspot.com",
    messagingSenderId: "678914468365",
    appId: "1:678914468365:web:0345776b1da9cdd48bc344",
    measurementId: "G-FDJ0SB6C4G",
});

const messaging = firebase.messaging();

// Customize notification behavior when the app is in the background
messaging.onBackgroundMessage((payload) => {
  console.log('Background Message received:', payload);

  // Customize the notification
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
    // body: payload.notification.body,
    // icon: 'path/to/icon.png',
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks when the app is in the foreground
self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();

  // Add your custom handling for notification click, e.g., open a specific page
  clients.openWindow('https://google.com');
});
