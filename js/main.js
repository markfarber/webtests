const USER_KEY = "user";
const firebaseConfig = {
  apiKey: "AIzaSyAe2AQgp3soMCBHX5uCtDuYRDdFAwondVU",
  authDomain: "tyg-stage-b8e16.firebaseapp.com",
  databaseURL: "https://tyg-stage-b8e16-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tyg-stage-b8e16",
  storageBucket: "tyg-stage-b8e16.appspot.com",
  messagingSenderId: "678914468365",
  appId: "1:678914468365:web:0345776b1da9cdd48bc344",
  measurementId: "G-FDJ0SB6C4G",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const functions = app.functions("europe-west2");
messaging = firebase.messaging();

async function init_messaging(nav) {
  const sw_regs = await navigator.serviceWorker.getRegistrations();
  if (sw_regs.length < 1) {
    if ("serviceWorker" in nav) {
      nav.serviceWorker.register("firebase-messaging-sw.js").then((registration) => {
        console.log(registration);
        // functions
        //   .httpsCallable("user_update_token")()
        //   .then((result) => {
        //     console.log("Token update: " + result);
        //   });
        return registration;
      });
      // .catch((e) => {
      // console.error("init_messaging error " + e);
      // });
    }
  }
}

/*class Messaging {
  static messaging = firebase.messaging();

  static init_messaging(nav) {
    console.log("init_messaging called with " + JSON.stringify(nav));
    // messaging = firebase.messaging();
    if ("serviceWorker" in nav) {
      nav.serviceWorker
        .register("firebase-messaging-sw.js")
        .then((registration) => {
          console.log(registration);
          functions
            .httpsCallable("user_update_token")()
            .then((result) => {
              console.log("Token update: " + result);
            });
        })
        .catch((e) => {
          console.error("init_messaging error " + e);
        });
    }
  }
}*/

///init serviceWorker
/*if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/webtests/firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
      //init_messaging() 
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
  }*/

//push messeg
/*messaging.onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Update the UI to include the received message.
  console.log(payload);
});*/

// Notification request Permission
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    console.log("Notification permission granted.");
  }
});

// function init_messaging() {
//   vapidKey = "BJVCp-sxo-XLCPW1xeDTCsYxKG9JRtNf70vgD4IK7DNM6byehbvwbYHp-n-tf-Z2DKobh0KNoboUiQCpslfmkNQ"
// messaging.getToken(messaging, { vapidKey }).then((currentToken) => {
//   if (currentToken) {

//console.log(currentToken)
//   } else {
//     // Show permission request.
//     console.log('No registration token available. Request permission to generate one.');
//     // Show permission UI.
//     //updateUIForPushPermissionRequired();
//     //setTokenSentToServer(false);
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
// });

//}
