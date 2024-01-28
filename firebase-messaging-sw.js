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


  // Perform the desired action when the notification is clicked
  clients.openWindow('https://dev.blaster.co.il/homePage.html');
  event.notification.close();

});





messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload.data
  );

  const img_blob = ''
  // fetch(payload.data.image).then((img) => {
  //   console.log(img);
  //   img.blob().then((myBlob) => {
  //     console.log("myBlob = " + myBlob);
  //     img_blob = new Blob(myBlob);
  //     console.log(img_blob);
  //   });
  // })

  //  {message: 'קלף עם הסבר מחכה לך באתר', title: 'הקלף היומי מישי גד',
  //  image: 'https://storage.googleapis.com/tyg-stage-b8e16.appspot.com/800_thumb/maj14_r.png',
  //   url: 'https://dev.blaster.co.il/homepage.html',
  //    type: '1'}
  console.log(payload.data)
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    title: payload.data.title,
    message: payload.data.message,
    iconUrl: 'https://storage.googleapis.com/tyg-stage-b8e16.appspot.com/static/logo.png',
    imageUrl: payload.data.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener('notificationclick', function (event) {
//   event.notification.close();

//   // Open a new tab when the user clicks on the notification
//   event.waitUntil(clients.openWindow('https://example.com'));
// });

