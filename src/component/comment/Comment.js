import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Comment = ({comment,postId}) => {
    const [deleted, setDeleted] = useState(false);
const navigate=useNavigate()
    const deleting=()=>{
        fetch('http://localhost:5544/api/uncomment',{
            method:'PUT',
            headers:{'Content-Type':'application/json','auth-token':localStorage.getItem('token')},
            body:JSON.stringify({postId,commentId:comment._id})
        }).then((res)=>{
            res.json().then(()=>{
                setDeleted(false)
                window.location.reload();
            })
        })
       
    }
  return (
    <div className='comment'>
    <div className={deleted?'delComment':'deleteComment'}>

       <button onClick={deleting}>delete</button>
       
        </div>
    <img src={comment.postedBy.profilePic} alt="" />
      <span className='commentedBy'  onClick={()=>{setDeleted(!deleted)}}>
          {comment.postedBy.name} :
      </span>
      <span>
      {comment.text}</span>
  </div>
  )
}

export default Comment