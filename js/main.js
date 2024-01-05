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
  
    if(window.location.href.indexOf("/homePage.html")){
      corentUser = JSON.parse(localStorage.getItem(USER_KEY))
      console.log(corentUser)
      messagingSendToken()
      
    }
  } else {
    if(!window.location.href.indexOf("/index.html"))
        window.location.href = "/index.html"

  }
});

function messagingSendToken(){
  
    messaging.getToken(M_P_KEY)
    .then((currentToken)=>{
      if(currentToken){
            data = {device_token:currentToken}
            functions.httpsCallable("user_update_token")(data)
            .then((user_obj) =>{
              corentUser.data['token'] = currentToken
              localStorage.setItem(USER_KEY, JSON.stringify(corentUser))
              console.log(user_obj)
             // showOnUI() 
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

function showOnUI() {
  console.log("shoeOnUI")

    card = `
          <div class="card" style="width: 18rem">
          <img class="card-img-top" src="${corentUser.img_url}" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">$${corentUser.name}</h5>
            <p class="${corentUser.messege}">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
    `
    if(corentUser)
      document.getElementById("card").innerHTML = card

}




