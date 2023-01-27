import { React, useState, useLayoutEffect} from 'react'
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import { Link } from 'react-router-dom';
import './userProfile.scss'
import { useParams } from 'react-router-dom'
import Uploads from '../../component/uploads/Uploads';
import { db } from '../../firebase';
const UserProfile = () => {
  const [currentuser, setCurrentuser] = useState()
  let { profile } = useParams();
  const [user, setUser] = useState([])
  const [showfollow, setShowfollow] = useState()

  useLayoutEffect(() => {

    db.ref(`users/${profile}`).on('value',(snap)=>{
       setUser(snap.val())
       setShowfollow(snap.val().followers?!snap.val().followers.includes(localStorage.getItem('id')):true)
    })

    db.ref(`users/${localStorage.getItem('id')}`).on('value',(snap)=>{
      setCurrentuser(snap.val())
   })
    
  }, [])
  const followuser = () => {

    if (user.followers) {
      db.ref(`users/${profile}/followers`).set([...user.followers,localStorage.getItem('id')])
      setShowfollow(false)
    }else{
      db.ref(`users/${profile}/followers`).set([localStorage.getItem('id')])
      setShowfollow(false)
    } 
    if (currentuser.following) {
    db.ref(`users/${localStorage.getItem('id')}/following`).set([...currentuser.following,profile])
      
    } else {
    db.ref(`users/${localStorage.getItem('id')}/following`).set([profile])
      
    }
  }

  const unfollowuser = () => {
    const remove= user.followers.filter((user)=>{
      return user!==localStorage.getItem('id')
    })
    const removefollowing=currentuser.following.filter((i)=>{
      return i!==user.uid
    })
    db.ref(`users/${profile}/followers`).set([remove])
    db.ref(`users/${localStorage.getItem('id')}/following`).set([removefollowing])
     setShowfollow(true)

  }
  return (
    <>
      {user ?

        <div className='profile'>
          <div className="profileTop">
            <div className="profileTopLeft">
              <div className="username">{user.username}</div>
            </div>
            <div className="profileTopRight">
              <div className="Mainsetting">
                <div><SettingsSuggestOutlinedIcon /></div>
              </div>
            </div>
          </div>

          <div className="editProfile">
            <div className="profileDetail">
              <div className="userProfile">
                <img className='profileimg' src={user.profilePic} alt="" />
                <span>{user.name}</span>
              </div>

              <div className="posts">
                <div className='noOfPosts'>{user.posts?user.posts.length:0}</div>
                <div>Posts</div>
              </div>
              <div className="followers">
                <div className='noOfFollower'>{user.followers?user.followers.length:0}</div>
                <Link to={'/follower/' + profile} style={{ textDecoration: 'none' }}><div>  followers</div></Link>

              </div>
              <div className="following">
                <div className='noOfFollowing'>{user.following?user.following.length:0}</div>
                <Link to={'/following/' + profile} style={{ textDecoration: 'none' }}><div>  following</div></Link>
              </div>
            </div>

            <div className="followMessage">
              {showfollow ?
                <div>

                  <Link >  <button style={{ backgroundColor: 'blue' }} onClick={followuser}>Follow</button></Link>
                </div> :
                <div>

                  <Link >  <button onClick={unfollowuser}>Unfollow</button></Link>
                </div>
              }

              <div>
                <Link >  <button>Message</button></Link>

              </div>
            </div>
          </div>

          <Uploads id={profile} />


        </div>
        : <div>loading...!</div>}
    </>
  )
}

export default UserProfile