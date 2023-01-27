import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
const Comment = ({ comment, postId }) => {
    const [deleted, setDeleted] = useState(false);
    const [user, setUser] = useState()
    useEffect(() => {
     
        db.ref(`users/${comment.postedBy}`)
        .on('value',(snap)=>{
            setUser(snap.val())
        })
    }, [])
    
    const deleting = () => {
        db.ref(`comments/${comment.id}`).remove()
        setDeleted(false)
    }
    return (
        <div className='comment'>
            <div className={deleted ? 'delComment' : 'deleteComment'}>
                <button onClick={deleting}>delete</button>
            </div>
            <img src={user&&user.profilePic} alt="" />
            <span className='commentedBy' onClick={() => {comment.postedBy===localStorage.getItem('id')&& setDeleted(!deleted) }}>
                {user&&user.name}:
            </span>
            <span>
                {comment.text}</span>
        </div>
    )
}
export default Comment