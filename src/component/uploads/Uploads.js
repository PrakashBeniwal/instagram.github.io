import React from 'react'
import { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import './uploads.scss'
import { db } from '../../firebase';
const Uploads = ({ id }) => {

    const [posts, setPosts] = useState([]);
    const [uploads, setUploads] = useState([])
    const [line, setLine] = useState({ h1: 'none', h2: 'none', h3: 'none' })
    
    useEffect(() => {
        db.ref('/posts').orderByChild("postedBy")
        .equalTo(id)
        .on('value',(snap)=>{
            setPosts(Object.values(snap.val()))
                setUploads(Object.values(snap.val()))
        })
    }, [])
    const onclick = (e) => {

        if (e === 'post') {
            setLine({ h1: 'block', h2: 'none', h3: 'none' })
            setUploads(posts)
        }
        if (e === 'reel') {
            setLine({ h2: 'block', h1: 'none', h3: 'none' })
            setUploads([])
        }
        if (!e) {
            setLine({ h3: 'block', h2: 'none', h1: 'none' })
            setUploads([])
        }
    }



    return (
        <div className='allposts'>

            <div className="uploads" >
                <div className="icons">
                    <div>
                        <span id='post' onClick={() => { onclick('post') }}><ViewCompactOutlinedIcon /></span>
                        <hr style={{ display: line.h1 }} />
                    </div>
                    <div>
                        <span onClick={() => { onclick('reel') }}><SlideshowOutlinedIcon /></span>

                        <hr style={{ display: line.h2 }} />
                    </div>
                    <div>
                        <span onClick={() => { onclick() }}><AccountBoxOutlinedIcon /></span>

                        <hr style={{ display: line.h3 }} />
                    </div>
                </div>

            </div>


            <div className="all">
                {
                    uploads.map((post) => {
                        return (
                            <Link to={`/OpenPost/${id}#${post.id}`} key={post.id}>  <div className="postimg" >
                                <img src={post.post} alt="" />
                            </div></Link>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Uploads