import mongoose from 'mongoose';

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
  },
  { timestamps: true, collection: 'posts' },
);

const Post = mongoose.model('Post', postSchema);

export default Post;
