import React from 'react'
import Post from '../post/Post'
import { useState,useEffect } from 'react'
import './openPost.scss'
import { useParams } from 'react-router-dom'

const OpenPost = () => {
    
  const [posts, setPosts] = useState([])
 const {open}=useParams();
  useEffect(() => {
    
    fetch(`http://localhost:5544/api/allpost${open}`,{
      headers:{'auth-token':localStorage.getItem('token')}
    }).then(result=>{
      result.json().then(res=>{
        setPosts(res)
      })
    })
  
  }, [])

  return (
    <div className="open">
    <div className='allpost'>
    {posts.map((post)=>{
      return(
        
        <div className='post' key={post._id} id={post._id}>
        
        <Post post={post}  />
        </div>
        )
        
      })}
      </div>
      </div>
  )
}

export default OpenPost