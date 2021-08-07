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
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const googleSignIn = () => {    // google sign in
    firebase.auth()
      .signInWithPopup(googleProvider)
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
        history.replace(from); 
        console.log(displayName, email, photoURL)
      })
      .catch(err => {
        console.log(err);
        console.log(err.message)
      })
  }
  const fbSignIn = () => {    // facebook sign in
    firebase.auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        setVerifiedUser(signedInUser);
        history.replace(from); 
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
          setVerifiedUser(newUserInfo);
          history.replace(from); 
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
    <div className="login-area">
      <Form className="user-form" onSubmit={handleSubmit}>
      {
        newUser ? <h1>Create an account</h1> :
        <h1>Login</h1>
      }
        {newUser && <input type="text" onBlur={handleBlur} name="name" id="" placeholder="your name" required />} <br />
        <input type="email" onBlur={handleBlur} name="email" id="" placeholder="your email address" required /> <br />
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="password" required /> <br />
        {newUser && <input type="password" onBlur={handleBlur} name="password" id="" placeholder="confirm password" required />}
        <input className="login-button" type="submit" value={newUser ? "Create an account" : "Login"} />
        {
        !newUser ? <p>Don't have an account? <span className="user-question" onClick={() => setNewUser(!newUser)}>Create an account</span></p> :
        <p>Already have an account? <span className="user-question" onClick={() => setNewUser(!newUser)} >Login</span></p>
      }
      </Form>
      <p>-------------Or-------------</p>
      <button className="social-login" onClick={fbSignIn}><span className="social-icon fb-icon"><FontAwesomeIcon icon = {faFacebookF} /></span> Continue with Facebook</button>
      <br />
      <button className="social-login" onClick={googleSignIn}><span className="social-icon google-icon"><FontAwesomeIcon icon={faGoogle} /></span> Continue with Google</button>
      
      
      <p style={{ color: "red" }}>{user.err}</p>
      {user.success && <p style={{ color: "green" }}>Account {newUser ? "created" : "logged in"} successfully!!</p>}
    </div>
  );
}

export default Login;