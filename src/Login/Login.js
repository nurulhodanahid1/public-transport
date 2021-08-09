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

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const googleSignIn = () => {
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
  const fbSignIn = () => {
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
        const user = result.user;
        // console.log("after fb sign in", user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length >= 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);   // /\d{1}.test(1) = true;
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
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
        {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="your name" required />} <br />
        <input type="email" onBlur={handleBlur} name="email" placeholder="your email address" required /> <br />
        <input type="password" onBlur={handleBlur} name="password" placeholder="password" required /> <br />
        {newUser && <input type="password" onBlur={handleBlur} name="password" placeholder="confirm password" required />}
        <p style={{ color: "red" }}>{user.err}</p>
        {
        !newUser && <div className="d-flex flex-row bd-highlight mb-3">
          <input type="checkbox" name="newUser" id="" />
          <label style={{ margin: "10px 0 0 4px" }} htmlFor="newUser">Remember me</label>
          <div style={{ margin: "10px 0 0 40px" }} className="user-question">Forgot password?</div>
        </div>
        }
        <input className="login-button" type="submit" value={newUser ? "Create an account" : "Login"} />

        {
          !newUser ? <p>Don't have an account? <span className="user-question" onClick={() => setNewUser(!newUser)}>Create an account</span></p> :
            <p>Already have an account? <span className="user-question" onClick={() => setNewUser(!newUser)} >Login</span></p>
        }
      </Form>
      <h4 style={{ marginBottom: "15px" }}>Continue with your social</h4>
      <button className="social-login" onClick={fbSignIn}><span className="social-icon fb-icon"><FontAwesomeIcon icon={faFacebookF} /></span> Login with Facebook</button>
      <br />
      <button className="social-login" onClick={googleSignIn}><span className="social-icon google-icon"><FontAwesomeIcon icon={faGoogle} /></span> Login with Google</button>


      {user.success && <p style={{ color: "green" }}>Account {newUser ? "created" : "logged in"} successfully!!</p>}
    </div>
  );
}

export default Login;