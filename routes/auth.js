const express =require('express')
const router=express.Router()
const User=require('../models/User')
const jwt=require('jsonwebtoken')
const JWT_SECRET='prakashbeniwal'

// create new user
router.post('/user',async(req,res)=>{
    const user=await req.body
    let problem
if (!req.body.name||!req.body.username||!req.body.email||!req.body.password) {
     problem='incomplete details'
    return(res.send({problem})
    
    )
}
    const email=await User.findOne({email:req.body.email});
    const username=await User.findOne({username:req.body.username});

    if (username) {
      return  res.status(400).send({problem:'username already exist'})
    }
    if (email) {
       return res.status(400).send({problem:'email already exist'})
    }

    const newuser=new User(user)
    await newuser.save()

    const data={
        user:{
            _id:newuser.id
        }
    }

    const token=jwt.sign(data,JWT_SECRET)

    res.send({token:token})
})




// user login

// router.get('/login',async(req,res)=>{

    
//      User.findOne({email:req.body.email}).then((user)=>{

//         if (!user) {
//           return res.status(400).send('invalid email')
//         }

        // new Promise((resolve,reject)=>{
        //     if (user.password==req.body.password) {
                
        //         resolve(user.password==req.body.password)
        //     }
        //     else{
        //         reject('invalid password')
        //     }
        // })

//        .then(()=>{
            
//                 const data={
//                     user:{
//                         id:user.id
//                     }
//                 }
            
//                 const token=jwt.sign(data,JWT_SECRET)
            
//                 res.send(token)
            
           
//         })
//         .catch(err=>{
//             console.log(err)
//             res.send('invalid details')
//         })
       

//      }
     
//      )
//      .catch(err=>{
//         console.log(err)
//         res.send('somethig wrong')
//     })
// })


router.post('/login',async(req,res)=>{
    let problem
    if (!req.body.email&&!req.body.username&&!req.body.password) {
        problem='please give all details'
        return res.status(400).send({problem})
    }

    try {
        let user=await User.findOne({email:req.body.email});
        let userName=await User.findOne({username:req.body.username});

       
        if (!user && !userName) {
            return res.status(404).send({problem:'invalid details'})
        
        }
        if (!userName) {
            userName='';
        }
        if (!user) {
            user=''
        }
        
        if (user.password!==req.body.password && userName.password!==req.body.password ) {
          return  res.status(400).send({problem:'invalid password'})
            
        }
        
    
        const data={
            user:{
                _id:user.id||userName.id
            }
        }
    
         userName=await User.findOne({username:req.body.username}).select('-password')
         user=await User.findOne({email:req.body.email}).select('-password');

    //    const userdata=user.concat(userName);
    const token=jwt.sign(data,JWT_SECRET)
       if (!user) {
        user=userName;
       }
       res.send({token,user,problem})

    
      
        // res.send({token,userName})       
    } catch (error) {
        console.log(error)
        res.status(400).send({error:'something happen in server'})
    }
})



module.exports=router
