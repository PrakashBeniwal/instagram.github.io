import React from 'react'
import './home.scss'
import FollowingPosts from '../../component/posts/FollowingPosts'
const Home = () => {
  return (
    <div className='home' >
      <FollowingPosts />
    </div>
  )
}

export default Home