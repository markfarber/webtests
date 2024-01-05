const USER_KEY = "user";
const M_P_KEY = "BJVCp-sxo-XLCPW1xeDTCsYxKG9JRtNf70vgD4IK7DNM6byehbvwbYHp-n-tf-Z2DKobh0KNoboUiQCpslfmkNQ"
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
messaging = app.messaging("europe-west2");
// C:\Users\97253\Documents\webtest\webtests\firebase-messaging-sw.js

if('aerviceWorker' in navigator){
  navigator.serviceWorker.register("firebase-messaging-sw.js")
}

if('Notification' in window){
  Notification.requestPermission().then((premition)=>{
    if(premition == 'denied')
    {
      console.log("the user denied the premition")
      return
    }
    if(premition == 'granted'){
      console.log("premition granted")
    }
  })
}
corentUser = {}
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
   
    corentUser = localStorage.getItem(USER_KEY)
    console.log(corentUser)
    messagingSendToken()
  } else {
    if(!window.location.href.indexOf("/index.html"))
        window.location.href = "/index.html"

  }
});

function messagingSendToken(){
  if(window.location.href.indexOf("/homePage.html")){
    messaging.getToken(M_P_KEY)
    .then((currentToken)=>{
      if(currentToken){

            functions.httpsCallable("user_update_token")({device_token:currentToken})
            .then((user_obj) =>{
              corentUser['token'] = currentToken
              localStorage.setItem(USER_KEY, JSON.stringify(corentUser))
            })
            .catch((e) => console.error("error " + e)); 
      }else{
          console,log("token error = "+errr)
      }
    })
    .catch((err)=>{
      console.log(err)
    });


      
  }
}

// const init_messaging = () => {
//   return new Promise((resolve, reject) => {
//     navigator.serviceWorker.getRegistration().then((registration) => {
//       console.log("on init registration = " + JSON.stringify(registration));
//       if (!registration) {
//         register_sw()
//           .then((registration) => resolve(registration))
//           .catch((e) => reject(e));
//       } else {
//         console.log()
//         resolve(registration)
//       }
//     });
//   });
// };

// const register_sw = (attempt = 0) => {
//   console.warn("sw reg attempt " + attempt);
//   return new Promise((resolve, reject) => {
//     if (attempt > 10) {
//       reject(Error("too many attempts to register sw"));
//     }
//     navigator.serviceWorker.register("firebase-messaging-sw.js").then((registration) => {
//       if (registration) {
//         console.log("sw registered " + JSON.stringify(registration));
//         resolve(registration);
//       } else {
//         register_sw(attempt + 1);
//       }
//     }).catch((e) => {
//       console.warn('transient error in register sw ' + e)
//       register_sw(attempt + 1);
//     })
//   });
// };

// messaging.getToken().then((token) => {
//   console.log('Token:', token);

//   // Subscribe to background messages
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       console.log('Notification permission granted');

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


