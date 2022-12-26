import React, { useEffect, useState } from 'react'

const Follower = () => {
  const [followers, setFollowers] = useState([])
  useEffect(() => {
    fetch('http://localhost:5544/api/followers',{
      headers:{'auth-token':localStorage.getItem('token')}
    }).then(res=>{
      res.json().then(result=>{
        setFollowers(result)
      }).catch(err=>{
        console.log(err)
      })
    })
  }, [])
  return (
    <div className='followingPage'>
      <div>Followers</div>
    {followers.map((friend)=>{
      return(
        <div className="person" key={friend._id}>
            <div className="left">
        <div><img src={friend.img} alt="" /></div>
        <div className='name'>
          <span className='username'>
          {friend.name}
            </span> 
            <span>
            {friend.name}</span> </div>
            </div>
            <div className="right">
    
        <div className='button'><button>Remove</button></div>
       
            </div>
          
          </div>
      )
    })}
    
      
       
     
        </div>
  )
}

export default Follower