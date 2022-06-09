import mongoose from 'mongoose';
import User from './userModel';

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: String,
    title: String,
    content: String,
    postNum: Number,
    postImage: String,
    sharePost: String,
    date: String,
    writer: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  },
  { timestamps: true, collection: 'posts' },
);

const Post = mongoose.model('Post', postSchema);

export default Post;
