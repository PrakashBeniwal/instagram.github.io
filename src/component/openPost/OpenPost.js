import React from 'react'
import Post from '../post/Post'
import { useState, useEffect } from 'react'
import './openPost.scss'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
const OpenPost = () => {

  const [posts, setPosts] = useState([])
  const { open } = useParams();
  useEffect(() => {

    db.ref('/posts').orderByChild("postedBy")
        .equalTo(open)
        .on('value',(snap)=>{
            setPosts(Object.values(snap.val()))
        })
  }, [])

  return (
    <div className="open">
      <div className='allpost'>
        {posts.map((post) => {
          return (

            <div className='post' key={post.id} id={post.id}>

              <Post post={post} />
            </div>
          )

        })}
      </div>
    </div>
  )
}

export default OpenPost