"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.uploadPost = exports.getPublicPost = exports.getDetailPost = exports.getUserPost = exports.getPost = void 0;
const mongodb_1 = require("mongodb");
const postModel_1 = __importDefault(require("../Model/postModel"));
const userModel_1 = __importDefault(require("../Model/userModel"));
// 모든 포스트 가져오기
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield postModel_1.default.find({})
        .populate('writer')
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
});
exports.getPost = getPost;
// 회원의 모든 포스트 가져오기
const getUserPost = (req, res) => {
    postModel_1.default.find({ userId: req.params.userId })
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
exports.getUserPost = getUserPost;
// 특정 상세 포스트 가져오기
const getDetailPost = (req, res) => {
    postModel_1.default.findOne({ _id: req.params.id })
        .populate('writer')
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
// 공개된 포스트 가져오기
const getPublicPost = (req, res) => {
    postModel_1.default.find({ sharePost: 'public' })
        .populate('writer')
        .exec()
        .then((item) => {
        res.status(200).json({ success: true, postItem: item });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
};
exports.getPublicPost = getPublicPost;
// 포스트 업로드
const uploadPost = (req, res) => {
    let temp = {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        postImage: req.body.postImage,
        sharePost: req.body.sharePost,
        date: req.body.date,
        writer: new mongodb_1.ObjectId(req.body.writer),
    };
    userModel_1.default.findOne({ _id: temp.userId })
        .exec()
        .then(() => {
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
            postImage: req.body.postImage,
            sharePost: req.body.sharePost,
            date: req.body.date,
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
