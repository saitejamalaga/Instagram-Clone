import React, { useState, useEffect } from "react";
import './UserProfile.css';
import { useStateValue } from "./../StateProvider";
import { db } from "./../firebase";


import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./Footer";

function UserProfile() {
    // eslint-disable-next-line 
    const [{ user }, dispatch] = useStateValue();
    const [posts, setPosts] = useState([])

    useEffect(() => {
        
        db.collection("posts")
            .where("username", "==", user).onSnapshot((snapshot) => {
                // every time a new post is added fire this code off
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                );
            });

            
    }, [user]);




    return (
        <div className="userProfile">

            <div className="container">

                <div className="profile">


                    <div className="profile-image">

                        <img src="https://th.bing.com/th/id/OIP.bLTpCl-8AKjUcSMa0t2dPgEsEs?pid=Api&rs=1" alt="" />

                    </div>

                    <div className="profile-user-settings">

                        <h1 className="profile-user-name">{user}</h1>

                        <button className="profile-edit-btn">Edit Profile</button>

                        <FontAwesomeIcon className="custom" icon={faCog} />

                    </div>

                    <div className="profile-stats">

                        <ul>
                            <li><span className="profile-stat-count">{posts.length}</span> Posts</li>

                        </ul>

                    </div>

                    <div className="profile-bio">

                        <p><span className="profile-real-name">{user}</span> @Tagline for {user} comes here📷✈️🏕️</p>

                    </div>

                </div>

                <div className="gallery">

                    <div className="gallery-item">
                        {
                            posts.map(({ id, post }) => (
                                <img key={id} src={post.imageUrl} className="gallery-image" alt="" />
                            ))
                        }

                    </div>


                </div>


            </div>

            <Footer />
        </div>
    );
}

export default UserProfile;







