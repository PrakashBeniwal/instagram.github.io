import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'
const Follower = () => {
  const { follower } = useParams()
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    db.ref(`users/${follower}`)  
    .on('value',(snap)=>{

        snap.val().followers.forEach((i)=>{
          db.ref(`users/${i}`)
          .on('value',(snap)=>{
            if (followers!==[]) {  
              setFollowers([...followers,snap.val()])
            }else{setFollowers(snap.val())} 
          }) 
        })
    })
  }, [])
  return (
    <div className='followingPage'>
      <div>Followers</div>
      {followers&&followers.map((friend) => {
        return (
          <div className="person" key={friend.uid}>
            <div className="left">
              <Link to={friend.uid !==localStorage.getItem('id') ? '/userProfile/' + friend.uid : '/profile'} style={{ color: 'white', textDecoration: "none" }} > <div><img src={friend.profilePic} alt="" /></div></Link>
              <div className='name'>
                <span className='username'>
                  {friend.username}
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