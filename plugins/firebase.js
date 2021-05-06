import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDuc7GOsiREzxpPSnCp7MxaDi7sTyvkXzQ",
    authDomain: "dj-ikehata-001.firebaseapp.com",
    projectId: "944358908349",
    appId: "1:944358908349:web:e7403134819476d41af2d4"
  });
}

export default firebase;
