import React from 'react'
import Post from '../post/Post';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import './posts.scss'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const FollowingPosts = () => {


  const [posts, setPosts] = useState([]);
  const [followingposts, setFollowingPosts] = useState([]);

  const [select, setSelect] = useState(true)

  const followingpost = () => {
    fetch('http://localhost:5544/api/subpost', {
      headers: { 'auth-token': localStorage.getItem('token') }
    }).then(result => {
      result.json().then(res => {
        setFollowingPosts(res)
        setSelect(true)
      }).catch(err => {
        console.log(err)
      })
    })
  }

  const postfetch = () => {
    fetch('http://localhost:5544/api/allpost', {
      headers: { 'auth-token': localStorage.getItem('token') }
    }).then(result => {
      result.json().then(res => {
        setPosts(res)
        setSelect(false)
      })
    })

  }
  useEffect(() => {
    followingpost()

  }, [])
  return (
    <div className='container'>

      <div className="homeTop">
        <div className='followingPost'>
          <select onChange={(e) => {
            if (e.target.value === 'following') {
              followingpost()
            } else {
              postfetch()
            }
          }} >
            <option value="following" >Following</option>
            <option value="1" >Allpost</option>
          </select>

        </div>

        <Link to={'/createPost'} style={{ color: 'white' }}> <LocalHospitalOutlinedIcon /></Link>
      </div>

      <div className='allpost'>
        {(select ? followingposts : posts).map((post) => {
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

export default FollowingPosts