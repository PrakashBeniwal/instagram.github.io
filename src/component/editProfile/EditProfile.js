import React, { useEffect, useState } from 'react'
import './editProfile.scss'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useNavigate } from 'react-router-dom';
const EditProfile = () => {

    const [data, setData] = useState('')
    const [url, setUrl] = useState()
    const [deleteid, setDeleteid] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [color, setColor] = useState({ name: 'white', username: 'white', bio: 'white' })
    const [pic, setPic] = useState()
    const [profile, setProfile] = useState('white')

    const navigate = useNavigate()
    const usernameUpdate = () => {
        fetch('http://localhost:5544/api/uptdateUsername', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ username })
        }).then(res => {
            res.json().then(res => {
                if (res.problem) {
                    alert(res.problem)
                } else {
                    setColor({ username: 'green', name: 'green', bio: 'green' })
                    setTimeout(() => {
                        setColor({ username: 'white', name: 'white', bio: 'white' })
                    }, 1500);
                }

            })
        })
    }

    const nameUpdate = () => {
        fetch('http://localhost:5544/api/uptdateName', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ name })
        }).then(res => {
            res.json().then(res => {
                setColor({ username: 'green', name: 'green', bio: 'green' })
                setTimeout(() => {
                    setColor({ username: 'white', name: 'white', bio: 'white' })
                }, 1500);

            })
        })
    }

    const me = () => {
        fetch('http://localhost:5544/api/me',
            { headers: { 'auth-token': localStorage.getItem('token') } }).then(
                res => {
                    res.json().then(result => {
                        setName(result.user.name)
                        setUsername(result.user.username)
                        setPic(result.user.profilePic)
                    }).catch(err => {
                        console.log(err)
                    })
                }
            )
    }
    useEffect(() => {

        me();
    }, [])

    const uploaded = () => {
        const formdata = new FormData()
        formdata.append("image", data)
        fetch("http://localhost:5544/api/createpost", {
            headers: { 'auth-token': localStorage.getItem('token') },
            method: "POST",
            body: formdata
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
                setDeleteid(data.deleteid)
                setPic(data.url)
                setProfile('green')
                setTimeout(() => {
                    setProfile('white')
                }, 1500);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const uploadPic = () => {

        if (url) {
            fetch('http://localhost:5544/api/updatepic', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ pic: url })
            }).then(res => {
                res.json().then(res => {
                })
            })
        }

        navigate('/profile')

    }


    return (
        <div className='editprofile'>

            <div className="profileUpdate">
                <ClearOutlinedIcon onClick={() => { navigate('/profile') }} />
                <span>Edit profile</span>
                <DoneOutlinedIcon style={{ color: 'blue' }} onClick={uploadPic} />
            </div>

            <div className="changeprofile">
                <div className="profilephoto">
                    <img src={pic} alt="" />
                    <label>
                        <span>Change profile photo</span>
                        <input type="file" onChange={(e) => {
                            setData(e.target.files[0])
                            setProfile('blue')
                        }} />
                    </label>
                </div>
                {profile !== 'white' && <DoneOutlinedIcon style={{ color: profile }} onClick={uploaded} />}

            </div>

            <div className="personaldetail">
                <div className="name">
                    <span>Name</span>
                    <input type="text" className="inputname" onChange={(e) => {
                        setName(e.target.value)
                        setColor({ name: 'blue' })
                    }} value={name} placeholder='name' />
                    {color.name !== 'white' && <DoneOutlinedIcon style={{ color: color.name }} onClick={nameUpdate} />}
                </div>
                <div className="username">
                    <span>Username</span>
                    <input type="text" className="inputusername" onChange={(e) => {
                        setUsername(e.target.value)
                        setColor({ username: 'blue' })
                    }} value={username} placeholder='username' />
                    {color.username !== 'white' && <DoneOutlinedIcon style={{ color: color.username }} onClick={usernameUpdate} />}
                </div>
                <div className="bio">
                    <span>Bio</span>
                    <input type="text" className="inputbio" placeholder='Bio' />
                    {color.bio !== 'white' && <DoneOutlinedIcon style={{ color: color.bio }} />}
                </div>
                <div className="addlink">
                    <span>Add link</span>
                </div>

            </div>
            <div className='link'>
                <a href="/">Switch to professional account</a>

            </div>

            <div className='link'>

                <a href="/">Personal information settings</a>
            </div>
        </div>


    )
}

export default EditProfile