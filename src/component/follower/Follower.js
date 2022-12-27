import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
const Follower = () => {
  const { follower } = useParams()
  const [followers, setFollowers] = useState([])
  const { currentuser } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5544/api/followers${follower}`, {
      headers: { 'auth-token': localStorage.getItem('token') }
    }).then(res => {
      res.json().then(result => {
        setFollowers(result)
      }).catch(err => {
        console.log(err)
      })
    })
  }, [])
  return (
    <div className='followingPage'>
      <div>Followers</div>
      {followers.map((friend) => {
        return (
          <div className="person" key={friend._id}>
            <div className="left">
              <Link to={friend._id !== currentuser._id ? '/userProfile/' + friend._id : '/profile'} style={{ color: 'white', textDecoration: "none" }} > <div><img src={friend.profilePic} alt="" /></div></Link>
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