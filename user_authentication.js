// --------------( FIrebase CDN )------------------------------------------------------

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

import {
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBvPm2zQOITnpByNFtaFXuTe1A85LNASqE",
  authDomain: "user-authentication-1c4f2.firebaseapp.com",
  projectId: "user-authentication-1c4f2",
  storageBucket: "user-authentication-1c4f2.appspot.com",
  messagingSenderId: "866970711323",
  appId: "1:866970711323:web:6e0f805c951f0185fa8fbe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  console.log("app :" + app);

const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// console.log("auth : " + auth);

// __________________( sign-up) __________________________________

var signup_signin_box = document.getElementById("signup_signin_box");
var email = document.getElementById("email");
var pasword = document.getElementById("pasword");
var sign_up_btn = document.getElementById("sign_up_btn");
var sign_in_btn = document.getElementById("sign_in_btn");
var heading = document.getElementsByTagName('h1')[0]
// __________________( logout) __________________________________
var login_box = document.getElementById("login_box");
var logout_btn = document.getElementById("logout_btn");

// ________________________________( onAuthStateChanged() )_____________________________
//  yea function  automatic chlta ha user jub login hoga tub bhe yea chal jay ga or jub user log hoga yea tub bhe chal jay ga
//  isko listener function kehty han yea user login or logout state humy btata ha

email.value = " ";
pasword.value = " ";



onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user log in");

    signup_signin_box.style.display = "none";
    login_box.style.display = "block";
    logout_btn.style.display = 'block'
    login_box.children[0].children[0].innerText = user.email;
    heading.innerText =  user.email;
    console.log();

    const uid = user.uid;
    // ...
  } else {
    console.log("user log-out");
    // User is signed out

    signup_signin_box.style.display = "block";
    login_box.style.display = "none";
    email.value = " ";
    pasword.value = " ";

    // ...
  }
});

sign_up_btn.addEventListener("click", creatUserAccount);
sign_in_btn.addEventListener("click", login);
logout_btn.addEventListener("click", logout);

function creatUserAccount() {

  if (!email.value || !pasword.value) {
    return alert("enter email and pasword both");
  } else {
    createUserWithEmailAndPassword(auth, email.value, pasword.value)
      // when user get signed up
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // ...
      })

      // in case of any error or user is already register
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  }
}

function login() {
  if (!email.value || !pasword.value) {
    return alert("enter email and pasword both");
  } else {
    signInWithEmailAndPassword(auth, email.value, pasword.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user after login = " + user);
        // ...
      })
      .catch((error) => {
        // if fails to Sign in
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }
}

function logout() {
  signOut(auth)
    .then(() => {
      email.value = " ";
      pasword.value = " ";
  
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
