import React from 'react'
import './post.scss'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {Link} from "react-router-dom"

const Post = ({post}) => {
  return (
    <div className='container' >

    <div className='postpage'>
        <div className="top">
       <Link to={'/userProfile'} style={{color:'white',textDecoration:"none"}} >    <div className="top-left" >
            <img src={post.profilePic} alt="" />
            <span >{post.name}</span>
            </div></Link> 

            <div className="top-right">
                <div></div>
                <div></div>
                <div></div>
            </div>
            

        </div>

        <div className="middle">
            <img src={post.img} alt="" />
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

        <div className="description">{post.desc}</div>

        <div className="comments">
            <div>View all commments</div>
            <div className="add-comment">Add a comment...</div>
        </div>
    </div>
    </div>
  )
}

export default Post