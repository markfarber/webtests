

  window.onload = ()=>{
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
    const app = firebase.initializeApp(firebaseConfig);
    firebase.auth().useDeviceLanguage();
    
  }


function getUserFromFS(user){
  console.log(user)
  var docRef = db.collection("users").doc(user.uid);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            localStorage.setItem("UID", user.uid);
            window.location = "/homePage.html"

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}