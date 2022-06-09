"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("./userModel"));
const { Schema } = mongoose_1.default;
const postSchema = new Schema({
    userId: String,
    title: String,
    content: String,
    postNum: Number,
    postImage: String,
    sharePost: String,
    date: String,
    writer: { type: mongoose_1.default.Schema.Types.ObjectId, ref: userModel_1.default, required: true },
}, { timestamps: true, collection: 'posts' });
const Post = mongoose_1.default.model('Post', postSchema);
exports.default = Post;
