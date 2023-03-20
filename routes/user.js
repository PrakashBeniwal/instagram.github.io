const express =require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const JWT_SECRET='prakashbeniwal'
const authtoken=require('../middleware/authtoken')
const User=require('../models/User')
const Post=require('../models/post')

router.get('/me',authtoken,(req,res)=>{
    User.findOne({_id:req.user.id}).select('-password').then(
        user=>{ Post.find({postedBy:req.user.id}).
        populate("postedBy","_id name").exec(
            (err,posts)=>{
                if (err) {
                    return res.status(422).json({error:err})
                }
                res.json({user,posts})
            }
        )}
    )
})


router.get('/user:id',authtoken,(req,res)=>{
    User.findOne({_id:req.params.id}).select('-password').then(
        user=>{
            Post.find({postedBy:req.params.id}).
            populate("postedBy","_id name").exec(
                (err,posts)=>{
                    if (err) {
                        return res.status(422).json({error:err})
                    }
                    res.json({user,posts})
                }
            )
        }
    ).catch(err=>{
        return res.status(404).json({error:"User not found"})

    })
})


//find all user
router.get('/user',async(req,res)=>{
    const user=await User.find().select('-password')
    res.send(user)
})


// follow user 

router.put('/follow',authtoken,(req,res)=>{

    User.findById(req.body.followId).then(result=>{
        let isfollowers= result.followers.includes(req.user._id)
    
    if (!isfollowers) {
       
    User.findByIdAndUpdate(req.body.followId,{$push:{followers:req.user._id}},{
        new:true
    },
    (err)=>{
        if (err) {
          return  res.status(422).send({error:err})
        }

        User.findByIdAndUpdate(req.user._id,{$push:{following:req.body.followId}},
            {new:true}).select('-password').then(result=>{
                res.send(result)
            }).catch(err=>{
               return res.status(422).send({error:err})
            })
    })
}})

})

router.put('/unfollow',authtoken,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{$pull:{followers:req.user._id}},{
        new:true
    },
    (err)=>{
        if (err) {
          return  res.status(422).send({error:err})
        }

        User.findByIdAndUpdate(req.user._id,{$pull:{following:req.body.unfollowId}},
            {new:true}).select('-password').then(result=>{
                res.send(result)
            }).catch(err=>{
               return res.status(422).send({error:err})
            })
    })
})


router.post('/searchUsers',(req,res)=>{
    
    let searchuser
    if (req.body.user!=='') {
        searchuser= new RegExp('^'+req.body.user)      
        searchusername= new RegExp('^'+req.body.username)      
User.find({$or:[ {name:{$regex:searchuser}} ,{ username:{$regex:searchusername}}]}).select('_id name username profilePic').limit(10)
.then(result=>{
    res.json(result)
}).catch(err=>{
    console.log(err)
})
}

})



// find all following

router.get('/following:id',authtoken,async(req,res)=>{
    const user=await User.findById(req.params.id);
    // if _id in following
    User.find({_id:{$in:user.following}})
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        console.log(err)
    })
})

// find all followers

router.get('/followers:id',authtoken,async(req,res)=>{
    const user=await User.findById(req.params.id);
    // if _id in followers
    User.find({_id:{$in:user.followers}})
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        console.log(err)
    })
})


// update username 

router.put('/uptdateUsername',authtoken,async(req,res)=>{

const username=await User.findOne({username:req.body.username});
if (username) {
   return res.status(400).send({problem:'username already exist'})
}

    User.findByIdAndUpdate(req.user._id,{
        $set:{username:req.body.username}
    },{new:true}).then(result=>{
        res.json({result})
    }).catch(err=>{
        console.log(err)
    })
})

// update username and name

router.put('/uptdateName',authtoken,(req,res)=>{

    User.findByIdAndUpdate(req.user._id,{
        $set:{name:req.body.name}
    },{new:true}).then(result=>{
        res.json({result})
    }).catch(err=>{
        console.log(err)
    })
})


// update profilepic

router.put('/updatepic',authtoken,(req,res)=>{
    if (!req.body.pic) {
        return res.status(404).send({error:"please choose profile pic"})
    }
    User.findByIdAndUpdate(req.user._id,{$set:{profilePic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"pic canot post"})
         }
         res.json(result)
    })
})




module.exports=router;






