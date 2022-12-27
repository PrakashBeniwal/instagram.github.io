import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './following.scss'
import Person from './Person'
const Following = () => {
  const [following, setFollowing] = useState([])

  const { follow } = useParams()
  useEffect(() => {
    fetch(`http://localhost:5544/api/following${follow}`, {
      headers: { 'auth-token': localStorage.getItem('token') }
    }).then(res => {
      res.json().then(result => {
        setFollowing(result)
      }).catch(err => {
        console.log(err)
      })
    })
  }, [])
  return (
    <div className='followingPage'>
      <div>Following</div>

      {following.map((friend) => {
        return (
          <Person friend={friend} key={friend._id} />
        )
      })}
    </div>
  )
}

export default Following