"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../Controller/postController");
const router = express_1.default.Router();
// 모든 포스트 가져오기
router.get('/', postController_1.getPost);
// 회원의 모든 포스트 가져오기
router.get('/:userId', postController_1.getUserPost);
// 특정 상세 포스트 가져오기
router.get('/detail/:id', postController_1.getDetailPost);
// 포스트 업로드
router.post('/upload', postController_1.uploadPost);
// 포스트 수정
router.put('/edit', postController_1.editPost);
// 포스트 삭제
router.delete('/:id', postController_1.deletePost);
// 공개된 포스트 가져오기
router.get('/public/get', postController_1.getPublicPost);
exports.default = router;
