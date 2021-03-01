import React, { useState } from "react";
import './Footer.css'

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core'

import { useStateValue } from "./../StateProvider";

import firebase from 'firebase'
import { storage, db } from './../firebase'


import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid black',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Footer() {
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState(null)
    // eslint-disable-next-line 
    const [{ user }, dispatch] = useStateValue();

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }


    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                //progress function...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (err) => {
                //error functon
                console.log(err)
                alert(err.message)
            },
            () => {
                //complete function ...
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside the db
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: user
                        })
                        setProgress(0)
                        setCaption('')
                        setImage(null)
                        setOpen(false)
                    })
            }
        )
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className='imageUpload'>
                <h3>Create New Post</h3>
                <progress className='imageUpload__progress' value={progress} max='100' />
                <input className="imageUpload__caption" type="text" placeholder='Enter a caption' value={caption} onChange={(e) => setCaption(e.target.value)} />
                <input className="imageUpload__file" type="file" onChange={handleChange} required/>
                <Button onClick={handleUpload} disabled={!caption} className="imageUpload__button" variant="contained" color="primary">Upload</Button>
            </div>
        </div>
    );

    return (
        <div className="footer">

            <div className="app__footer">
                <Link className="app_footer_icons" to="/Feed"><FontAwesomeIcon icon={faHome} size="lg" color="black" /></Link>
                <div className="app_footer_icons"><FontAwesomeIcon icon={faPlusSquare} onClick={handleOpen} size="lg" color="black" /></div>
                <Link className="app_footer_icons" to="/UserProfile"><FontAwesomeIcon icon={faUser} size="lg" color="black" /></Link>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>


        </div>
    );
}

export default Footer;