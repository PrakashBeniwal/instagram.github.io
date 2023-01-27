import React from 'react'
import Post from '../post/Post';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import './posts.scss'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
const FollowingPosts = () => {


  const [posts, setPosts] = useState([]);
  const [followingposts, setFollowingPosts] = useState([]);

  const [select, setSelect] = useState(true)

  const followingpost = () => {

    db.ref(`posts`)
    .on('value',(snap)=>{
      setFollowingPosts(Object.values(snap.val()))
        setSelect(true)
    })

    // fetch('https://instaclone-d3b52-default-rtdb.firebaseio.com/posts.json', {
    //   headers: { 'auth-token': localStorage.getItem('token') }
    // }).then(result => {
    //   result.json().then(res => {
    //     setFollowingPosts(Object.values(res))
    //     setSelect(true)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // })
  }

  const postfetch = () => {

    fetch('https://instaclone-d3b52-default-rtdb.firebaseio.com/posts.json', {
      headers: { 'auth-token': localStorage.getItem('token') }
    }).then(result => {
      result.json().then(res => {
        setPosts(Object.values(res))
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
            <div key={post.id} className='post'>
              <Post post={post} />
            </div>
          )

        })}
      </div>

    </div>
  )
}

export default FollowingPosts