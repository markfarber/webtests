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

  const clickedNotification = event.notification;
  const notificationType = event.notification.data.notificationType;
  console.log(notificationType)

  if(notificationType === '1'){
  // Perform the desired action when the notification is clicked
  clients.openWindow('https://dev.blaster.co.il/homePage.html');
  event.notification.close();
  }else{
    clients.openWindow('https://dev.blaster.co.il/spatial.html');
  event.notification.close();
  }

});





messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload.data
  );

  

  //  {message: 'קלף עם הסבר מחכה לך באתר', title: 'הקלף היומי מישי גד',
  //  image: 'https://storage.googleapis.com/tyg-stage-b8e16.appspot.com/800_thumb/maj14_r.png',
  //   url: 'https://dev.blaster.co.il/homepage.html',
  //    type: '1'}
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.message,
    icon: 'https://storage.googleapis.com/tyg-stage-b8e16.appspot.com/static/logo.png',
    badge: 'https://storage.googleapis.com/tyg-stage-b8e16.appspot.com/static/logo.png',
    image:  payload.data.image,
    data: {
      //click_action: clickAction,
      notificationType: payload.data.type,
      // Add any additional custom data you need
    },
  };


  self.registration.showNotification(notificationTitle, notificationOptions);
});

