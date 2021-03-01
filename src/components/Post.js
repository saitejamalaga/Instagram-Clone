import React, { useState, useEffect } from "react";
import './Post.css'
import Avatar from "@material-ui/core/Avatar";
import { useStateValue } from "./../StateProvider";

import { db } from './../firebase'
import firebase from 'firebase'


function Post({ postId, username, caption, imageUrl }) {
  // eslint-disable-next-line 
  const [{ user }, dispatch] = useStateValue();
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')


  useEffect(() => {
    let unsubscribe

    if (postId) {
      unsubscribe = db.collection("posts").doc(postId).collection('comments').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
        // every time a new post is added fire this code off
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            comment: doc.data(),
          }))
        );
      });
    }
    
    return () => {
      unsubscribe()
    }
  }, [postId]);


  const postComment = (event) => {
    event.preventDefault()

    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setComment('')
  }

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt={username} src="" />

        <h3> {username} </h3>
      </div>

      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post__text"> <strong>{username}</strong> {caption}</h4>

      <div className="post__comments">
        {comments.map(({ id, comment }) => (
          <p key={id}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      <form className='post__commentBox'>
        <input
          className='post__input'
          type="text"
          placeholder='Add a comment...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className='post__button '
          disabled={!comment}
          type='submit'
          onClick={postComment}>Post</button>
      </form>

    </div>
  );
}

export default Post;
