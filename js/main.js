const firebaseConfig = {
  apiKey: "AIzaSyAe2AQgp3soMCBHX5uCtDuYRDdFAwondVU",
  authDomain: "tyg-stage-b8e16.firebaseapp.com",
  projectId: "tyg-stage-b8e16",
  storageBucket: "tyg-stage-b8e16.appspot.com",
  messagingSenderId: "678914468365",
  appId: "1:678914468365:web:0345776b1da9cdd48bc344",
  measurementId: "G-FDJ0SB6C4G",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
const functions = firebase.functions();

const get_user = await functions.httpsCallable("users_get")

messaging.onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // Update the UI to include the received message.
  console.log(payload);
});

Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    console.log("Notification permission granted.");
  }
});

vapidKey =
  "BJVCp-sxo-XLCPW1xeDTCsYxKG9JRtNf70vgD4IK7DNM6byehbvwbYHp-n-tf-Z2DKobh0KNoboUiQCpslfmkNQ";
messaging
  .getToken(messaging, { vapidKey })
  .then((currentToken) => {
    if (currentToken) {
      console.log("token = " + currentToken);
      //sendTokenToServer(currentToken);
      //updateUIForPushEnabled(currentToken);

      functions
        .httpsCallable("user_update_token")
        .then((result) => {
          // Read result of the Cloud Function.
          var sanitizedMessage = result.data.text;
          console.log("call result = " + result);
        })
        .catch((error) => {
          console.error("call error = " + error);
        });
      // var user_update_token = firebase.app().functions('europe-west2').httpsCallable('user_update_token');
      // user_update_token()
      //   .then((result) => {
      //     // Read result of the Cloud Function.
      //     var sanitizedMessage = result.data.text;
      //     console.log(sanitizedMessage)
      //   });

      console.log(currentToken);
    } else {
      // Show permission request.
      console.error(
        "No registration token available. Request permission to generate one."
      );
      // Show permission UI.
      //updateUIForPushPermissionRequired();
      //setTokenSentToServer(false);
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });

function getUserFromFS(user) {
  console.log(user);
  const db = firebase.firestore();
  var docRef = db.collection("users").doc(user.uid);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        localStorage.setItem("UID", user.uid);
        window.location = "homePage.html";
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

function init_messaging() {
  messaging
    .getToken(messaging, { vapidKey, serviceWorkerRegistration })
    .then((token) => {
      console.log("token = " + token);
    });

  //   Notification.requestPermission()
  //     .then((permission) => {
  //       if (permission === "granted") {
  //         console.log("granted");
  //         return messaging.getToken();
  //       }
  //     })
  //     .then((token) => {
  //       console.log("token = " + token);
  //     })
  //     .catch((e) => {
  //       console.log("got error " + e);
  //     });
}
