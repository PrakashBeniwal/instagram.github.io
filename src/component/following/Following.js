import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import './following.scss'
import Person from './Person'
const Following = () => {
  const [following, setFollowing] = useState([])

  const { follow } = useParams()
  useEffect(() => {
    db.ref(`users/${follow}`)
    .on('value',(snap)=>{
        snap.val().following.forEach((i)=>{
          db.ref(`users/${i}`)
          .on('value',(snap)=>{
            if (following!==[]) {  
              setFollowing([...following,snap.val()])
            }else{
              setFollowing(snap.val())
            } 
          }) 
        })
    })
  }, [])
  return (
    <div className='followingPage'>
      <div>Following</div>

      {following.map((friend) => {
        return (
          <Person friend={friend} key={friend.uid} />
        )
      })}
    </div>
  )
}

export default Following