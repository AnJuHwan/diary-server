import { Request, Response } from 'express';
import Post from '../Model/postModel';
import User from '../Model/userModel';

// 모든 포스트 가져오기
export const getPost = (req: Request, res: Response) => {
  Post.find()
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
  };

  User.findOne({ _id: temp.userId })
    .exec()
    .then((userInfo) => {
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
