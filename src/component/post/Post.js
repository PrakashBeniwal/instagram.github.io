import React,{useContext, useEffect, useState} from 'react'
import './post.scss'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/authContext';

const Post = ({post}) => {
  const navigate=useNavigate();
    const [setting, setSetting] = useState(false);
  const {currentuser}=useContext(AuthContext);
const [like, setLike] = useState()   
const [comment, setComment] = useState('') 

    // const [user, setUser] = useState('')
    useEffect(() => {
       setLike(post.likes.includes(currentuser._id))
    }, [])
    

    const showsetting=()=>{
      setSetting(!setting);
    }


    const deletePost=()=>{
        fetch(`http://localhost:5544/api/post${post._id}`,{
            method:'DELETE',
            headers:{'auth-token':localStorage.getItem('token')}
        }).then(res=>{
            res.json().then(result=>{
                alert(result.delete)
                window.location.reload();
            })
        })
    }

    const likepost=()=>{
     fetch('http://localhost:5544/api/like',{
        method:"PUT",
        headers:{'content-Type':'application/json','auth-token':localStorage.getItem('token')},
        body:JSON.stringify({postId:post._id})
     }).then(res=>{
        res.json().then(res=>{
           setLike(true)
           window.location.reload();
        })
     })
    }

    const unlikepost=()=>{
        fetch('http://localhost:5544/api/unlike',{
            method:"PUT",
            headers:{'content-Type':'application/json','auth-token':localStorage.getItem('token')},
            body:JSON.stringify({postId:post._id})
         }).then(res=>{
            res.json().then(res=>{
               setLike(false)
           window.location.reload();

            })
         })
    }

    const makeComment=(e)=>{
        e.preventDefault();
        fetch('http://localhost:5544/api/comment',{
            method:'PUT',
            headers:{'Content-Type':'application/json','auth-token':localStorage.getItem('token')},
            body:JSON.stringify({postId:post._id,text:comment})
        }).then((res)=>{
            res.json().then(result=>{
                setComment('')
                navigate('/comments/'+post._id)
            })
        })
    }

  return (
    <div className='container' >

    <div className='postpage'>
        <div className="top">
       <Link to={post.user._id!==currentuser._id?'/userProfile/'+post.user._id:'/profile'} style={{color:'white',textDecoration:"none"}} >    <div className="top-left" >
            <img src={post.user.profilePic} alt="" />
            <span >{post.user.name}</span>
            </div></Link> 

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
                {like?<div><FavoriteBorderOutlinedIcon onClick={unlikepost} style={{backgroundColor:'red'}}/>{post.likes.length}</div>
                :<div><FavoriteBorderOutlinedIcon onClick={likepost} />{post.likes.length}</div>}
               <Link to={'/comments/'+post._id} style={{color:'white', textDecoration:'none'}}> <div><MapsUgcOutlinedIcon/></div></Link>
                <div><SendOutlinedIcon/></div>
            </div>
            <div className="bottom-right">
                <div><BookmarkBorderOutlinedIcon/></div>
            </div>
        </div>

        <div className="description">{post.caption}</div>

        <div className="comments">
            <Link to={'/comments/'+post._id} style={{color:'white', textDecoration:'none'}}><div>View all commments</div></Link>
            <form className='add-comment' >
                <input type="text" placeholder='add comment' onChange={(e)=>{setComment(e.target.value)}} value={comment}/>
                {comment &&<button onClick={makeComment}>post</button>}
            </form>
        </div>
    </div>
    <div className={setting?'setting-active':'postsetting'}>
       {post.user._id===currentuser._id &&<button onClick={deletePost}>delete</button>}
    </div>
    </div>
  )
}

export default Post