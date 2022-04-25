import { model, Schema } from 'mongoose';
import PostI from '../types/post.type';

const PostSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const PostModel = model<PostI>('Post', PostSchema);

export default PostModel;
