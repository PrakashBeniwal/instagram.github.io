import { React, useState, useLayoutEffect, useContext } from 'react'
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import { Link } from 'react-router-dom';
import './userProfile.scss'
import { useParams } from 'react-router-dom'
import Uploads from '../../component/uploads/Uploads';
import { AuthContext } from '../../context/authContext';
const UserProfile = () => {
  const { currentuser } = useContext(AuthContext);
  let { profile } = useParams();
  const [user, setUser] = useState(null)
  const [showfollow, setShowfollow] = useState()

  useLayoutEffect(() => {
    fetch(`http://localhost:5544/api/user${profile}`, {
      headers: { 'auth-token': localStorage.getItem('token') }
    }).then(result => {
      result.json().then(res => {
        setUser(res)
        setShowfollow(user && !user.user.followers.includes(currentuser._id))
      })
    })
    // eslint-disable-next-line
  }, [showfollow])
  const followuser = () => {
    fetch(`http://localhost:5544/api/follow`, {
      method: 'PUT',
      headers: { 'content-Type': 'application/json', 'auth-token': localStorage.getItem('token') },
      body: JSON.stringify({ followId: profile })
    }).then(res => {
      res.json().then(result => {
        setShowfollow(false)

      })
    })
  }

  const unfollowuser = () => {
    fetch(`http://localhost:5544/api/unfollow`, {
      method: 'PUT',
      headers: { 'content-Type': 'application/json', 'auth-token': localStorage.getItem('token') },
      body: JSON.stringify({ unfollowId: profile })
    }).then(res => {
      res.json().then(result => {
        setShowfollow(true)

      })
    })

  }


  return (
    <>
      {user ?

        <div className='profile'>
          <div className="profileTop">
            <div className="profileTopLeft">
              <div className="username">{user.user.username}</div>
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
                <img className='profileimg' src={user.user.profilePic} alt="" />
                <span>{user.user.name}</span>
              </div>

              <div className="posts">
                <div className='noOfPosts'>{user.posts.length}</div>
                <div>Posts</div>
              </div>
              <div className="followers">
                <div className='noOfFollower'>{user.user.followers.length}</div>
                <Link to={'/follower/' + user.user._id} style={{ textDecoration: 'none' }}><div>  followers</div></Link>

              </div>
              <div className="following">
                <div className='noOfFollowing'>{user.user.following.length}</div>
                <Link to={'/following/' + user.user._id} style={{ textDecoration: 'none' }}><div>  following</div></Link>
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