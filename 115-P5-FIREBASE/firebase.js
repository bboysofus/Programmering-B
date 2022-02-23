const firebaseConfig = {
  apiKey: "AIzaSyCOEm7xDJdLRx18Zb4bVUFT7k3T3VQ6ztw",
  authDomain: "p5-diary-d35db.firebaseapp.com",
  projectId: "p5-diary-d35db",
  storageBucket: "p5-diary-d35db.appspot.com",
  messagingSenderId: "708096866756",
  appId: "1:708096866756:web:126e2686d55f812a09cc91"
};

//start firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
