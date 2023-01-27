import React, {useEffect, useState } from 'react'
import './post.scss'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { Link, useNavigate } from "react-router-dom"        
import { db, storage } from '../../firebase';

const Post = ({ post }) => {
    const navigate = useNavigate();
    const [setting, setSetting] = useState(false);
    const [currentuser, setCurrentuser] = useState()
    const [like, setLike] = useState()
    const [comment, setComment] = useState('')
    useEffect(() => {
        setLike(post.likes && post.likes.includes(localStorage.getItem('id')))
        // {post.likes &&console.log(post.likes)}
        fetch(`https://instaclone-d3b52-default-rtdb.firebaseio.com/users/${post.postedBy}.json`).then(res => {
            res.json().then(result => {
                setCurrentuser(result)
            })
        })
    }, [])

    const showsetting = () => {
        setSetting(!setting);
    }

    const deletePost = () => {
        db.ref(`posts/${post.id}`).remove()
        .then(()=>{
            storage.ref(post.deleteid).delete()
            alert('post deleted')
        })
    }

    const likepost = () => {

       if (post.likes) {
        db.ref(`posts/${post.id}`)
        .update(
            {likes:[...post.likes,localStorage.getItem('id')]}
            )
        setLike(true)
       } else {
        db.ref(`posts/${post.id}`)
        .update(
            {likes:[localStorage.getItem('id')]}
            )
        setLike(true)
       }

    }

    const unlikepost = () => {

        const unlike=post.likes.filter((e)=>{
            return e!==localStorage.getItem('id')
        })

        db.ref(`posts/${post.id}`)
        .update({likes:unlike})
        setLike(false)
    }

    const makeComment = (e) => {
        e.preventDefault();

        db.ref(`comments`).push(
            {
              text:comment  
            }
        ).then(res=>{
            db.ref(`comments/${res.key}`).update({id:res.key,post:post.id,postedBy:localStorage.getItem('id')})
            navigate('/comments/' + post.id)
        })

        // fetch('http://localhost:5544/api/comment', {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') },
        //     // body: JSON.stringify({ postId: post._id, text: comment })
        // }).then((res) => {
        //     res.json().then(() => {
        //         setComment('')
        //         // navigate('/comments/' + post._id)
        //     })
        // })
    }

    return (
        <div className='container' >

            <div className='postpage'>
                <div className="top">
                    <Link to={post.postedBy !== localStorage.getItem('id') ? '/userProfile/' + post.postedBy : '/profile'} style={{ color: 'white', textDecoration: "none" }} >
                            <div className="top-left" >
                      {currentuser && <img src={currentuser.profilePic} alt="" />}
                       {currentuser && <span >{currentuser.name}</span>}
                    </div>
                    </Link>

                    <div className="top-right" onClick={showsetting}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>


                </div>

                <div className="middle">
                    <img src={post.post} alt="" />
                </div>

                <div className="bottom">
                    <div className="bottom-left">
                        {like ? <div><FavoriteOutlinedIcon onClick={unlikepost} />{post.likes?post.likes.length:0}</div>
                            : <div><FavoriteBorderOutlinedIcon onClick={likepost} />{post.likes?post.likes.length:0}</div>}
                        <Link to={'/comments/' + post.id} style={{ color: 'white', textDecoration: 'none' }}> <div><MapsUgcOutlinedIcon /></div></Link>
                        <div><SendOutlinedIcon /></div>
                    </div>
                    <div className="bottom-right">
                        <div><BookmarkBorderOutlinedIcon /></div>
                    </div>
                </div>

                <div className="description">{post.caption}</div>

                <div className="comments">
                    <Link to={'/comments/' + post.id} style={{ color: 'white', textDecoration: 'none' }}><div>View all commments</div></Link>
                    <form className='add-comment' >
                        <input type="text" placeholder='add comment' onChange={(e) => { setComment(e.target.value) }} value={comment} />
                        {comment && <button onClick={makeComment}>post</button>}
                    </form>
                </div>
            </div>
            <div className={setting ? 'setting-active' : 'postsetting'}>
                {post.postedBy === localStorage.getItem('id') && <button onClick={deletePost}>delete</button>}
            </div>
        </div>
    )
}

export default Post