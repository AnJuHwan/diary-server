import express from 'express';
import {
  deletePost,
  editPost,
  getDetailPost,
  getPost,
  getPublicPost,
  getUserPost,
  uploadPost,
} from '../Controller/postController';

const router = express.Router();

// 모든 포스트 가져오기
router.get('/', getPost);

// 회원의 모든 포스트 가져오기
router.get('/:userId', getUserPost);

// 특정 상세 포스트 가져오기
router.get('/detail/:id', getDetailPost);

// 포스트 업로드
router.post('/upload', uploadPost);

// 포스트 수정
router.put('/edit', editPost);

// 포스트 삭제
router.delete('/:id', deletePost);

// 공개된 포스트 가져오기
router.get('/public/get', getPublicPost);

export default router;
