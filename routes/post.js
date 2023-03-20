const express =require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const cloudinary=require('cloudinary')
const formidableMiddleware=require('express-formidable')
const JWT_SECRET='prakashbeniwal'
const authtoken=require('../middleware/authtoken')
// mongoose.model('Post')
const Post=require('../models/post')

//cloudinary

cloudinary.config({
    cloud_name:'djbpmjelt',
    api_key:'255521855635618',
    api_secret:'wg_MUoYRY3C7ep1MVAVImrpRKR4'
})


//,formidableMiddleware({maxFieldsSize:5*1024*1024})


//create post in cloadinary

router.post('/createpost',authtoken,formidableMiddleware({maxFieldsSize:5*1024*1024})
,

async(req,res)=>{

    try {
        // const{caption}=req.body;
        const result=await cloudinary.uploader.upload(req.files.image.path)
        res.json({
            url:result.secure_url,
            deleteid:result.public_id
            
        })
        
    
    } catch (error) {
        console.log(error)
    }

   
}
)



// create a new post

router.post('/post',authtoken,(req,res)=>{
    
 
        const{caption,post,deleteid}=req.body;
        if (!post || !deleteid) {
            return(res.status(400).send('data not sufficient'))
        }

        req.user.password=undefined;

    const newPost= Post({
        caption,postedBy:req.user.id,user:req.user,post,deleteid
    })
    newPost.save().then(result=>{ 
        res.send({post:result});
    }).catch(err=>{
        console.log(err)
        res.status(404).send('cant posted')
    })
})


//find all post
router.get('/allpost',authtoken,(req,res)=>{
       
    Post.find().populate("comments.postedBy","name _id").sort('-createdAt').then(
     allpost=>{
         res.send(allpost)
     }
    )
 })


 // find all subscribed post

 router.get('/subpost',authtoken,(req,res)=>{

    // if postedBy in following
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .sort('-createdAt')
    .then(posts=>{
        res.send(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})


// find all my post 

router.get('/mypost',authtoken,(req,res)=>{
       
    Post.find({postedBy:req.user._id}).then(
     allpost=>{
         res.send(allpost)
     }
    )
 })

 //find all post of  user
 router.get('/allpost:userpost',(req,res)=>{
       
    Post.find({postedBy:req.params.userpost}).then(
     (allpost)=>{
         res.status(200).send(allpost)
     }
    ).catch(err=>{
        console.log(err)
        res.status(400).send('cant find')
    })
 })

 //find single post of  user
 router.get('/post:id',(req,res)=>{
       
    Post.findById({_id:req.params.id}).populate("comments.postedBy","_id name profilePic").then(
     post=>{
         res.send(post)
       
     }
    )
 })

 //find comment

//  router.get('comments',(req,res)=>{
    
//  })


 // delete all post 

 router.delete('/allpost',authtoken,(req,res)=>{
    Post.deleteMany({postedBy:req.user.id})
    .then(()=>{
        res.send("deleted succesfully")
    })
 })

 // delete  post 
 router.delete('/post:id',authtoken,(req,res)=>{


    Post.findById({_id:req.params.id}).then(result=>{
        cloudinary.uploader.destroy(result.deleteid).then(()=>{

            Post.findByIdAndRemove({_id:req.params.id})
            .then(()=>{
            res.send({delete:"deleted succesfully"})     
            })
        })
    })
 })


 // like a post

 router.put('/like',authtoken,(req,res)=>{
       
Post.findById(req.body.postId).then(result=>{

    let alreadyLike=result.likes.includes(req.user._id)

    if (!alreadyLike) {
        Post.findByIdAndUpdate(req.body.postId,{
            $push:{likes:req.user._id}
        },{new:true}).then(
            (result)=>{
                    res.json(result)
            }
        ).catch(err=>{
             res.send({err})
            console.log(err)
        })
    }
})  
 })

 // unlike a post
 router.put('/unlike',authtoken,(req,res)=>{
       
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{new:true}).then(
        result=>{
            res.json(result)
        }
    ).catch(err=>{
       res.send({err})
        console.log(err)
    })
 })



 /// comments

 router.put('/comment',authtoken,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

// delete comment

router.put('/uncomment',authtoken,(req,res)=>{
       
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{comments:{_id:req.body.commentId}}
    },{new:true}).then(
        result=>{
            res.json(result)
        }
    ).catch(err=>{
       res.send({err})
        console.log(err)
    })
 })



module.exports=router;
