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



if ('serviceWorker' in navigator) {

  navigator.serviceWorker.getRegistration('firebase-messaging-sw.js').then(registration => {
    if (registration) {
      console.log('firebase-messaging-sw.js is registered and active.');
    } else {
      for (const registration of registrations) {
        registration.unregister().then(success => {
          console.log(`Service Worker ${registration.scope} unregistered`);
        }).catch(error => {
          console.error(`Failed to unregister Service Worker ${registration.scope}`, error);
        });
      }
      navigator.serviceWorker.register("firebase-messaging-sw.js");
    }
  }).catch( error => {
      console.error('Error checking service worker registration:', error);
  });
}

 


if ("Notification" in window) {
  Notification.requestPermission().then((premition) => {
    if (premition == "denied") {
      console.log("the user denied the premission");
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
    // functions.httpsCallable("user_get")()
    retry_callable(functions.httpsCallable("user_get"), {})
    .then((user_obj) => {
      corentUser = JSON.parse(localStorage.getItem(USER_KEY));
      localStorage.setItem(USER_KEY, JSON.stringify(user_obj.data));
      messagingSendToken();
      console.log(user_obj.data)
      console.log(corentUser)
      
      if(corentUser.email.trim() === 'admin@dev.blaster.co.il'){    
        document.getElementById("admin").style.display = "block"

      }
      if(window.location.href.indexOf("/homePage.html")>0){
          console.log(corentUser ) 
          showCardOnUI();
      }else if(window.location.href.indexOf("/spatial.html")>0){
          //get add obj frome db

      }else if(window.location.href.indexOf("/class.html")>0){
          //get class obj frome db  

          
          functions.httpsCallable("course_add_user")(data)
          .then((result) => {
            
            console.log();
          })
          .catch((e) => console.error("error " + e));
          
        
      }else if(window.location.href.indexOf("/index.html")>0 && corentUser){

        window.location.href = "./homePage.html"
      }
    }).catch((e) => {
      console.error("error " + e);
  });


  }else{
    window.location.href.indexOf("/index.html")>0?console.log("not logd in"): window.location.href = "./index.html";
    console.log(window.location.href)

  }
});


async function retry_callable(func, data, retries = 5) {
  if (retries === 0) {
    throw new Error("too many retries for function " + func.name);
  }
  try {
    return await func(data);
  } catch (e) {
    console.warn("retrying " + func.name + " " + retries + " more times");
    await new Promise((r) => setTimeout(r, 250));
    return await retry_callable(func, data, retries - 1);
  }
}


function messagingSendToken() {
 
    messaging
      .getToken({ vapidKey: M_P_KEY })
      .then((currentToken) => {
        console.log("token = " + currentToken);
        if (currentToken) {
          data = { device_token: currentToken };
          functions
            .httpsCallable("user_update_token")(data)
            .then((result) => {
              corentUser["token"] = currentToken;
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


messaging.onMessage((payload) => {
  console.log("message received -> " + JSON.stringify(payload));
  // navigator.serviceWorker.ready.then((registration) => {
  //   registration.showNotification(payload.notification.title);
  // });
});

if(window.location.href.indexOf("/index.html")<0)
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
