import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { db } from '../../firebase';
const Person = ({ friend }) => {
  const [currentuser, setCurrentuser] = useState()
  const [showfollow, setShowfollow] = useState(false)


  useEffect(() => {
    
  db.ref(`users/${localStorage.getItem('id')}`)
  .on('value',(snap)=>{
    setCurrentuser(snap.val())
  })
  }, [])
  
  const followuser = (id) => {
    if (friend.followers) {
      db.ref(`users/${friend.uid}/followers`).set([...friend.followers,localStorage.getItem('id')])
      setShowfollow(false)
    }else{
      db.ref(`users/${friend.uid}/followers`).set([localStorage.getItem('id')])
      setShowfollow(false)
    } 
    if (currentuser.following) {
    db.ref(`users/${localStorage.getItem('id')}/following`).set([...currentuser.following,friend.uid])
      
    } else {
    db.ref(`users/${localStorage.getItem('id')}/following`).set([friend.uid])
      
    }
  }

  const unfollowuser = () => {
    const remove= friend.followers.filter((user)=>{
      return user!==localStorage.getItem('id')
    })
    const removefollowing=currentuser.following.filter((i)=>{
      return i!==friend.uid
    })
    db.ref(`users/${friend.uid}/followers`).set([remove])
    db.ref(`users/${localStorage.getItem('id')}/following`).set([removefollowing])
     setShowfollow(true)

  }
  return (
    <div className="person" >
      <div className="left">
        <Link to={friend.uid !== localStorage.getItem('id') ? '/userProfile/' + friend.uid : '/profile'} style={{ color: 'white', textDecoration: "none" }} ><div><img src={friend.profilePic} alt="" /></div></Link>
        <div className='name'>
          <span className='username'>
            {friend.username}
          </span>
          <span>
            {friend.name}</span> </div>
      </div>
      <div className="right">
        {showfollow ?
          <div className='button'><button onClick={() => { followuser(friend.uid) }} style={{ backgroundColor: 'blue' }}>Follow</button></div> :
          <div className='button'><button onClick={() => { unfollowuser(friend.uid) }}>Following</button></div>

        }
        <div className='setting'>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

    </div>
  )
}

export default Person