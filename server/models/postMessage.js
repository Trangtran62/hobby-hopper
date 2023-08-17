import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    creator: String,
    title: String,
    message: String,
    tags: [String],
    selectedFile: String,
    category: String,
    likes: {
        type: [String],
        default: []
    },
    likeCount: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String],
        default: []
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    trade: {
        type: Boolean,
        default: false
    
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage;