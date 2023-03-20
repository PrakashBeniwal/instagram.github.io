const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types
const postSchema = new Schema({
    post: {
        type: String,

    },
    caption: {
        type: String
    },
    deleteid: {
        type: String,
        required: true
    },
    user: {
        type: JSON,
        required: true
    },
    postedBy: {
        type: ObjectId,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],

    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: "User" },
    }]
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)
module.exports = Post;