import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Post from '../Model/postModel';
import User from '../Model/userModel';

// 모든 포스트 가져오기
export const getPost = async (req: Request, res: Response) => {
  await Post.find({})
    .populate({ path: 'writer', model: 'User' })
    .sort({ updatedAt: -1 })
    .exec()
    .then((item) => {
      res.status(200).json({
        success: true,
        postItem: item,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
};

// 회원의 모든 포스트 가져오기
export const getUserPost = (req: Request, res: Response) => {
  Post.find({ userId: req.params.userId })
    .populate('writer')
    .sort({ updatedAt: -1 })
    .exec()
    .then((item) => {
      res.status(200).json({ success: true, postItem: item });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
};

// 특정 상세 포스트 가져오기
export const getDetailPost = (req: Request, res: Response) => {
  Post.findOne({ _id: req.params.id })
    .exec()
    .then((item) => {
      res.status(200).json({ success: true, postItem: item });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
};

// 포스트 업로드
export const uploadPost = (req: Request, res: Response) => {
  let temp = {
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    postImage: req.body.postImage,
    sharePost: req.body.sharePost,
    date: req.body.date,
    writer: new ObjectId(req.body.writer),
  };

  User.findOne({ _id: temp.userId })
    .exec()
    .then(() => {
      const NewPost = new Post(temp);
      NewPost.save().then(() => {
        res.status(200).json({ success: true, postItem: NewPost });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
};

// 포스트 수정하기
export const editPost = (req: Request, res: Response) => {
  Post.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
        postImage: req.body.postImage,
        sharePost: req.body.sharePost,
        date: req.body.date,
      },
    },
    { new: true },
  )
    .exec()
    .then((item) => {
      res.status(200).json({ success: true, postItem: item });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
};

// 포스트 삭제하기
export const deletePost = (req: Request, res: Response) => {
  Post.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((item) => {
      res.status(200).json({ success: true, postItem: item });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
};
