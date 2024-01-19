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

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload.notification
  );

  
  

  const notificationOptions = {
    body: payload.notification.body,
      icon: 'https://firebasestorage.googleapis.com/v0/b/tyg-stage-b8e16.appspot.com/o/800%2Flogo.png?alt=media&token=5424e1b5-5a2d-462b-82ff-40b18747603e',
      image: 'https://firebasestorage.googleapis.com/v0/b/tyg-stage-b8e16.appspot.com/o/800%2Flogo.png?alt=media&token=5424e1b5-5a2d-462b-82ff-40b18747603e'
    };

  const notification = new Notification('Notification Title', notificationOptions);

  // Add an event listener for the click event on the notification
  notification.addEventListener('click', () => {
    // Handle click event
    console.log('Notification clicked!');

    // Add your custom logic for what should happen when the notification is clicked
    // For example, open a new page or focus on your web application
    window.open('https://dev.blaster.co.il/homePage.html', '_blank');
  });




});

// self.addEventListener(
//   "notificationclick",
//   (event) => {
//     //window.location.href = './homePage.html'
//     window.open('https://dev.blaster.co.il/homePage.html', '_blank');
//     event.notification.close();
   
//   },
//   false,
// );