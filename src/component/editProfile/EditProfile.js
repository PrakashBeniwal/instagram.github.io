import React, { useEffect, useState } from 'react'
import './editProfile.scss'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../firebase';
const EditProfile = () => {

    const [data, setData] = useState('')
    const [deleteid, setDeleteid] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [color, setColor] = useState({ name: 'white', username: 'white', bio: 'white' })
    const [pic, setPic] = useState()
    const [profile, setProfile] = useState('white')

    const navigate = useNavigate()

    useEffect(() => {

        db.ref(`users/${localStorage.getItem('id')}`)
        .on('value',(snap)=>{
            setName(snap.val().name)
            setUsername(snap.val().username)
            setPic(snap.val().profilePic)
            setDeleteid(snap.val().deleteid)
        })
    }, [])


    const usernameUpdate = () => {


        db.ref(`users/${localStorage.getItem('id')}`)
        .update({username})
        .then(()=>{
            setColor({ username: 'green', name: 'green', bio: 'green' })
                       setTimeout(() => {
                           setColor({ username: 'white', name: 'white', bio: 'white' })
                       }, 1500);
        })

    }

    const nameUpdate = () => {
        db.ref(`users/${localStorage.getItem('id')}`)
        .update({name})
        .then(()=>{
            setColor({ username: 'green', name: 'green', bio: 'green' })
                       setTimeout(() => {
                           setColor({ username: 'white', name: 'white', bio: 'white' })
                       }, 1500);
        })
    }

    const uploaded = () => {
        storage.ref(deleteid).delete()
        const uploadProfile= storage.ref().child(`/profile/${Date.now()}`).put(data)

        uploadProfile.then(()=>{
            uploadProfile.snapshot.ref.getDownloadURL().then((url)=>{
                db.ref(`users/${localStorage.getItem('id')}`)
                 .update({profilePic:url,deleteid:uploadProfile.snapshot.metadata.fullPath})
                 setProfile('green')
                setTimeout(() => {
                    setProfile('white')
                }, 1500);
            })
        })
    }

    const uploadPic = () => {
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