const USER_KEY = "user";
const M_P_KEY = "BJVCp-sxo-XLCPW1xeDTCsYxKG9JRtNf70vgD4IK7DNM6byehbvwbYHp-n-tf-Z2DKobh0KNoboUiQCpslfmkNQ";
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
const messaging = app.messaging("europe-west2");
const storage = app.storage();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("firebase-messaging-sw.js");
}

if ("Notification" in window) {
  Notification.requestPermission().then((premition) => {
    if (premition == "denied") {
      console.log("the user denied the premition");
      return;
    }
    if (premition == "granted") {
      console.log("premition granted");
    }
  });
}
corentUser = {};
addObj  = {}
classObj = {}
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    corentUser = JSON.parse(localStorage.getItem(USER_KEY));
    messagingSendToken();
    

    if(window.location.href.indexOf("/homePage.html")){
      if(corentUser.data.email === 'admin@dev.blaster.co.il'){    
        document.getElementById("admin").style.display = "block"
      
      }
     
      showCardOnUI();
    }else if(!window.location.href.indexOf("/spatial.html")){
      //get add obj frome db

    }else if(!window.location.href.indexOf("/class.html")){
      //get class obj frome db    
    
    }
  }else{
    !window.location.href.indexOf("/index.html")? window.location.href = "/index.html":console.log("not logd in");

  }
});

function messagingSendToken() {
  if (window.location.href.indexOf("/homePage.html")) {
    messaging
      .getToken({ vapidKey: M_P_KEY })
      .then((currentToken) => {
        console.log("token = " + currentToken);
        if (currentToken) {
          data = { device_token: currentToken };
          functions
            .httpsCallable("user_update_token")(data)
            .then((result) => {
              corentUser.data["token"] = currentToken;
              localStorage.setItem(USER_KEY, JSON.stringify(corentUser));
              console.log("user_update_token yield -> " + result.data);
            })
            .catch((e) => console.error("error " + e));
        } else {
          console, log("token error = " + errr);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

messaging.onMessage((payload) => {
  console.log("message received -> " + JSON.stringify(payload));
  // navigator.serviceWorker.ready.then((registration) => {
  //   registration.showNotification(payload.notification.title);
  // });
});


document.getElementById("logOutBtn").addEventListener("click", () => {
  console.log("logout");
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.removeItem(USER_KEY);
      window.location.href = "./index.html";
    })
    .catch((error) => {
      // An error happened.
    });
});
