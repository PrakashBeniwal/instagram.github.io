import React from 'react'
import { AuthContext } from '../../context/authContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
const Logout = () => {

const navigate=useNavigate()
    const {logout}=useContext(AuthContext);
    const handlelogout=()=>{
       logout();
       navigate('/login')
    }
  return (
    <div>
        <button  onClick={handlelogout}>logout</button>
    </div>
  )
}

export default Logout