import React,{useState} from 'react'
import './mypost.scss'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {Link} from "react-router-dom"

const Mypost = ({post}) => {

    const [setting, setSetting] = useState(false);

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
            })
        })
    }
  return (
    <div className='mypost' >

    <div className='postpage'>
        <div className="top">
       <Link to={'/userProfile/'+post.user._id} style={{color:'white',textDecoration:"none"}} >    <div className="top-left" >
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
                <div><FavoriteBorderOutlinedIcon/></div>
                <div><MapsUgcOutlinedIcon/></div>
                <div><SendOutlinedIcon/></div>
            </div>
            <div className="bottom-right">
                <div><BookmarkBorderOutlinedIcon/></div>
            </div>
        </div>

        <div className="description">{post.caption}</div>

        <div className="comments">
            <div>View all commments</div>
            <div className="add-comment">Add a comment...</div>
        </div>
    </div>

    <div className={setting?'setting-active':'postsetting'}>
        <button onClick={deletePost}>delete</button>
    </div>


    </div>
  )
}

export default Mypost