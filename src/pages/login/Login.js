import React from 'react'
import './login.scss'
import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from '../../firebase'
const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: '', password: '' })
  const handlelogin =(e) => {
    auth.signInWithEmailAndPassword(input.email, input.password).then(result=>{
      alert('logged In')
       navigate('/')
     }).catch(err=>{alert('invalid details')})
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
            <input type="text" name='email' value={input.email} onChange={onchange} placeholder='email' />
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