import React, { useState, useEffect } from "react";
import { db } from "./../firebase";

import Post from './Post'
import { useStateValue } from "./../StateProvider";
import { auth } from "./../firebase";

import "./Feed.css";
import Footer from "./Footer";


function Feed() {

    // eslint-disable-next-line 
    const [{ user }, dispatch] = useStateValue();
    const [posts, setPosts] = useState([])



    const handleAuthenticaton = () => {
        if (user) {
            auth.signOut();
        }
    };

    useEffect(() => {
        myFunction();
        return () => {
            setPosts({}); // This worked for me
        };
    }, []);
    
    const myFunction = () => {
        db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            // every time a new post is added fire this code off
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    post: doc.data(),
                }))
            );
        });
    }

    return (

        <div className="feed">


            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="instagram logo"
                />
                <h4 onClick={handleAuthenticaton}>Logout</h4>
            </div>

            <div className="app__posts">
                <div className="app__postsLeft">
                    {
                        posts.map(({ id, post }) => (
                            <Post postId={id} key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
                        ))

                    }
                </div>
            </div>

            <Footer />

        </div>
    );
}

export default Feed;
