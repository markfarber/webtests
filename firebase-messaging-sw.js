importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


 const firebaseConfig = {
  apiKey: "AIzaSyAe2AQgp3soMCBHX5uCtDuYRDdFAwondVU",
  authDomain: "tyg-stage-b8e16.firebaseapp.com",
  projectId: "tyg-stage-b8e16",
  storageBucket: "tyg-stage-b8e16.appspot.com",
  messagingSenderId: "678914468365",
  appId: "1:678914468365:web:0345776b1da9cdd48bc344",
  measurementId: "G-FDJ0SB6C4G"
};


const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  // Perform the desired action when the notification is clicked
  clients.openWindow('https://dev.blaster.co.il/homePage.html');
  event.notification.close();

});





messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload.notification
  );

  
  // const notificationTitle =payload.data.title ;
  const notificationOptions = {
    title: payload.data.title,
    message: payload.data.message,
    iconUrl: 'https://storage.googleapis.com/tyg-stage-b8e16.appspot.com/static/logo.png',
    imageUrl: payload.data.image,
  };


    self.registration.showNotification(notificationTitle, notificationOptions);


});

