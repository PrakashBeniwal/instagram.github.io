import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
const Person = ({ friend }) => {
  const { currentuser } = useContext(AuthContext);
  const [showfollow, setShowfollow] = useState(false)

  const followuser = (id) => {
    fetch(`http://localhost:5544/api/follow`, {
      method: 'PUT',
      headers: { 'content-Type': 'application/json', 'auth-token': localStorage.getItem('token') },
      body: JSON.stringify({ followId: id })
    }).then(res => {
      res.json().then(() => {
        setShowfollow(false)
      })
    })
  }

  const unfollowuser = (id) => {
    fetch(`http://localhost:5544/api/unfollow`, {
      method: 'PUT',
      headers: { 'content-Type': 'application/json', 'auth-token': localStorage.getItem('token') },
      body: JSON.stringify({ unfollowId: id })
    }).then(res => {
      res.json().then(() => {
        setShowfollow(true)
      })
    })

  }
  return (
    <div className="person" >
      <div className="left">
        <Link to={friend._id !== currentuser._id ? '/userProfile/' + friend._id : '/profile'} style={{ color: 'white', textDecoration: "none" }} ><div><img src={friend.profilePic} alt="" /></div></Link>
        <div className='name'>
          <span className='username'>
            {friend.username}
          </span>
          <span>
            {friend.name}</span> </div>
      </div>
      <div className="right">
        {showfollow ?
          <div className='button'><button onClick={() => { followuser(friend._id) }} style={{ backgroundColor: 'blue' }}>Follow</button></div> :
          <div className='button'><button onClick={() => { unfollowuser(friend._id) }}>Following</button></div>

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