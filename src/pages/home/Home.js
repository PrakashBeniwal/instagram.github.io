import React from 'react'

import './home.scss'
// import Posts from '../../component/posts/Posts'
import FollowingPosts from '../../component/posts/FollowingPosts'
const Home = () => {
  return (
    <div className='home' >
      
        <FollowingPosts/>
        
        
    </div>
  )
}

export default Home