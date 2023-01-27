import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import Comment from '../comment/Comment';
import './comments.scss'
const Comments = () => {
  const [comments, setComment] = useState('')
  const [posts, setPosts] = useState();
  const { comment } = useParams();
  const postfetch = () => {

    db.ref(`comments`)
    .orderByChild('post')
    .equalTo(comment)
    .on('value',(snap)=>{
      setPosts(Object.values(snap.val()))
      
    })
  }
  useEffect(() => {
    postfetch();
  }, [])

  const makeComment = (e) => {
    e.preventDefault();
    db.ref(`comments`).push(
      {
        text:comments  
      }
  ).then(res=>{
      db.ref(`comments/${res.key}`).update({id:res.key,post:comment,postedBy:localStorage.getItem('id')})
      setComment('')
  })
  }
  return (
    <div className='Comments'>
      <div className='displaycom'>
        <div className='commentText'>Comments</div>
        <span> {posts && posts.map((comments => {
          return (
            <Comment comment={comments} postId={comment} key={comments.id} />
          )
        }))}</span>
      </div>
      <form className='add-comment' >
        <input type="text" placeholder='Add a comment...' onChange={(e) => {setComment(e.target.value) }} value={comments} />
        {comments && <button onClick={makeComment}>post</button>}
      </form>
    </div>
  )
}

export default Comments