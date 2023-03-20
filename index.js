const express=require('express')
var cors=require('cors')
const app=express()
const path=require('path')
const port=process.env.PORT||5544
require('./db')
// require('./models/post');
app.use(express.json())
app.use(cors())

// app.use(express.static('../instagram/build/index.js'))


// app.use(express.static(path.join(__dirname,'../instagram/build/index.js')))
  


app.use('/api/',require('./routes/auth'))
app.use('/api/',require('./routes/post'))
app.use('/api/',require('./routes/user'))


// app.use((req, res) => {
//     res.sendFile(path.resolve(__dirname, "../instagram", "build", "index.html"));
//   });

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname,"../instagram", "build", "index.html"));
//   }); 




// app.use((req, res) => {
//     res.sendFile(path.resolve(__dirname, "../instagram", "build", "index.html"));
//   });
  

app.listen(port,()=>{
    console.log(`listen port on http://localhost:${port}`)
})