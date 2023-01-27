import React, {  useState } from 'react'
import './searchUser.scss'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'
const SearchUser = () => {

  const [user, setUser] = useState([])

  const finduser = (query) => {

    if (query!='') {
      db.ref(`users`).orderByChild('name')
      .startAt(query)
      .limitToFirst(5)
      .once('value',(snap)=>{
        if (snap.val()) {  
          setUser(Object.values(snap.val()))
        }
      })
    }
   

    // fetch('http://localhost:5544/api/searchUsers', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ user: query, username: query })
    // }).then(res => {
    //   res.json().then(result => {
    //     setUser(result)
    //   })
    // })
  }
  return (
    <div className='SearchUser'>
      <input type="text" placeholder='Search' onChange={(e) => { finduser(e.target.value) }} />
      {user.map((e) => {

        return (
          <Link to={e.id !== localStorage.getItem('id') ? '/userProfile/' + e.id : '/profile'} style={{ color: 'white', textDecoration: "none" }} key={e.uid}> <div className="user" >
            <img src={e.profilePic} alt="" />
            <div className="userdetail">
              <span>{e.username}</span>
              <span className='name'>{e.name}</span>
            </div>
          </div></Link>
        )

      })}
    </div>
  )
}

export default SearchUser