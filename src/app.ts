import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Mongoose from 'mongoose';
import userRouter from './Router/userRouter';
import postRouter from './Router/postRouter';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

Mongoose.connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log('mongoDB connect!! ' + port))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

app.use('/post', postRouter);
app.use('/users', userRouter);
app.use(express.static('public')); // public폴더 안에있는 모든 리소스를 가져갈 수 있음

app.get('/', (req, res) => {
  return res.status(200).json({ message: '서버연결!' });
});
app.listen(port);
