import React from 'react'
import './login.scss'
import { AuthContext } from '../../context/authContext'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)
  const [input, setInput] = useState({ email: '', password: '' })
  const handlelogin = async (e) => {
    await login(input.email, input.password);
    navigate('/')
  }

  const onchange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  return (


    <div className='login'>
      <div className="instaname" >
        Instagram
      </div>

      <div className="logindetails">
        <div className="loginflexbox">
          <div className="loginId">
            <input type="text" name='email' value={input.email} onChange={onchange} placeholder='email or username' />
          </div>
          <div className="loginPassword">
            <input type="password" name='password' value={input.password} onChange={onchange} placeholder='password' />
          </div>
          <div className="loginbtn">
            <button onClick={handlelogin}>Login</button>
          </div>

          <div>Forget your login details?<span> Get help logging in.</span></div>

        </div>
      </div>

      <div className="createAcc">
        Don't have an account?<span onClick={() => { navigate('/signup') }}> Sign up.</span>
      </div>
    </div>
  )
}

export default Login