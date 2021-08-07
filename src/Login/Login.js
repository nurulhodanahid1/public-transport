import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../App';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Form } from 'react-bootstrap';


// firebase.initializeApp(firebaseConfig)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Login() {
    const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    err: "",
    success: false
  })
  
  const [verifiedUser, setVerifiedUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  
  // Google Sign in Started
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = () => {    // google sign in
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        setVerifiedUser(signedInUser);
        console.log(displayName, email, photoURL)
      })
      .catch(err => {
        console.log(err);
        console.log(err.message)
      })
  }
  const handleFbSignIn = () => {    // facebook sign in
    firebase.auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        //** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        const user = result.user;
        console.log("after fb sign in", user)
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  }
  const handleSignOut = () => {      // google sign out
    firebase.auth().signOut()
      .then(result => {
        const signOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: ""
        }
        setUser(signOutUser)
        console.log(result)
      })
      .catch(err => {

      })
  }
  // Google Sign in End
  const handleBlur = (e) => {
    // console.log(e.target.name, e.target.value)
    let isFieldValid = true;
    if (e.target.name === "email") {
      // const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(isEmailValid);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length >= 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);   // /\d{1}.test(1) = true;
      // console.log(isPasswordValid && passwordHasNumber);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    // console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in 
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          setVerifiedUser(newUserInfo)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.err = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setVerifiedUser(newUserInfo);
          history.replace(from);                     ///////
          console.log("sign in user info", res.user)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.err = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault(); // loading off
  }
  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then((res) => {
      console.log("user name updated successfully")
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div className="App">

      {/* Google Sign in Started */}
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Google Sign Out</button>
          : <button onClick={handleSignIn}><FontAwesomeIcon icon={faGoogle} /> Google Sign in</button>
      }
      <br />
      <button onClick={handleFbSignIn}><FontAwesomeIcon icon = {faFacebookF} /> Sign in using Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, <strong>{user.name}</strong></p>
          <p>Your email address is: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      {/* Google sign in end */}

      <h1>Our own Authentication</h1>
      {/* <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
      <label htmlFor="newUser">New user sign up</label>
      <Form onSubmit={handleSubmit}>
        {newUser && <input type="text" onBlur={handleBlur} name="name" id="" placeholder="your name" />} <br />
        <input type="email" onBlur={handleBlur} name="email" id="" placeholder="your email address" required /> <br />
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="your password" required /> <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </Form>
      
      <p style={{ color: "red" }}>{user.err}</p>
      {user.success && <p style={{ color: "green" }}>Account {newUser ? "created" : "logged in"} successfully!!</p>}
    </div>
  );
}

export default Login;