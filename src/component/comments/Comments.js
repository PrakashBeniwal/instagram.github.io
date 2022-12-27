import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Comment from '../comment/Comment';
import './comments.scss'
const Comments = () => {
  const [posts, setPosts] = useState();
  const { comment } = useParams();
  const postfetch = () => {
    fetch(`http://localhost:5544/api/post${comment}`, {
      headers: { 'auth-token': localStorage.getItem('token') }
    }).then(result => {
      result.json().then(res => {
        setPosts(res)
      })
    })
  }
  useEffect(() => {
    postfetch();
  }, [])
  return (
    <div className='Comments'>
      <div  >
        <div className='commentText'>Comments</div>
        <span> {posts && posts.comments.map((comments => {
          return (
            <Comment comment={comments} postId={comment} key={comments._id} />
          )
        }))}</span>
      </div>
    </div>
  )
}

export default Comments