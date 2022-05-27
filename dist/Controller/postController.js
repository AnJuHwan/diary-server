"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.uploadPost = exports.getDetailPost = exports.getPost = void 0;
const postModel_1 = __importDefault(require("../Model/postModel"));
const userModel_1 = __importDefault(require("../Model/userModel"));
// 모든 포스트 가져오기
const getPost = (req, res) => {
    postModel_1.default.find()
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
exports.getPost = getPost;
// 특정 상세 포스트 가져오기
const getDetailPost = (req, res) => {
    postModel_1.default.findOne({ userId: req.params.id })
        .exec()
        .then((item) => {
        res.status(200).json({ success: true, postItem: item });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
};
exports.getDetailPost = getDetailPost;
// 포스트 업로드
const uploadPost = (req, res) => {
    let temp = {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
    };
    userModel_1.default.findOne({ _id: temp.userId })
        .exec()
        .then((userInfo) => {
        const NewPost = new postModel_1.default(temp);
        NewPost.save().then(() => {
            res.status(200).json({ success: true, postItem: NewPost });
        });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
};
exports.uploadPost = uploadPost;
// 포스트 수정하기
const editPost = (req, res) => {
    postModel_1.default.findOneAndUpdate({ _id: req.body.id }, {
        $set: {
            title: req.body.title,
            content: req.body.content,
        },
    }, { new: true })
        .exec()
        .then((item) => {
        res.status(200).json({ success: true, postItem: item });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
};
exports.editPost = editPost;
// 포스트 삭제하기
const deletePost = (req, res) => {
    postModel_1.default.findOneAndDelete({ _id: req.params.id })
        .exec()
        .then((item) => {
        res.status(200).json({ success: true, postItem: item });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
};
exports.deletePost = deletePost;
