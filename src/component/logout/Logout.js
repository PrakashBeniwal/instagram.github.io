import React from 'react'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import './logout.scss'
const Logout = () => {

  const navigate = useNavigate()
  const handlelogout = () => {
    auth.signOut()
    navigate('/login')
  }
  return (
    <div className='logout'>
      <button onClick={handlelogout}>logout</button>
    </div>
  )
}

export default Logout