import React, { useEffect, useState } from 'react'
import './following.scss'
const Following = () => {
  const [following, setFollowing] = useState([])
  useEffect(() => {
    fetch('http://localhost:5544/api/following',{
      headers:{'auth-token':localStorage.getItem('token')}
    }).then(res=>{
      res.json().then(result=>{
        setFollowing(result)
      }).catch(err=>{
        console.log(err)
      })
    })
  }, [])
  
  return (
    <div className='followingPage'>
      <div>Following</div>
      
{following.map((friend)=>{
  return(
    <div className="person" key={friend._id}>
        <div className="left">
    <div><img src={friend.img} alt="" /></div>
    <div className='name'>
      <span className='username'>
      {friend.username}
        </span> 
        <span>
        {friend.name}</span> </div>
        </div>
        <div className="right">

    <div className='button'><button>Following</button></div>
    <div className='setting'>
      <div></div>
      <div></div>
      <div></div>
    </div>
        </div>
      
      </div>
  )
})}

  
   
 
    </div>
  )
}

export default Following