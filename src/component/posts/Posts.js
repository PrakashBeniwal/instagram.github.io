import React from 'react'
import Post from '../post/Post';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';

import './posts.scss'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Story from '../../component/story/Story'

const Posts = () => {

  const [posts, setPosts] = useState([]);

  const postfetch = () => {
    fetch('http://localhost:5544/api/allpost', {
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
    <div className='container'>

      <div className="homeTop">
        <div>Instagram</div>
        <Link to={'/createPost'} style={{ color: 'white' }}> <LocalHospitalOutlinedIcon /></Link>
      </div>

      <Story />

      <div className='allpost'>


        {posts.map((post) => {
          return (
            <div key={post._id} className='post'>
              <Post post={post} />
            </div>
          )

        })}
      </div>

    </div>
  )
}

export default Posts