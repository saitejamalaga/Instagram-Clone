import React, { useState } from 'react';
import './Register.css'
import image from './../assest/Login.PNG'

import { Link, useHistory } from "react-router-dom";
import { auth } from "./../firebase";

function Register() {
    const history = useHistory();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                // it successfully created a new user with email and password
                authUser.user.updateProfile({
                    displayName: username,                    
                });
                auth.signOut();
                history.push('/');
            })
            .catch(error => alert(error.message));

    }

    return (
        <div className='register'>

            <div className="register__container">
                <img
                    className="register__logo"
                    src={image} alt=""
                />

                <div className="register__content">
                    <h1> <img
                        className="app__headerImage"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt="instagram logo"
                    /></h1>
                    <form>
                        <input placeholder='username' autoComplete="username" type='text' value={username} onChange={(e) => setUsername(e.target.value)} />

                        <input type='text' autoComplete="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />

                        <input type='password' autoComplete="new-password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

                        <button type='submit' onClick={register} className='register__signInButton'>Sign up</button>
                    </form>

                    <h3><span>OR</span></h3>

                    <div className="login__register">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>


                    <div className="register__store">
                        <h5>Get the app</h5>
                        <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&amp;ct=igweb.loginPage.badge&amp;mt=8&amp;ig_mid=W1Z1FQAEAAHwCjbmVrLcQkt_GkFZ">
                            <img width="150" hight="110" alt="Available on the App Store" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHEMIUpeVOCUHMN-i4kASzq_YoKAY7NA6dmVEc3-aFuniMuqIJ0g" /></a>

                        <a href="https://play.google.com/store/apps/details?id=com.instagram.android&amp;referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DW1Z1FQAEAAHwCjbmVrLcQkt_GkFZ%26utm_medium%3Dbadge">
                            <img width="150" hight="110" alt="Available on Google Play" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzWE3Ng6FY5KmEvG4biDlQ0xvWg1JTCr8H1N0gw3tLcoKo1tyLgg" /></a>
                    </div>


                </div>




            </div>


        </div>
    )
}

export default Register
